import React, { useContext, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Category } from "../Utlis/CategoryUtlis";
import { SearchContext } from "../context/SearchContext";
import SearchBook from "./SearchBook";
import { Link, useNavigate } from "react-router-dom";
const HomeComponent = () => {
  const searchvalue = useRef<HTMLInputElement>(null);
  const { SearchByinput, SearchbySubject } = useContext(SearchContext) || {};
  // Navigate
  const navigate = useNavigate();
  const SearchByinputValue = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const Tempvalue = searchvalue.current?.value.trim() || "";
    if (SearchByinput) {
      SearchByinput(Tempvalue);
      navigate("/Books");
    }
  };
  const CategoryClick = (item: string) => {
    if (SearchbySubject) {
      SearchbySubject(item);
      navigate("/Books");
    }
  };
  return (
    <main className="w-full  mt-10 ">
      <form
        className="Search rounded-md shadow-md max-w-[900px] mx-2 bg-transparent p-2 border-gray-500  lg:mx-auto flex items-center bg-[#f0f0f0]"
        onSubmit={SearchByinputValue}
      >
        <input
          type="text"
          placeholder="Search"
          ref={searchvalue}
          className="outline-none  p-3  bg-transparent  rounded-lg w-full"
        />
        <button type="submit">
          <SearchIcon className="mr-4 cursor-pointer " />
        </button>
      </form>
      <section className="max-w-[1000px] md:block hidden mx-auto select-none">
        {
          <div className="flex flex-wrap justify-center mt-10 ">
            {Category.map((item) => (
              <div
                onClick={() => item.url && CategoryClick(item.url)}
                key={item.id}
                className={`m-2 p-2 text-center mt-2 w-[120px]  rounded-3xl ${item.style} cursor-pointer`}
              >
                {item.name}
              </div>
            ))}
          </div>
        }
      </section>
    </main>
  );
};

export default HomeComponent;
