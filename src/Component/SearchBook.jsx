import React, { useContext, useEffect, useState } from "react";
import ShowDetails from "./ShowDetails";
import { Link } from "react-router-dom";
import LoadingAni from "./LoadingAni";
import { Maincontext } from "../context/MainContext";
import notfound from '../assets/notfound.jpg'

const SearchBook = () => {
  const { books, loading } = useContext(Maincontext);
  const [booksWithCover, setBooksWithCover] = useState([]);

  useEffect(() => {
    const updatedBooks = books.map((book) => ({
      ...book,
      id: book.id.replace("/works/", ""),
      cover_img: book.cover_id
        ? `http://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`
        : notfound,
      author_name: book.author_name ? book.author_name : ["Unknown Author"],
    })).reverse();
    updatedBooks.sort((a, b) => b.first_publish_year - a.first_publish_year);
    setBooksWithCover(updatedBooks);
    console.log(updatedBooks);
  }, [books]);

  if (loading) {
    return <LoadingAni />
  }
  return (
    <main className="w-full  mx-auto h-full">
      <div className="flex flex-wrap  justify-between mt-10 ">
        {booksWithCover?.map((book) => (
          <div
            key={book.id}
            className={`m-3 p-2 flex flex-col justify-between shadow-lg rounded-lg text-center mt-2 w-[250px] border-2 border-gray-500 select-none cursor-pointer}`}
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
           <div className="my-5 relative w-full items-center mx-auto">
           <Link
              to={`/book/${book.id}`}
              className="button_color p-3   w-1/2   hover:bg-[#e86252] hover:text-white shadow-sm rounded-md">
              View Detail
            </Link>
           </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default SearchBook;
