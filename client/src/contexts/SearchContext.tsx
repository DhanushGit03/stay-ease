import React, { useContext, useState } from "react";

type SearchContextType = {
    destination : string,
    checkIn : Date,
    checkOut : Date,
    adultCount : number,
    childCount : number,
    hotelID : string,
//function
    saveSearchValues : (destination : string, checkIn : Date, checkOut : Date, adultCount : number, childCount : number) => void
};

type SearchContextProviderProps = {
    children : React.ReactNode
}

const SearchContext = React.createContext<SearchContextType | undefined>(undefined);

export const SearchContextProvider = ({ children } : SearchContextProviderProps) => {

    const [destination, setDestination] = useState<string>(() => sessionStorage.getItem("destination") || "");
    const [checkIn, setCheckIn] = useState<Date>(() => new Date(sessionStorage.getItem("checkIn") || new Date().toISOString()));
    const [checkOut, setCheckOut] = useState<Date>(() => new Date(sessionStorage.getItem("checkOut") || new Date().toISOString()));
    const [adultCount, setAdultCount] = useState<number>(() => parseInt(sessionStorage.getItem("adultCount") || "1"));
    const [childCount, setChildCount] = useState<number>(() => parseInt(sessionStorage.getItem("adultCount") || "0" ));
    const [hotelID, setHotelID] = useState<string>(() => sessionStorage.getItem("hotelID") || "");

    const saveSearchValues = (destination : string, checkIn : Date, checkOut : Date, adultCount : number, childCount : number, hotelID? : string) => {
        setDestination(destination);
        setCheckIn(checkIn);
        setCheckOut(checkOut);
        setAdultCount(adultCount);
        setChildCount(childCount);
        if(hotelID){
            setHotelID(hotelID)
        }

        sessionStorage.setItem("destination", destination)
        sessionStorage.setItem("checkIn", checkIn.toISOString())
        sessionStorage.setItem("checkOut", checkOut.toISOString())
        sessionStorage.setItem("adultCount", adultCount.toString())
        sessionStorage.setItem("childCount", childCount.toString())

        if(hotelID){
            sessionStorage.setItem("hotelID", hotelID)
        }
    }

    return (
        <SearchContext.Provider value={{destination, checkIn, checkOut, adultCount, childCount, hotelID, saveSearchValues}}>
            {
                children
            }
        </SearchContext.Provider>
    )
}

export const useSearchContext = () => {
    const context = useContext(SearchContext);
    return context as SearchContextType;
}
