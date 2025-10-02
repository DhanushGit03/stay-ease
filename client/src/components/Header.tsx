
import {Link} from 'react-router-dom'
import { useAppContext } from '../contexts/AppContext'
import SignOutButton from './SignOutButton'

const Header = () => {

  const {isLoggedIn} = useAppContext();

  return (
    <div className='bg-blue-800 py-6'>
      <div className='container mx-auto flex justify-between'>
        <span className='text-3xl text-white font-bold tracking-tight'>
            <Link to="/">Book A Hotel</Link>
        </span>
        <span className='flex space-x-2 items-center'>
          {
            isLoggedIn? <>
              <Link className = "flex items-center px-3 py-2 font-bold text-white hover:bg-blue-600" to="/my-bookings">My bookings</Link>
              <Link className = "flex items-center px-3 py-2 font-bold text-white hover:bg-blue-600" to="/my-hotels">My hotels</Link>
              <SignOutButton />
            </> : <Link to="/login" className='flex items-center text-blue-600 px-3 py-2 bg-white font-bold hover:bg-gray-200 '>Sign in</Link>
          }
            
        </span>
      </div>
    </div>
  )
}

export default Header
