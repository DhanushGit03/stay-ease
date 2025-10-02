import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
    const { register, formState: {errors} } = useFormContext<HotelFormData> ();

    return (
    <div className="flex flex-col gap-5">
      <h1 className="font-bold text-3xl mb-3">Add Hotel</h1>

      <label className='text-gray-700 text-sm font-bold flex-1'>
            Hotel Name
            <input className='border rounded w-full py-1 px-2 font-normal' type='text'
            {...register("name", {required: "Enter the hotel name"})}></input>
            {errors.name && (
                <span className='text-red-500'> { errors.name.message } </span>
            )}
        </label>

        <div className="flex gap-5">
            <label className='text-gray-700 text-sm font-bold flex-1'>
                City
                <input className='border rounded w-full py-1 px-2 font-normal' type='text'
                {...register("city", {required: "Enter the city hotel is situated in"})}></input>
                {errors.city
                && (
                    <span className='text-red-500'> { errors.city.message } </span>
                )}
            </label>
            <label className='text-gray-700 text-sm font-bold flex-1'>
                Country
                <input className='border rounded w-full py-1 px-2 font-normal' type='text'
                {...register("country", {required: "Enter the country"})}></input>
                {errors.country
                && (
                    <span className='text-red-500'> { errors.country.message } </span>
                )}
            </label>
        </div>

        <label className='text-gray-700 text-sm font-bold flex-1'>
                Description
                <textarea className='border rounded w-full py-1 px-2 font-normal'
                {...register("description", {required: "Enter the description"})}></textarea>
                {errors.description
                && (
                    <span className='text-red-500'> { errors.description.message } </span>
                )}
        </label>
        <label className='text-gray-700 text-sm font-bold max-w-[50%]'>
                Price per night
                <input className='border rounded w-full py-1 px-2 font-normal' type="number" min = {1}
                {...register("pricePerNight", {required: "Enter the price of one night stay"})}></input>
                {errors.pricePerNight
                && (
                    <span className='text-red-500'> { errors.pricePerNight.message } </span>
                )}
        </label>

        <label className='text-gray-700 text-sm font-bold max-w-[50%]'>
                Star Rating
                
                <select {...register("starRating", {required: "Enter star rating of hotel"})} 
                className="font-normal text-gray-700 p-2 w-full border rounded">

                    <option value="" className="text-sm font-bold"> Select as Rating</option>
                    {
                        [1,2,3,4,5].map((num) => {
                            return(
                                <option value={num} className="text-sm font-bold">{num}</option>
                            )
                        })
                    }

                </select>
                {errors.starRating
                && (
                    <span className='text-red-500 mb-3'> { errors.starRating.message } </span>
                )}
        </label>
    </div>
)
}


export default DetailsSection
