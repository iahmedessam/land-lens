import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className=" bg-black border-b shadow-md border-gray-300 p-4 flex justify-between items-center">
        <Link to="/">
          <img src="/images/logo.png" className="h-9" alt="logo" />
      </Link>
      <div>
        <Link to="/" className='text-white text-2xl mr-4 hover:text-blue-500 text-20 font-light'>
        Home
      </Link>
        <Link to="countries" className='text-white text-2xl mr-2 hover:text-blue-500 text-20 font-light'>
        Countries
        </Link>
      </div>
    </nav>
  );
}
