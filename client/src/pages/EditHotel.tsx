import { useParams } from "react-router-dom"
import * as apiClient from '../api-client'
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm"
import { useMutation, useQuery } from "react-query";
import { useAppContext } from "../contexts/AppContext";



const EditHotel = () => {
    const { hotelID } = useParams();
    const {data : hotel} = useQuery("fetchMyHotelByID", () => apiClient.fetchMyHotelByID(hotelID || ""), {
        enabled : !!hotelID
    })
    const { showToast } = useAppContext();

    const { mutate, isLoading } = useMutation(apiClient.updateMyHotelByID, {
      onSuccess: () => {
        showToast({message : "Hotel Updated!", type : "SUCCESS"})
      }, 
      onError : () => {
        showToast({message : "Error updating hotel", type : "ERROR"})
      }
    })

    const handleSave = (hotelFormData : FormData) => {
      mutate(hotelFormData)
    }

  return (
    <>
      <ManageHotelForm hotel={hotel} onSave = {handleSave} isLoading = {isLoading}/>
    </>
  )
}

export default EditHotel
