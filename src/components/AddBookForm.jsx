// src/components/AddBookForm.js
import React, { useState } from "react";

const AddBookForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          author,
          isbn,
          price: parseFloat(price), // Convert price to float
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to add book");
      }
      const data = await response.json();
      onAdd(data);
      setTitle("");
      setAuthor("");
      setIsbn("");
      setPrice("");
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <div>
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Author:
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </label>
        <label>
          ISBN:
          <input
            type="text"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBookForm;
