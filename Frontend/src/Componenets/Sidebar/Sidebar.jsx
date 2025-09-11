import React from 'react';
import { unknow } from '../../assets';



const Sidebar = ({ isSidebarOpen, toggleSidebar, navLinks }) => {
      const navLinks = ["Notes", "Edit Notes", "Delete Notes"];
  return (
    <>
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static min-h-screen w-64 lg:w-60 bg-dark-brown rounded-md space-y-8 transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="my-12 space-y-6 flex flex-col items-center">
          <div className="relative">
            <img
              className="rounded-full w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 object-cover"
              src={unknow}
              alt="User profile"
            />
          </div>
          <p className="text-primary-light font-bold text-center text-lg sm:text-xl">
            UserName
          </p>
        </div>

        <ul className="flex flex-col items-center gap-6 font-bold tracking-widest cursor-pointer">
          {navLinks.map((value, index) => (
            <li
              key={index}
              className="text-white text-lg sm:text-xl hover:text-primary-light transition-colors duration-200"
            >
              {value}
            </li>
          ))}
        </ul>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;