import { useQuery, useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiMoney, BiHotel, BiStar } from "react-icons/bi";
import { useAppContext } from "../contexts/AppContext";
import ConfirmationModal from "../components/ConfirmationModal"; // Import the new modal component
import { useState } from "react"; // Import useState

const MyHotels = () => {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [hotelToDeleteId, setHotelToDeleteId] = useState<string | null>(null); // State for hotel ID to delete

  const { data: hotelData } = useQuery(
    "fetchMyHotels",
    apiClient.fetchMyHotels,
    {
      onError: () => {},
    }
  );

  const deleteMutation = useMutation(apiClient.deleteMyHotel, {
    onSuccess: () => {
      showToast({ message: "Hotel deleted successfully!", type: "SUCCESS" });
      queryClient.invalidateQueries("fetchMyHotels");
      setIsModalOpen(false); // Close modal on success
      setHotelToDeleteId(null); // Reset hotel ID
    },
    onError: (error: Error) => {
      showToast({
        message: error.message || "Failed to delete hotel",
        type: "ERROR",
      });
      setIsModalOpen(false); // Close modal on error
      setHotelToDeleteId(null); // Reset hotel ID
    },
  });

  const handleDeleteClick = (hotelId: string) => {
    setHotelToDeleteId(hotelId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (hotelToDeleteId) {
      deleteMutation.mutate(hotelToDeleteId);
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setHotelToDeleteId(null);
  };

  if (!hotelData) {
    return (
      <>
        <span>No hotels found</span>
        <Link
          to="/add-hotel"
          className="bg-blue-600 flex text-white text-xl font-bold p-2 hover:bg-blue-500"
        >
          Add Hotel
        </Link>
      </>
    );
  }

  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to="/add-hotel"
          className="bg-blue-600 flex text-white text-xl font-bold p-2 hover:bg-blue-500"
        >
          Add Hotel
        </Link>
      </span>

      <div className="grid grid-cols-1 gap-10">
        {hotelData.map((hotel) => {
          return (
            <div
              className="flex flex-col border justify-between border-slate-300 rounded-lg p-8 gap-5"
              key={hotel._id}
            >
              <h2 className="text-2xl font-bold">{hotel.name}</h2>
              <div className="whitespace-pre-line">{hotel.description}</div>

              <div className="grid grid-cols-5 gap-2">
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BsMap className="mr-1" />
                  {hotel.city}, {hotel.country}
                </div>

                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BsBuilding className="mr-1" />
                  {hotel.type}
                </div>

                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BiMoney className="mr-1" />
                  Rs. {hotel.pricePerNight} per night
                </div>

                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BiHotel className="mr-1" />
                  {hotel.adultCount} adults, {hotel.childCount} children
                </div>

                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BiStar className="mr-1" />
                  {hotel.starRating} stars
                </div>
              </div>

              <span className="flex justify-end gap-2">
                <Link
                  to={`/edit-hotel/${hotel._id}`}
                  className="bg-blue-600 flex text-white font-bold p-2 hover:bg-blue-500"
                >
                  View Details
                </Link>
                <button
                  onClick={() => handleDeleteClick(hotel._id)} // Changed to open modal
                  className="flex bg-red-600 text-white font-bold p-2 hover:bg-red-500"
                  disabled={deleteMutation.isLoading}
                >
                  {deleteMutation.isLoading ? "Deleting..." : "Delete Hotel"}
                </button>
              </span>
            </div>
          );
        })}
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        message="Are you sure you want to delete this hotel? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default MyHotels;
