import React, { useState, useEffect } from 'react';
import { SearchCheck } from 'lucide-react';
import { Sidebar } from '../../Componenets';
import axios from 'axios';

const Notes = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [originalData, setOriginalData] = useState([]);

  // Handler for search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value.toLowerCase();
    const filteredData = originalData.filter(note =>
      note.title.toLowerCase().includes(query)
    );
    setData(filteredData);
  };

  // Fetch notes from backend
  const fetchNotesData = async () => {
    try {
      setLoading(true);
      const notesData = await axios.get('http://localhost:3000/notes');
      setOriginalData(notesData.data);
      setData(notesData.data);
    } catch (error) {
      console.log("Failed to fetch notes", error);
      setError("Failed to fetch notes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotesData();
  }, []);

  // Format date function
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Loading state
  if (loading) {
    return (
      <section className="bg-gray-900 w-full flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 flex justify-center items-center">
          <div className="text-white text-2xl font-semibold animate-pulse">Loading your notes...</div>
        </main>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="bg-gray-900 w-full flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 flex justify-center items-center">
          <div className="text-red-500 text-2xl font-semibold">{error}</div>
        </main>
      </section>
    );
  }

  return (
    <section className="bg-gray-900 w-full flex min-h-screen">
      <Sidebar />
      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <section className="py-8 flex justify-center items-center">
          <form
            onSubmit={handleSearch}
            className="max-w-3xl bg-gray-800/80 h-14 rounded-xl flex items-center px-4 w-full shadow-lg backdrop-blur-md border border-gray-700"
          >
            <input
              type="search"
              name="search"
              placeholder="Search notes by title..."
              className="h-full w-full px-3 text-white bg-transparent outline-none placeholder-gray-400"
            />
            <SearchCheck className="text-gray-300 cursor-pointer hover:text-blue-400 transition-colors" size={28} />
          </form>
        </section>
        <section className="mt-10">
          <h1 className="text-white text-3xl font-bold text-center mb-8 italic underline decoration-blue-500">Your Notes</h1>
          {data.length === 0 ? (
            <h2 className="text-white text-xl font-semibold text-center italic">
              No notes found. Start creating some!
            </h2>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data.map((note,index) => (
                <div
                  key={note._id}
                  className="group bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-md rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-700/50 hover:border-blue-500/30"
                >
                    <div className='text-dark-brown underline italic font-bold '><p>Note {index+1}</p></div>
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-white font-bold text-lg flex-1 pr-2 truncate group-hover:text-blue-300 transition-colors">{note.title || 'Untitled'}</h2>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-blue-600/80 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 shadow-md hover:shadow-lg">
                        Edit
                      </button>
                      <button className="bg-red-600/80 hover:bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 shadow-md hover:shadow-lg">
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="text-gray-400 space-y-1 text-sm">
                    <span className="flex text-md items-center ">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                      Created: {formatDate(note.createdAt)}
                    </span>
                    <span className="flex  items-center">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                      Updated: {formatDate(note.updatedAt)}
                    </span>
                    <button className='bg-[#415A77] px-3 py-2 rounded-md text-white mt-4 cursor-pointer'>View Notes</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </section>
  );
};

export default Notes;