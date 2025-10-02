import { useForm } from "react-hook-form";
import { UserType } from "../../../../server/shared/types";
import { PaymentIntentResponse } from "../../../../server/shared/types";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useSearchContext } from "../../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import * as apiClient from "../../api-client";
import { useAppContext } from "../../contexts/AppContext";

type Props = {
  currentUser: UserType;
  paymentIntent: PaymentIntentResponse;
};

export type BookingFormData = {
  hotelID: string;
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  paymentIntentID: string;
  totalCost: number;
};

const BookingForm = ({ currentUser, paymentIntent }: Props) => {
  //stripe stuff
  const stripe = useStripe();
  const elements = useElements();

  const search = useSearchContext();
  const { hotelID } = useParams();

  const { showToast } = useAppContext();

  const { mutate: bookRoom, isLoading } = useMutation(
    apiClient.createRoomBooking,
    {
      onSuccess: () => {
        showToast({ message: "Booking Saved!", type: "SUCCESS" });
      },
      onError: () => {
        showToast({ message: "Error saving booking", type: "ERROR" });
      },
    }
  );

  const { handleSubmit, register } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.fName,
      lastName: currentUser.lName,
      email: currentUser.email,
      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      paymentIntentID: paymentIntent.paymentIntentId,
      totalCost: paymentIntent.totalCost,
      hotelID: hotelID,
    },
  });

  const onSubmit = async (formData: BookingFormData) => {
    if (!stripe || !elements) {
      console.log("No stripe or elements found");
      return;
    }
    //not the same stripe variable as added in app context, this handles stripe object, communication directly with the api
    //the loadStripe() hook only loads the stripe script onto the app. Necessary to use useStripe()
    console.log("Payment form submitted, processing payment");
    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
      },
    });

    if (result.paymentIntent?.status === "succeeded") {
      console.log(
        "Frontend formData.totalCost before sending:",
        formData.totalCost
      );
      bookRoom({ ...formData, paymentIntentID: result.paymentIntent.id });
      console.log("Payment successful");
    } else {
      console.log("Payment unsucessful" + result.error?.message);
      // console.log(result);
    }
  };

  return (
    <form
      className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <span className="font-bold text-3xl">Confirm your details</span>
      <div className="grid grid-cols-2 gap-5">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200"
            type="text"
            readOnly
            disabled
            {...register("firstName")}
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200"
            type="text"
            readOnly
            disabled
            {...register("lastName")}
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Email
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200"
            type="email"
            readOnly
            disabled
            {...register("email")}
          />
        </label>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Your price summary</h2>
        <div className="bg-blue-200 p-4 rounded-md">
          <div className="font-semibold text-lg">
            Total Cost : Rs. {paymentIntent.totalCost.toFixed(2)}
          </div>
          <div className="text-xs">Cost inclusive of taxes and charges</div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-l font-semibold"> Payment Details</h3>
        <CardElement
          id="payment-element"
          className="border rounded-md p-2 text-sm"
        />
      </div>

      <div className="flex justify-end">
        <button
          disabled={isLoading}
          type="submit"
          className="bg-blue-600 text-white font-bold p-2 hover:bg-blue-400 text-md disabled:bg-gray-500"
        >
          {" "}
          {isLoading ? "Saving..." : "Confirm Booking"}{" "}
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
