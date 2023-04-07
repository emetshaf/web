import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Footer, Header } from "../components";

const AuthorsPage = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/authors")
      .then((response) => response.json())
      .then((data) => {
        setAuthors(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Header />

      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center">Authors</h1>
        <div className="flex flex-wrap justify-center">
          {authors.map((author) => (
            <div className="w-1/3 p-4">
              <div className="bg-white shadow-lg rounded-lg p-4">
                <div className="flex justify-center md:justify-end -mt-16">
                  <img
                    className="w-20 h-20 object-cover rounded-full border-2 border-indigo-500"
                    src={"/uploads/authors/" + `${author.image}`}
                    alt="avatar"
                  />
                </div>
                <div>
                  <h2 className="text-gray-800 text-3xl font-semibold">
                    {author.first_name} {author.middle_name} {author.last_name}
                  </h2>
                  {/* <p className="mt-2 text-gray-600">{author.bio}</p> */}
                </div>
                <div className="flex items-center justify-center mt-4 text-gray-900">
                  <Link
                    to={`/authors/${author.id}`}
                    className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

const AuthorPage = () => {
  const [author, setAuthor] = useState([]);
  const [books, setBooks] = useState([]);

  const id = window.location.pathname.split("/")[2];

  useEffect(() => {
    const endpoint = `http://localhost:8080/api/v1/authors/${id}`;
    fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setAuthor(data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const endpoint = `http://localhost:8080/api/v1/books?author=${id}`;
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
        <div className="bg-white shadow-md rounded-md p-4">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32">
              <img
                className="w-full h-full rounded-full object-cover"
                src={"/uploads/authors/" + `${author.image}`}
                alt={author.first_name}
              />
            </div>
            <div className="mt-2">
              <h3 className="text-lg font-medium text-gray-900">
                {author.first_name} {author.middle_name} {author.last_name}
              </h3>
              <p className="text-gray-500">{author.bio}</p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-md p-4 mt-4">
          <h3 className="text-lg font-medium text-gray-900">Books</h3>
          <div className="flex flex-wrap justify-center">
            {books.map((book) => (
              <div className="w-1/3 p-4">
                <div className="bg-white shadow-lg rounded-lg p-4">
                  <div className="flex justify-center md:justify-end -mt-16">
                    <img
                      className="w-20 h-20 object-cover rounded-full border-2 border-indigo-500"
                      src={"/uploads/books/" + `${book.cover}`}
                      alt="avatar"
                    />
                  </div>
                  <div>
                    <h2 className="text-gray-800 text-3xl font-semibold">
                      {book.title}
                    </h2>
                    {/* <p className="mt-2 text-gray-600">{book.description}</p> */}
                  </div>
                  <div className="flex items-center justify-center mt-4 text-gray-900">
                    <Link
                      to={`/books/${book.id}`}
                      className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                    >
                      View Book
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export { AuthorsPage, AuthorPage };
