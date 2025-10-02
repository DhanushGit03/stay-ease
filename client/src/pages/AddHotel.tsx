import { useMutation } from "react-query"
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm"
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from '../api-client'

const AddHotel = () => {
  const { showToast } = useAppContext();
  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      showToast({message: "Hotel successfully added", type: "SUCCESS"});
    },
    onError: () => {
      showToast({message: "Error saving hotel", type: "ERROR"})
    }
  });

  const handleSave = (hotelFormData : FormData) => {
    mutate(hotelFormData);
  }

  return (
    //the isLoading is what is to be done while the submit isbeing handled. Here we disable our submit button.
    <ManageHotelForm onSave={handleSave} isLoading={isLoading}/>
  )
}

export default AddHotel
