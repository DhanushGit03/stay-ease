import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm"

const ImagesSection = () => {
    const { register, watch, setValue, formState : {errors}} = useFormContext<HotelFormData>();

    const existingImages = watch("imageUrls");
    console.log("Prev image urls if any ", existingImages)
    const handleDelete = (event : React.MouseEvent<HTMLButtonElement, MouseEvent>, imageUrl : string) => {
        event.preventDefault();
        setValue("imageUrls", existingImages.filter((url) => url !== imageUrl))
    }
    
    return (
        <div>
            <h4 className="text-2xl font-bold mb-3">Images</h4>
            <div className="border rounded flex flex-colgap-4 p-4">
                {   
                    existingImages && (
                        <div className="grid grid-cols-6 gap-4">
                            {
                                existingImages.map((url) => {
                                    return(
                                    <div className="relative group">
                                        <img src={url} className="min-h-full object-cover"/>
                                        <button onClick={(event) => handleDelete(event, url)}
                                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity:100 text-white"></button>
                                    </div>
                                )})
                            }
                        </div>
                    )
                }
                <input type="file" 
                multiple 
                accept="image/*"
                className="w-full text-gray-700 font-normal"
                {...register("imageFiles", {
                    validate: (imageFiles) => {
                        const totalLength = imageFiles.length + (existingImages?.length || 0);
                        if(totalLength === 0){
                            return "Add at least one image";
                        }
                        else if (totalLength > 6){
                            return "You can add more than 6 images";
                        }
                        return true;
                    }
                })}/>
            </div>
            {errors.imageFiles && 
            <span className="font-semibold text-sm text-red-500"> {errors.imageFiles.message} </span>}
        </div>
    )
}

export default ImagesSection;