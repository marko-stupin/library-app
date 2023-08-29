import { BooksContext } from "../context/BookContext";
import { useContext } from "react";

export const useBooksContext = () => {
  const context = useContext(BooksContext);

  if (!context) {
    throw Error("useBooksContext must be used inside an BooksContextProvider");
  }

  return context;
};
