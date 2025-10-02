import express, { Request, Response} from "express"
import verifyToken from "../middleware/auth";
import Hotel from "../models/Hotel";
import { HotelType } from "../../shared/types";

const router = express.Router();

router.get("/", verifyToken, async (req : Request, res : Response) => {
    try{
        const hotels = await Hotel.find({
            bookings : {
                $elemMatch : { userID : req.userID }
            }
        })

        const result = hotels.map((hotel) => {
            const userBookings = hotel.bookings.filter(
                (booking) => booking.userID === req.userID
            )

            const hotelWithUserBooking : HotelType = {
                ...hotel.toObject(),
                bookings : userBookings
            }

            return hotelWithUserBooking
        })

        return res.status(200).send(result)
    } catch(error){
        return res.status(500).json({message : "Unable to fetch bookings"})
    }
})

export default router;
