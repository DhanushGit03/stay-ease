import {hotelTypes} from '../forms/ManageHotelForm/TypeSection'
type Props = {
    selectedHotelTypes : string[],
    //type of checkbox check event
    onChange: (event : React.ChangeEvent<HTMLInputElement>) => void
}

const HotelTypeFilter = ({selectedHotelTypes, onChange} : Props) => {
    
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="font-semibold text-md mb-2">Property Rating</h4>
      {
        hotelTypes.map((type) => (
            <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" value={type} checked={selectedHotelTypes.includes(type)}
                onChange={onChange}/>
                <span> {type}</span>
            </label>
        ))
      }
    </div>
  )
}

export default HotelTypeFilter
