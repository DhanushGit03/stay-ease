export type Props = {
    page : number,
    pages : number,
    onPageChange : (page : number) => void;
}

const Pagination = ({page, pages, onPageChange} : Props) => {
    const pagenumber = [];
    for(let i = 1; i<=pages; i++){
        pagenumber.push(i);
    }
  return (
    <div className="flex justify-center text-slate-400">
      <ul className="flex border border-slate-300">
        {pagenumber.map((number) => (
            <li className={`px-2 py-1 ${page === number ? "bg-gray-200" : ""}`}>
                <button onClick={() => onPageChange(number)}>{number}</button>
            </li>
        ))}
      </ul>
    </div>
  )
}

export default Pagination
