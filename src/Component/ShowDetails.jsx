import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import LoadingAni from "./LoadingAni";
import notfound from '../assets/notfound.jpg'

const ShowDetails = () => {
  const [bookDetails, setBookDetails] = useState({ title: "", description: "", cover_img: "" });
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchBookDetails = async () => {
    try {
      const response = await fetch(`https://openlibrary.org/works/${id}.json`);
      const data = await response.json();
      console.log(data);
      if (data) {
        const { description, title, covers, subject_places, subject_times, subjects } = data;
        const newBook = {
          description: description ? description.value : "No description found",
          title: title,
          cover_img: covers ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg` : notfound,
          subject_places: subject_places ? subject_places.join(", ") : "No subject places found",
          subject_times: subject_times ? subject_times.join(", ") : "No subject times found",
          subjects: subjects ? subjects.join(", ") : "No subjects found"
        };
        setBookDetails(newBook);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching book details:", error);
    }
  };

  useEffect(() => {
    fetchBookDetails();
  }, []);

  if (loading) {
    return <LoadingAni />;
  }

  return (
    <main className="w-full max-w-[1280px] mt-10 flex flex-col flex-wrap mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center cursor-pointer"
      >
        <ArrowBackIcon />
        <span>Back</span>
      </button>
      {bookDetails && (
        <>
          <div className="items-center mx-auto">
            <img
              src={bookDetails.cover_img}
              alt={`${bookDetails.title} cover`}
              className="w-[250px] h-[300px]"
            />
          </div>
          <div className="m-3 p-2 justify-between items-center mt-2">
            <p>
              <span className="text-[20px] font-bold">Book Title : </span>
              <span>{bookDetails.title}</span>
            </p>
            <p>
              <span className="text-[20px] font-bold">Description : </span>
              <span>{bookDetails.description}</span>
            </p>
          </div>
        </>
      )}
    </main>
  );
};

export default ShowDetails;
