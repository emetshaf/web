import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Footer, Header } from "../components";

export default function DiscoverPage() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const endpoint = "http://localhost:8080/api/v1/books";
    fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setBooks(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Header />
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Discover</h1>
        <div className="grid grid-cols-3 gap-4">
          {books.map((book) => (
            <div key={book.id} className="bg-white shadow-md rounded-md p-4">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32">
                  <img
                    className="w-full h-full rounded-full object-cover"
                    src={"uploads/books/" + `${book.cover}`}
                    alt={book.title}
                  />
                </div>
                <div className="mt-2">
                  <Link to={`/book/${book.id}`}>
                    <h3 className="text-lg font-medium text-gray-900">
                      {book.title}
                    </h3>
                  </Link>
                  {book.authors.map((author) => (
                    <Link to={`/authors/${author.id}`}>
                      <p key={author.id} className="text-gray-500">
                        {author.first_name} {author.middle_name}{" "}
                        {author.last_name}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
