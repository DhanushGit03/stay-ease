import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

export const facilities = [
    "Free WiFi",
    "Parking",
    "Pool",
    "Spa",
    "Gym",
    "Family room",
    "Other"
];

const FacilitiesSection = () => {
  const { register, formState : { errors }} = useFormContext<HotelFormData>();
  return (
    <div>
      <h4 className="text-2xl font-bold mb-3">Facilities</h4>
    <div className="grid grid-cols-3 gap-3">
      {facilities.map((facility) => {
        return (
          <label className="cursor-pointer flex gap-1 text-sm text-gray-700">
            <input type="checkbox" value={facility} {...register("facilities", {
              validate : (facilityList) => {
                if(facilityList && facilityList.length != 0){
                  return true;
                }
                return "At least one facility must be added";
              }
            })}/>{facility}

            {
              errors.facilities && 
              <span className="text-sm font-bold text-red-500"> {errors.facilities.message} </span>
            }
          </label>
        )
      })}
    </div>
    </div>
  )
}

export default FacilitiesSection
