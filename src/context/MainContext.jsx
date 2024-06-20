import { createContext, useEffect, useState } from "react";


const Maincontext = createContext();

const MainContextProvider = ({ children }) => {
    const [searchValue, SetserachValue] = useState("");
    const [books, SetBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    const FetchByInputs = async (value) => {
        SetserachValue(value);
        setLoading(true);
        const response = await fetch(`http://openlibrary.org/search.json?title=${searchValue}`);
        const data = await response.json();
        const { docs } = data;
        if (docs) {
            const Book = docs.map((item) => {
                return {
                    id: item.key,
                    title: item.title,
                    cover_id: item.cover_i,
                    author_name: item.author_name,
                    first_publish_year: item.first_publish_year,
                };
            });
            SetBooks(Book);
            setLoading(false);
        }
    }

    const FetchBySubjects=async(value)=>{
        setLoading(true);
        const response= await fetch(`https://openlibrary.org/subjects/${encodeURIComponent(value)}.json?limit=100&offset=100`)
        const data= await response.json();
        const {works}=data;
        if(works){
            const Book=works.map((item)=>{
                return{
                    id:item.key,
                    title:item.title,
                    cover_id:item.cover_id,
                    author_name:item.author_name,
                    first_publish_year:item.first_publish_year,
                }
            })
            SetBooks(Book);
            setLoading(false);
        }
    }

    return(
        <Maincontext.Provider value={{loading,books,FetchByInputs,FetchBySubjects}}>
            {children}
        </Maincontext.Provider>

    )

}
export {MainContextProvider,Maincontext}
