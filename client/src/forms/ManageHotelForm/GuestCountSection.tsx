import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm"

const GuestCount = () => {
    const { register, formState : {errors}} = useFormContext<HotelFormData>();
  return (
    <div>
        <h4 className="font-bold text-2xl mb-3">Guests</h4>
        <span className="bg-gray-300 p-5 grid grid-cols-2 gap-5 text-sm font-semibold">
            <label>Adults<br/>
            <input type="number" className="flex-1 font-normal p-1 w-full" min={1} {...register("adultCount", {required : "At least one adult needed"})}/>
            {
                errors.adultCount && 
                <span className="text-red-300 text-sm">
                    {errors.adultCount.message}
                </span>
            }
            </label>

            <label>Children<br/>
            <input type="number" className="flex-1 font-normal p-1 w-full" min={0} {...register("childCount", {required: "This field is required"})}/>
            {
                errors.childCount && 
                <span className="text-red-300 text-sm">
                    {errors.childCount.message}
                </span>
            }
            </label>
        </span>      
    </div>
  )
}

export default GuestCount
