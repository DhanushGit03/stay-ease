import { HotelType } from '../../../server/shared/types'
import { Link } from 'react-router-dom'

type Props = {
    hotel : HotelType
}

const LatestDestinationCard = ({hotel} : Props) => {
  return (
    <Link to={`/details/${hotel._id}`} className="relative cursor-pointer overflow-hidden rounded-md">
        <div className='h-[300px]'>
            <img src={hotel.imageUrls[0]} className='w-full h-full object-cover object-center'/>
        </div>    

        <div className='absolute bottom-0 p-4 bg-black bg-opacity-30 rounded-b-md'>
            <span className='text-white font-bold text-2xl tracking-tight'>{hotel.name}</span>
        </div>
    </Link>
  )
}

export default LatestDestinationCard
