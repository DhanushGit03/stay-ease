type Props = {
    selectedStars : string[],
    //type of checkbox check event
    onChange: (event : React.ChangeEvent<HTMLInputElement>) => void
}

const StarRatingFilter = ({selectedStars, onChange} : Props) => {
    
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="font-semibold text-md mb-2">Property Rating</h4>
      {
        ['5','4','3','2','1'].map((rating) => (
            <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" value={rating} checked={selectedStars.includes(rating)}
                onChange={onChange}/>
                <span> Stars</span>
            </label>
        ))
      }
    </div>
  )
}

export default StarRatingFilter
