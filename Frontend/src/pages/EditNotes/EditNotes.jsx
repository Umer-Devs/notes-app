import React, { useState } from "react";
import { Sidebar } from "../../Componenets";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditNotes = () => {
  const { state } = useLocation(); 
  const { id } = useParams(); 
  const navigate = useNavigate();


  const [title, setTitle] = useState(state?.title || "");
  const [val, setVal] = useState(state?.content || "");

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") setTitle(value);
    if (name === "content") setVal(value);
  };

  
  const handleUpdate = async () => {
    try {
      const updatedNote = { title, content: val };
      await axios.put(`http://localhost:3000/notes/${id}`, updatedNote);

      alert("Note updated successfully!");
      navigate("/"); 
    } catch (error) {
      alert(error)
      console.error("Failed to update note:", error);
    }
  };

  return (
    <section className="bg-primary-dark w-full flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <section className="py-12 flex justify-center min-h-full items-center">
          <div className="bg-white rounded-md min-w-full max-w-md p-4 shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
              Edit Note
            </h2>

            <input
              type="text"
              name="title"
              value={title}
              onChange={handleChange}
              placeholder="Enter note title..."
              className="w-full p-3 border border-gray-300 rounded-md outline-none mb-3 focus:border-blue-500"
            />

            {/* Note Content */}
            <textarea
              name="content"
              value={val}
              onChange={handleChange}
              className="w-full h-40 p-3 border border-gray-300 rounded-md outline-none mb-3 resize-none focus:border-blue-500"
              placeholder="Type your note content here..."
            ></textarea>

            <button
              onClick={handleUpdate}
              className="w-full bg-blue-600 py-3 rounded-md text-xl text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
            >
              Update Note
            </button>
          </div>
        </section>
      </main>
    </section>
  );
};

export default EditNotes;
