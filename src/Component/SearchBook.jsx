import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import ShowDetails from "./ShowDetails";
import { Link } from "react-router-dom";


const SearchBook = () => {
  const searchResult = useContext(SearchContext);
  const initialBooks = searchResult?.searchResult ;
  const [booksWithCover, setBooksWithCover] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const[Loading,setLoading]=useState(true);
  const[BookId,setBookId]=useState("");


  useEffect(() => {
    if (initialBooks) {
      const updatedBooks = initialBooks.map((book) => ({
        ...book,
        id: book.id.replace("/works/", ""),
        cover_img: book.cover_id
          ? `http://covers.openlibrary.org/b/olid/${book.cover_id}-M.jpg`
          : "null",
      })).reverse();
      updatedBooks.sort((a, b) => b.first_publish_year - a.first_publish_year);
      setBooksWithCover(updatedBooks);
      setLoading(false);
      console.log(updatedBooks);
      
    }
  }, [initialBooks]);

  useEffect(() => {
    console.log(booksWithCover);
  }, [booksWithCover]);
  if(Loading){
    return <h1>Loading...</h1>
  }
  return (
    <main className="w-full  mx-auto">
      <div className="flex flex-wrap justify-center mt-10 ">
        {booksWithCover?.map((book) => (
          <div
            key={book.id}
            className={`m-3 p-2 flex-col justify-between shadow-lg rounded-lg text-center mt-2 w-[250px] border-2 border-gray-500 select-none cursor-pointer ${showDetails?"md:flex hidden":"flex"}`}
          >
            <img
              src={book.cover_img}
              alt={`${book.title} cover`}
              className="w-[250px] h-[300px]"
            />
            <p className="mt-2 font-bold">{book.title}</p>
            <p className="text-[14px] mt-2 relative">
              by {book.author_name.join(", ")}.{" "}
              <span className="ml-2">{book.first_publish_year}</span>
            </p>

            <Link
            to={`/book/${book.id}`} 
            onClick={()=>{setBookId(book.id);setShowDetails(true)}}
            className="button_color p-3 my-4 w-1/2 mx-auto  hover:bg-[#e86252] hover:text-white shadow-sm rounded-md">
              View Detail
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
};

export default SearchBook;
