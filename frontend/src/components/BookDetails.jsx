import React from "react";
import { useBooksContext } from "../hooks/useBooksContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const BookDetails = ({ book }) => {
  const { dispatch } = useBooksContext();

  const handleClick = async () => {
    const response = await fetch("/api/books/" + book._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_BOOK", payload: json });
    }
  };
  return (
    <div onClick={handleClick} className="book-details">
      <h4>{book.title}</h4>
      <p>
        <span className="strong">Author: </span>
        {book.author}
      </p>
      <p>
        <span className="strong">Copies: </span>
        {book.copies}
      </p>
      <p>
        {formatDistanceToNow(new Date(book.createdAt), { addSuffix: true })}
      </p>
      <span> {">"} click to delete</span>
    </div>
  );
};

export default BookDetails;
