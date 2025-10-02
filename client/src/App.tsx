import {
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from './layouts/Layout'
import LoginLayout from "./layouts/LoginLayout";
import Register from './pages/Register'
import Login from "./pages/Login";
import AddHotel from "./pages/AddHotel";
import MyHotels from './pages/MyHotels'
import { useAppContext } from "./contexts/AppContext";
import EditHotel from "./pages/EditHotel";
import Search from './pages/Search'
import Details from "./pages/Details";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import Home from "./pages/Home";

function App() {
  const {isLoggedIn} = useAppContext();
  return (
    <Routes>
      <Route path='/' element={<Layout><Home/></Layout>}/>
      <Route path="/search" element={<Layout><Search/></Layout>}/>
      <Route path="/details/:hotelID" element={<Layout><Details/></Layout>}/>
      <Route path="/register" element ={<LoginLayout> <Register/> </LoginLayout>}/>
      <Route path="/login" element={<LoginLayout> <Login/> </LoginLayout>} />
      
      {isLoggedIn && <>
        <Route path="/hotel/:hotelID/booking" element={<LoginLayout><Booking/></LoginLayout>}></Route>
        <Route path='/add-hotel' element={<Layout><AddHotel/></Layout>}/>
        <Route path="/edit-hotel/:hotelID" element={<Layout><EditHotel/></Layout>}/>
        <Route path="/my-hotels" element={<Layout><MyHotels/></Layout>}/>
        <Route path="/my-bookings" element={<Layout><MyBookings/></Layout>}/>
        
      </>}
      <Route path='*' element={<Navigate to ="/" />} />
      
    </Routes>
  )
}

export default App
