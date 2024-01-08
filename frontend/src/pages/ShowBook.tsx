import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import { Book } from "../models/Book";
import axios from "axios";
import Spinner from "../components/Spinner";

const ShowBook = () => {
  const [book, setBook] = useState<Book>();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data.books);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  });

  return (
    <div className="grid p-4 justify-center">
      <BackButton />
      <h1 className="text-3xl my-4">Show Book</h1>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Id</span>
            <span>{book ? book._id : ""}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Title</span>
            <span>{book ? book.title : ""}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Author</span>
            <span>{book ? book.author : ""}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Publish Year</span>
            <span>{book ? book.publishYear.toString() : ""}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Create Time</span>
            <span>{book ? new Date(book.createdAt).toString() : ""}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Last Update Time</span>
            <span>{book ? new Date(book.updatedAt).toString() : ""}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
