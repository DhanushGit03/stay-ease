import { useQuery } from 'react-query'
import * as apiClient from '../api-client'
import BookingForm from '../forms/BookingForm/BookingForm';
import BookingDetailsSummary from '../components/BookingDetailsSummary';
import { useSearchContext } from '../contexts/SearchContext';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { useAppContext } from '../contexts/AppContext';

const Booking = () => {
    const search = useSearchContext();
    const { stripePromise } = useAppContext();
    const { hotelID } = useParams();
    
    const { data : hotel } = useQuery("fetchHotelById", () => apiClient.searchHotelById(hotelID as string), {
      enabled : !!hotelID
    })

    const { data : user } = useQuery("fetchCurrentUser", apiClient.fetchCurrentUser);

    const [noOfNights, setNoOfNights] = useState<number>(0);

    const {data : paymentIntentData } = useQuery("createPaymentIntent", () => apiClient.createPaymentIntent(hotelID as string, noOfNights.toString()), {
      enabled : !!hotelID && noOfNights > 0
    })
    
    useEffect(() => {
      if(search.checkIn && search.checkOut){
        const nights = Math.abs(search.checkOut.getTime() - search.checkIn.getTime())/(1000*60*60*24)
        if(nights === 0){
          setNoOfNights(1);
        } else {
          setNoOfNights(Math.ceil(nights))
        }
      }
    }, [search.checkIn, search.checkOut]);

    if(!hotel){
      return <></>
    }

  return (
    <div className='grid md:grid-cols-[1fr_2fr] gap-5'>

      <BookingDetailsSummary checkIn={search.checkIn}
      checkOut = {search.checkOut}
      adultCount = {search.adultCount}
      childCount = {search.childCount}
      noOfNights = {noOfNights}
      hotel = {hotel}/>

      {user && paymentIntentData && (<>
        <Elements stripe={stripePromise} options={
          {clientSecret : paymentIntentData.clientSecret}
        }>
          <BookingForm currentUser = {user} paymentIntent={paymentIntentData}/>
        </Elements>
        
        </>)}
        
    </div>
  )
}

export default Booking
