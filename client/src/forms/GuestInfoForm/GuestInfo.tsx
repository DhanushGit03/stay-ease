import ReactDatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { useSearchContext } from "../../contexts/SearchContext";
import { useAppContext } from "../../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
    hotelID : string,
    pricePerNight : number,
}

type GuestInfoFormData = {
  checkIn : Date,
  checkOut : Date,
  adultCount : number,
  childCount : number
}

const GuestInfo = ({hotelID, pricePerNight} : Props) => {
    const search = useSearchContext();
    const { isLoggedIn } = useAppContext();
    const navigate = useNavigate();
    const location = useLocation();

    const { watch, register, handleSubmit, setValue, formState : { errors } } = useForm<GuestInfoFormData>({
      defaultValues : {
        checkIn : search.checkIn,
        checkOut : search.checkOut,
        adultCount : search.adultCount,
        childCount : search.childCount
      }
    });

    const onSignInClick = (data : GuestInfoFormData) => {
      search.saveSearchValues("", data.checkIn, data.checkOut, data.adultCount, data.childCount)
      alert("You are being redirected to sign in page...")
      navigate("/login", {state : { from : location }})
    }
    const onSubmit = (data : GuestInfoFormData) => {
      search.saveSearchValues("", data.checkIn, data.checkOut, data.adultCount, data.childCount)
      navigate(`/hotel/${hotelID}/booking`)
    }
    
    const checkIn = watch("checkIn")
    const checkOut = watch('checkOut')

    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1)

  return (
    <div className="flex flex-col p-3 bg-blue-200 gap-4">
      <h3 className="text-md font-bold">Rs. {pricePerNight} per night</h3>

      <form onSubmit={ isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)}>
        <div className="grid grid-cols-1 gap-4 items-center">
          <div className="min-w-full bg-white">
            <ReactDatePicker 
            required
            selected={checkIn} onChange={(date) => setValue("checkIn", date as Date)}
            selectsStart startDate={checkIn} endDate={checkOut}
            minDate={minDate} maxDate={maxDate}
            placeholderText='Check-in date'
            className='min-w-full focus:outline-none bg-white p-2 justify-around'/>
          </div>
          <div className="min-w-full bg-white">
            <ReactDatePicker 
            required
            selected={checkOut} onChange={(date) => setValue("checkOut", date as Date)}
            selectsStart startDate={checkIn} endDate={checkOut}
            minDate={minDate} maxDate={maxDate}
            placeholderText='Check-out date'
            className='min-w-full focus:outline-none bg-white p-2 min-w-full'/>
          </div>

          <div className='bg-white flex px-2 py-1 justify-between'>
          <label className=' flex items-center p-1'>
            Adults: 
            <input type='number' className='flex font-bold p-1 focus:outline-none' min={1} max={10}
            {...register("adultCount", {
              required: "This field is required",
              min : {
                value : 1,
                message : "There must be at least one adult"
              },
              max : {
                value : 10,
                message : "There cant be more than 10 adults"
              },
              valueAsNumber : true
            })}
            />
          </label>

          <label className='flex items-center p-1'>
            Children: 
            <input type='number' className='flex font-bold p-1 focus:outline-none' min={0} max={10}
            {...register("childCount", {
              max : {
                value : 10,
                message : "There cant be more than 10 adults"
              },
              valueAsNumber : true
            })}
            />
          </label>
          {errors.adultCount && (
            <span className="text-red-500 font-semibold text-sm">{errors.adultCount.message}</span>
          )}
        </div>

        {
          isLoggedIn ? (
            <button className="bg-blue-600 text-white font-bold h-full p-2 hover:bg-blue-500 text-xl">Book Now</button>
          ) : (
            <button className="bg-blue-600 text-white font-bold h-full p-2 hover:bg-blue-500 text-xl">Sign in to Book</button>
          )
        }
        </div>


      </form>
    </div>
  )
}

export default GuestInfo
