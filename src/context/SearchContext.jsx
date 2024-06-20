import { createContext, useState } from "react";




export const SearchContext = createContext(
);

export const SearchContextProvider = ({children}) => {
  const [searchResult, setSearchResult] = useState([]);
  const searchbynameurl = "https://openlibrary.org/search.json?title=";

  const SearchByinput = async (input) => {
    const response = await fetch(
      `https://openlibrary.org/search.json?title=${encodeURIComponent(input)}`
    );
    const data = await response.json();
    const { docs } = data;

    if (docs) {
      const books = docs.map((book) => ({
        key: book.key,
        id: book.key,
        title: book.title,
        author_name: book.author_name,
        cover_id: book.cover_edition_key,
        first_publish_year: book.first_publish_year,
      }));
      setSearchResult(books);
    } else {
      setSearchResult([]);
    }
  };

  const SearchbySubject = async (input) => {
    const url = `https://openlibrary.org/subjects/${encodeURIComponent(input)}.json?limit=100&&offset=100`;
    const response = await fetch(url);
    const data = await response.json();
    const { works } = data;

    if (works) {
      const books= works.map((book) => ({
        key: book.key,
        id: book.key,
        title: book.title,
        author_name: book?.authors.map((author) => author.name),
        cover_id: book.cover_edition_key,
        first_publish_year: book.first_publish_year,
      }));
      setSearchResult(books); ``
    } else {
      setSearchResult([]);
    }
  };

  return (
    <SearchContext.Provider value={{ searchResult, SearchByinput, SearchbySubject }}>
      {children}
    </SearchContext.Provider>
  );
};
