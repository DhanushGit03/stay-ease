import { useSearchContext } from "../contexts/SearchContext"
import { useQuery } from 'react-query'
import * as apiClient from '../api-client' 
import { useState } from "react";
import SearchResultCard from '../components/SearchResultCard'
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypeFilter from "../components/HotelTypeFilter";
import HotelFacilitiesFilter from "../components/HotelFacilitiesFilter";
import PriceFilter from "../components/PriceFilter";

const Search = () => {
    const search = useSearchContext();
    
    const [page, setPage] = useState<number>(1);
    const [selectedStars, setselectedStars] = useState<string[]>([]);
    const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
    const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
    const [sortOption, setSortOption] = useState<string>("")

    const searchParams = {
      destination : search.destination,
      checkIn : search.checkIn.toISOString(),
      checkOut : search.checkOut.toISOString(),
      adultCount : search.adultCount.toString(),
      childCount : search.childCount.toString(),
      page : page.toString(),
      stars: selectedStars,
      types : selectedHotelTypes,
      facilities : selectedFacilities,
      maxPrice : selectedPrice?.toString(),
      sortOption, 
    }

    const { data : hotelData } = useQuery(["search", searchParams], () => apiClient.searchHotels(searchParams))

    const handleStarsChange = (event : React.ChangeEvent<HTMLInputElement>) => {
      const star = event.target.value;
      setselectedStars((prev) => 
      event.target.checked ? [...prev, star] : prev.filter(c => c !== star))
    }
    const handleHotelTypeChange = (event : React.ChangeEvent<HTMLInputElement>) => {
      const type = event.target.value;
      setSelectedHotelTypes((old) => 
        event.target.checked? [...old, type] : old.filter((t) => t !== type)
      )
    }
    const handleFacilityChange = (event : React.ChangeEvent<HTMLInputElement>) => {
      const faci = event.target.value;
      setSelectedFacilities((prevFacilities) => (
        event.target.checked?[...prevFacilities, faci] : prevFacilities.filter((f) => f !== faci)
      ))
    }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      {/* filters */}
      <div className="border rounded-lg border-slate-300 p-5 h-fit sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">Filter by : </h3>
          <StarRatingFilter selectedStars={selectedStars} onChange={handleStarsChange}/>
          <HotelTypeFilter selectedHotelTypes={selectedHotelTypes} onChange={handleHotelTypeChange}/>
          <HotelFacilitiesFilter selectedHotelFacilities={selectedFacilities} onChange={handleFacilityChange}/>
          <PriceFilter selectedPrice={selectedPrice} onChange={(value?: number) => setSelectedPrice(value)}/>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
          {hotelData?.pagination.total} Hotels found {search.destination ? `in ${search.destination}` : ""}
          </span>
          {/* to add sort options */}
          <select value={sortOption} onChange={(event) => setSortOption(event.target.value)}
          className="p-2 border rounded-md">
            <option value="">Sort By</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerNightAsc">Price per night (low to high)</option>
            <option value="pricePerNightDesc">Price per night (high to low)</option>
          </select>
        </div>

       { hotelData?.data.map((hotel) => (
        <SearchResultCard hotel={hotel}/>
       ))}

       <div>
        <Pagination page={hotelData?.pagination.page || 1} pages={hotelData?.pagination.pages || 1} onPageChange={(page) => setPage(page)}/>
       </div>
      </div>
    </div>
  )
}

export default Search
