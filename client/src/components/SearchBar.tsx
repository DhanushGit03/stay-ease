import { FormEvent, useState } from 'react'
import { useSearchContext } from '../contexts/SearchContext'
import { MdTravelExplore } from 'react-icons/md';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { useNavigate } from 'react-router-dom';


const SearchBar = () => {
    const search = useSearchContext();
    const navigate = useNavigate();

    const [destination, setDestination] = useState<string>(search.destination);
    const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
    const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
    const [adultCount, setAdultCount] = useState<number>(search.adultCount);
    const [childCount, setChildCount] = useState<number>(search.childCount);

    const handleSave = (event : FormEvent) => {
        event.preventDefault();
        search.saveSearchValues(destination, checkIn, checkOut, adultCount, childCount);
        navigate("/search")
    }

    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);


  return (
    <form className='m-auto -mt-8 bg-orange-400 p-3 rounded shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-3'>
        <div className='flex felx-row flex-1 bg-white p-2'>
            <MdTravelExplore size={25} className='mr-2'/>
            <input placeholder='Where are you going?' className='text-md w-full focus:outline-none' value={destination}
            onChange={(e) => setDestination(e.target.value)}/>
        </div>

        <div className='bg-white flex px-2 py-1 min-w-full'>
          <label className='flex items-center'>
            Adults: 
            <input type='number' className='flex font-bold p-1 focus:outline-none' min={1} max={10}
            value={adultCount}
            onChange={(e) => setAdultCount(parseInt(e.target.value))}/>
          </label>

          <label className='flex items-center'>
            Children: 
            <input type='number' className='flex font-bold p-1 focus:outline-none' min={0} max={10}
            value={childCount}
            onChange={(e) => setChildCount(parseInt(e.target.value))}/>
          </label>
        </div>

        <div>
          <DatePicker selected={checkIn} onChange={(date) => setCheckIn(date as Date)}
          selectsStart startDate={checkIn} endDate={checkOut}
          minDate={minDate} maxDate={maxDate}
          placeholderText='Check-in date'
          className='min-w-full focus:outline-none bg-white p-2'/>
        </div>

        <div>
          <DatePicker selected={checkOut} onChange={(date) => setCheckOut(date as Date)}
          selectsEnd startDate={checkIn} endDate={checkOut}
          minDate={minDate} maxDate={maxDate}
          placeholderText='Check-out date'
          className='min-w-full focus:outline-none bg-white p-2 '/>
        </div>

        <div className='flex gap-1'>
          <button className='w-2/3 bg-green-600 text-white font-bold h-full text-xl p-2 hover:bg-green-500'
          onClick = {handleSave}>
            Search
          </button>
          <button className='w-1/3 border border-2 border-red-600 bg-white text-red-600 font-bold h-full text-xl p-2 hover:bg-red-400'
          onClick={() => sessionStorage.clear()}>
            Clear
          </button>
        </div>
    </form>
  )
}

export default SearchBar
