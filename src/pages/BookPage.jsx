import { useState, useEffect } from "react";
import { Footer, Header } from "../components";

export default function BookPage() {
  const [book, setBook] = useState([]);
  const [authors, setAuthors] = useState([]);

  const id = window.location.pathname.split("/")[2];

  useEffect(() => {
    const endpoint = `http://localhost:8080/api/v1/books/${id}`;
    fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setBook(data);
        setAuthors(data.authors);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <div className="bg-white shadow-md rounded-md p-4">
        <div className="flex flex-col items-center">
          <div className="w-32 h-32">
            <img
              className="w-full h-full rounded-full object-cover"
              src={"/uploads/books/" + `${book.cover}`}
              alt={book.title}
            />
          </div>
          <div className="mt-2">
            <h3 className="text-lg font-medium text-gray-900">{book.title}</h3>
            {authors.map((author) => (
              <p key={author.id} className="text-gray-500">
                {author.first_name} {author.middle_name} {author.last_name}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
