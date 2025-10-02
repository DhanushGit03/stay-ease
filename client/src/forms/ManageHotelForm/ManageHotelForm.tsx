import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestCount from "./GuestCountSection";
import ImagesSection from "./ImagesSection";
import { HotelType } from "../../../../server/shared/types";
import { useEffect } from "react";

export type HotelFormData = {
    name : string,
    city : string,
    country : string,
    description : string,
    adultCount : number,
    childCount : number,
    imageFiles : FileList,
    imageUrls : string[], //keep lookout in next build (edit hotel feature)
    type : string,
    facilities : string[],
    pricePerNight : number,
    starRating : number
};

type Props = {
  hotel? : HotelType;
  onSave : (hotelFormData : FormData) => void;
  isLoading : boolean;
}

const ManageHotelForm = ({onSave, isLoading, hotel} : Props) => {
    const formMethods = useForm<HotelFormData>();
    const { handleSubmit, reset } =  formMethods;

      //for edit hotel auto fill
    useEffect(() => {
      reset(hotel);
    }, [hotel, reset])

    const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
      const formData = new FormData();
      console.log("form data image urls and files ", formDataJson.imageUrls)

      if(hotel){
        formData.append("hotelID", hotel._id);
      }

      formData.append("name", formDataJson.name);
      formData.append("city", formDataJson.city);
      formData.append("country", formDataJson.country);
      formData.append("description", formDataJson.description);
      formData.append("type", formDataJson.type);
      formData.append("pricePerNight", formDataJson.pricePerNight.toString());
      formData.append("starRating", formDataJson.starRating.toString());
      formData.append("adultCount", formDataJson.adultCount.toString());
      formData.append("childCount", formDataJson.childCount.toString());
  
      formDataJson.facilities.forEach((facility, index) => {
        formData.append(`facilities[${index}]`, facility);
      }); 

      if (formDataJson.imageUrls) {
        Array.from(formDataJson.imageUrls).forEach((url, index) => {
          formData.append(`imageUrls[${index}]`, url);
        });
      }

      Array.from(formDataJson.imageFiles).forEach((imageFile) => {
        formData.append(`imageFiles`, imageFile);
      });
      console.log("Form data " , formData);
      onSave(formData);
    });


  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-5" onSubmit={onSubmit}>
        <DetailsSection/>  
        <TypeSection/>   
        <FacilitiesSection/>
        <GuestCount/> 
        <ImagesSection/>

        <span className="flex justify-end">
          <button disabled={isLoading} className="bg-blue-600 py-2 px-4 text-white text-bold hover:bg-blue-500 rounded text-xl disabled:bg-gray-500" type="submit">
            {isLoading? "Saving...":"Save"}
          </button>
        </span>
      </form>
    </FormProvider>

  )
}

export default ManageHotelForm
