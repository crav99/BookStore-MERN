import React, { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { Book } from "../models/Book";
import axios from "axios";

const Home = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        setBooks(response.data.books);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8 ">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">No</th>
              <th className="border border-slate-600 rounded-md">Title</th>
              <th className="border border-slate-600 rounded-md max-md:hidden">Author</th>
              <th className="border border-slate-600 rounded-md max-md:hidden">Publish Year</th>
              <th className="border border-slate-600 rounded-md">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={index} className="h-8">
                <td className="border border-slate-700 rounded-md text-center">{index + 1}</td>
                <td className="border border-slate-700 rounded-md text-center">{book.title}</td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">{book.author}</td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">{book.publishYear.toString()}</td>
                <td className="border border-slate-700 rounded-md text-center">
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/books/details/${book._id}`}>
                      <BsInfoCircle />
                    </Link>
                    <Link to={`/books/update/${book._id}`}>
                      <AiOutlineEdit />
                    </Link>
                    <Link to={`/books/delete/${book._id}`}>
                      <MdOutlineDelete />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
