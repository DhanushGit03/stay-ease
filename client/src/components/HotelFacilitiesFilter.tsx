import {facilities} from '../forms/ManageHotelForm/FacilitiesSection'
type Props = {
    selectedHotelFacilities : string[],
    //type of checkbox check event
    onChange: (event : React.ChangeEvent<HTMLInputElement>) => void
}

const HotelFacilitiesFilter = ({selectedHotelFacilities, onChange} : Props) => {
    
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="font-semibold text-md mb-2">Facilities</h4>
      {
        facilities.map((facility) => (
            <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" value={facility} checked={selectedHotelFacilities.includes(facility)}
                onChange={onChange}/>
                <span> {facility}</span>
            </label>
        ))
      }
    </div>
  )
}

export default HotelFacilitiesFilter
