import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateBook = () => {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [publishYear, setPublishYear] = useState<string>("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    const data = { title: title, author: author, publishYear: publishYear };
    axios
      .post("http://localhost:5555/books", data)
      .then(() => {
        setIsLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  return (
    <div className="grid p-4 justify-center">
      <BackButton />
      <h1 className="text-3xl my-4">Create Book</h1>
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="py-4">
          <input className="border-2 border-black px-4 py-2 w-full rounded-md" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="py-4">
          <input className="border-2 border-black px-4 py-2 w-full rounded-md" type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div className="py-4">
          <input className="border-2 border-black px-4 py-2 w-full rounded-md" type="text" placeholder="Publish Year" value={publishYear} onChange={(e) => setPublishYear(e.target.value)} />
        </div>
        <button className="bg-sky-400 p-2 m-8" onClick={handleClick}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateBook;
