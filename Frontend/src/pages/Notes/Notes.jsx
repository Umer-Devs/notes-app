import React, { useState } from 'react';
import { SearchCheck } from 'lucide-react';
import Sidebar from '../../Componenets/Sidebar/Sidebar';



const Notes = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Example handler for form submission
  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    console.log('Search query:', query); // Replace with actual search logic
  };

  return (
    <section className="bg-primary-dark w-full flex min-h-screen">
    <side/>
      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <section className="py-12 flex justify-center items-center">
          <form
            onSubmit={handleSearch}
            className="max-w-3xl bg-white/90 h-12 rounded-md flex items-center px-6 w-full"
          >
            <input
              type="search"
              name="search"
              placeholder="Search"
              className="h-full w-full px-2 outline-none"
            />
            <SearchCheck className="cursor-pointer" size={30} />
          </form>
        </section>
        <section>
          <h1 className="text-white text-2xl">Your notes will be shown here</h1>
        </section>
      </main>
    </section>
  );
};

export default Notes;