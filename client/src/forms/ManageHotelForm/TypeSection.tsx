import { useFormContext } from "react-hook-form";

export const hotelTypes = [
    "Luxury", "Budget", "Vacation", "Beach side", "City view", "Buisness", "Romantic", "Lodge", "Motel"
];


const TypeSection = () => {
    const { register, watch,formState: {errors} } = useFormContext();
    const typeWatch = watch("type")
  return (
    <div>
      <h4 className="text-2xl font-bold mb-3">Type</h4>
      <div className="grid grid-cols-3 gap-3">
        {
            hotelTypes.map((type) => {
                return (
                <label className={
                    typeWatch === type ? "cursor-pointer bg-blue-300 rounded-full px-4 py-2 text-sm text-semibold" : "cursor-pointer bg-gray-200 rounded-full px-4 py-2 text-sm text-semibold"
                }>
                    <input type="radio" className="hidden" value={type} {...register("type", {required : "Select at least one type"})}/>
                    <span>{type}</span>
                </label>
                )
            })
        }
      </div>
      {errors.type && 
        <span className="text-red-500 text-sm font-bold">{errors.type.message as string}</span>
      }
    </div>
  )
}

export default TypeSection
