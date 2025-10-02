import express, { Request, Response } from "express";
import { param, validationResult } from "express-validator";
import Hotel from "../models/Hotel";
import { BookingType, HotelSearchResponse } from "../../shared/types";
import Stripe from "stripe";
import verifyToken from "../middleware/auth";
const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_API_KEY as string);

router.get("/search", async (req: Request, res: Response) => {
  try {
    const query = constructSearchQuery(req.query);

    let sortOption = {};
    switch (req.query.searchOption) {
      case "starRating":
        sortOption = { starRating: -1 };
        break;
      case "pricePerNightAsc":
        sortOption = { pricePerNight: 1 };
        break;
      case "pricePerNightDesc":
        sortOption = { pricePerNight: -1 };
        break;
    }

    const pageSize = 5;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );

    const skip = (pageNumber - 1) * pageSize;

    const hotels = await Hotel.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(pageSize);

    const total = await Hotel.countDocuments(query);

    const response: HotelSearchResponse = {
      data: hotels,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };

    return res.json(response);
  } catch (err) {
    console.log("Error : ", err);
    return res.status(500).send({ message: "Error displaying hotels" });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find().sort("-lastUpdated");
    return res.json(hotels);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching hotels m" });
  }
});

router.get(
  "/:id",
  [param("id").notEmpty().withMessage("Hotel ID is required")],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id.toString();

    try {
      const hotel = await Hotel.findById(id);
      res.json(hotel);
    } catch (err) {
      res.status(500).json({ message: "Error fetching this hotel" });
    }
  }
);

router.post(
  "/:hotelID/bookings/payment-intent",
  verifyToken,
  async (req: Request, res: Response) => {
    const hotelID = req.params.hotelID;
    const { noOfNights } = req.body;

    const hotel = await Hotel.findById(hotelID);
    if (!hotel) {
      return res.status(400).json({ message: "Hotel not found" });
    }

    const totalCost = hotel.pricePerNight * noOfNights;

    const customer = await stripe.customers.create({
      name: "Admin",
      address: {
        line1: "510 Townsend St",
        postal_code: "98140",
        city: "San Francisco",
        state: "CA",
        country: "US",
      },
    });

    const paymentIntent = await stripe.paymentIntents.create({
      //amount calculated in smallest currency unit (paise)
      amount: totalCost * 100,
      currency: "INR",
      metadata: {
        userID: req.userID,
        hotelID,
      },
      description: "Default description",
      customer: customer.id,
    });

    if (!paymentIntent.client_secret) {
      return res.status(500).json({ message: "Error creating payment intent" });
    }

    const response = {
      paymentIntentID: paymentIntent.id,
      clientSecret: paymentIntent.client_secret.toString(),
      totalCost,
    };

    // console.log("Sending response, payment intent created")

    return res.send(response);
  }
);

router.post(
  "/:hotelID/bookings",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const { paymentIntentID } = req.body;
      const paymentIntent = await stripe.paymentIntents.retrieve(
        paymentIntentID as string
      );
      // Errors through stripe
      if (!paymentIntent) {
        return res.status(400).json({ message: "Payment intent not found" });
      }
      if (
        paymentIntent.metadata.hotelID !== req.params.hotelID ||
        paymentIntent.metadata.userID !== req.userID
      ) {
        return res.status(400).json({ message: "Payment intent mismatch" });
      }
      if (paymentIntent.status !== "succeeded") {
        return res
          .status(400)
          .json({
            message: `Payment intent not successful. Status : ${paymentIntent.status}`,
          });
      }

      console.log("Payment succesful");

      //On successful payment
      const newBooking: BookingType = {
        ...req.body,
        userID: req.userID,
        totalCost: paymentIntent.amount / 100, // Use the totalCost from the paymentIntent
      };
      console.log(newBooking);
      const hotel = await Hotel.findOneAndUpdate(
        { _id: req.params.hotelID },
        {
          $push: {
            bookings: newBooking,
          },
        }
      );

      if (!hotel) {
        return res.status(400).json({ message: "Hotel not found" });
      }

      await hotel.save();

      res.status(200).send();
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
);

const constructSearchQuery = (queryParams: any) => {
  let constructedQuery: any = {};

  if (queryParams.destination) {
    constructedQuery.$or = [
      { city: new RegExp(queryParams.destination, "i") },
      { country: new RegExp(queryParams.destination, "i") },
    ];
  }

  if (queryParams.adultCount) {
    constructedQuery.adultCount = {
      $gte: parseInt(queryParams.adultCount),
    };
  }

  if (queryParams.childCount) {
    constructedQuery.childCount = {
      $gte: parseInt(queryParams.childCount),
    };
  }

  if (queryParams.facilities) {
    constructedQuery.facilities = {
      $all: Array.isArray(queryParams.facilities)
        ? queryParams.facilities
        : [queryParams.facilities],
    };
  }

  if (queryParams.types) {
    constructedQuery.type = {
      $in: Array.isArray(queryParams.types)
        ? queryParams.types
        : [queryParams.types],
    };
  }

  if (queryParams.stars) {
    const starRatings = Array.isArray(queryParams.stars)
      ? queryParams.stars.map((star: string) => parseInt(star))
      : parseInt(queryParams.stars);

    constructedQuery.starRating = { $in: starRatings };
  }

  if (queryParams.maxPrice) {
    constructedQuery.pricePerNight = {
      $lte: parseInt(queryParams.maxPrice).toString(),
    };
  }

  return constructedQuery;
};

export default router;
