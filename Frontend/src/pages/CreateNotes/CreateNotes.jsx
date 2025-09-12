import React, { useState } from 'react';
import { SearchCheck } from 'lucide-react';
import { Sidebar } from '../../Componenets';
import axios from 'axios';

const CreateNotes = () => {
  const [val, setVal] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handlerChange = async () => {
    if (!title.trim() || !val.trim()) {
      alert("Please add both title and note content!");
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:3000/notes", { title, val });
      setVal("");
      setTitle("");
      alert("Note created successfully!"); // Or use a toast notification
    } catch (error) {
      console.log("failed to sent notes value", error);
      alert("Failed to create note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-primary-dark w-full flex min-h-screen">
      <Sidebar />
      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <section className="py-12 flex justify-center min-h-full items-center">
          <div className='bg-white  rounded-md min-w-full max-w-md p-4 shadow-lg'>
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Create New Note</h2>
            
            {/* Title Input */}
            <input
              type="text"
              value={title}
              onChange={(e) => { setTitle(e.target.value); }}
              placeholder="Enter note title..."
              className='w-full p-3 border border-gray-300 rounded-md outline-none mb-3 focus:border-blue-500'
            />
            
            {/* Note Content */}
            <textarea
              value={val}
              onChange={(e) => { setVal(e.target.value); }}
              name=""
              id=""
              className='w-full h-40 p-3 border border-gray-300 rounded-md outline-none mb-3 resize-none focus:border-blue-500'
              placeholder='Type your note content here...'
            ></textarea>
            
            <button
              onClick={handlerChange}
              disabled={loading}
              className='w-full bg-blue-600 py-3 rounded-md text-xl text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors'
            >
              {loading ? "Creating..." : "Submit"}
            </button>
          </div>
        </section>
      </main>
    </section>
  );
};

export default CreateNotes;