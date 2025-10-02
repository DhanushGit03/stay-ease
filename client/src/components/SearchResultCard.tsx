import { HotelType } from '../../../server/shared/types'
import { AiFillStar } from 'react-icons/ai'
import {Link} from 'react-router-dom'

type Props = {
    hotel : HotelType
}

const SearchResultCard = ({hotel} : Props) => {
  return (
    <div className='grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-8 gap-8'>
      <div className="w-full h-[300px]">
        <img src={hotel.imageUrls[0]} className='w-full h-full object-cover object-center'/>
      </div>

      <div className='grid grid-rows-[1fr_2fr_1fr]'>
        <div>
          <div className='flex items-center'>
            <span className='flex'>
              {Array.from({length : hotel.starRating}).map(() => (
                <AiFillStar className='fill-yellow-400'/>
              ))}
            </span>
            <span className='ml-3 text-sm'>
                {hotel.type}
            </span>
          </div>
          <Link to={`/details/${hotel._id}`} className='text-2xl cursor-pointer font-bold'>{hotel.name}</Link>
        </div>

        <div>
          <div className='line-clamp-4'>
            {hotel.description}
          </div>
        </div>

        <div className='grid grid-cols-2 whitespace-nowrap items-end'>
          <div className='flex gap-1 items-center'>
                {hotel.facilities.slice(0,3).map((facility) => (
                  <span className='bg-slate-300 font-semibold border rounded-lg p-2 text-xs whitespace-nowrap'>{facility}</span>
                ))}
                <span className='text-sm'>{hotel.facilities.length > 3 && `+ ${hotel.facilities.length-3} more`}</span>
          </div>

          <div className='flex flex-col gap-1 items-end'>
                  <span className='font-bold '>Rs. {hotel.pricePerNight} per night</span>
                  <Link to={`/details/${hotel._id}`} className='font-bold bg-blue-600 text-xl text-white p-2 h-full max-w-fit hover:bg-blue-500'>View More</Link>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default SearchResultCard
