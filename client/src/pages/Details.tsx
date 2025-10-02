import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import * as apiClient from '../api-client'
import { AiFillStar } from "react-icons/ai"
import GuestInfo from "../forms/GuestInfoForm/GuestInfo"

const Details = () => {

    const {hotelID} = useParams()
    
    const { data : hotel } = useQuery("searchHotelById", () => apiClient.searchHotelById(hotelID || ""), { enabled : !!hotelID})

    if(!hotel){
      return <></>
    }
  return (
    <div className="space-y-6">
      <div>
        <span className="flex gap-1">
          {
            Array.from({length : hotel.starRating}).map(() => (
              <AiFillStar className="fill-yellow-400"/>
            ))
          }
        </span>
        <h1 className="text-3xl font-bold">{hotel.name}</h1>
      </div>

      <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
        {hotel.imageUrls.map((url) => (
          <div className="h-[300px]">
            <img src={url} alt={hotel.name} className="rounded-md w-full h-full object-cover object-center"/>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        {hotel.facilities.map((facility) => (
          <div className="border border-slate-300 rounded-sm p-3">{facility}</div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
        <div className="whitespace-pre-line">{hotel.description}</div>
        <div><GuestInfo pricePerNight={hotel.pricePerNight} hotelID={hotel._id}/></div>
      </div>
    </div>
  )
}

export default Details
