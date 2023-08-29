import React, { useState } from "react";
import { useBooksContext } from "../hooks/useBooksContext";

const BookForm = () => {
  const { dispatch } = useBooksContext();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [copies, setCopies] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const book = {
      title,
      author,
      copies,
    };

    const response = await fetch("/api/books", {
      method: "POST",
      body: JSON.stringify(book),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setTitle("");
      setAuthor("");
      setCopies("");
      setError(null);
      setEmptyFields([]);
      console.log("new book added", json);
      dispatch({ type: "CREATE_BOOK", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new Book</h3>

      <label>Book Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label>Author:</label>
      <input
        type="text"
        onChange={(e) => setAuthor(e.target.value)}
        value={author}
        className={emptyFields.includes("author") ? "error" : ""}
      />

      <label>Copies:</label>
      <input
        type="number"
        onChange={(e) => setCopies(e.target.value)}
        value={copies}
        className={emptyFields.includes("copies") ? "error" : ""}
      />

      <button>Add Book</button>
      {error && <div className="error-box">{error}</div>}
    </form>
  );
};

export default BookForm;
