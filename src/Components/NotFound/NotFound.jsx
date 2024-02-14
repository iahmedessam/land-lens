import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className='flex-grow flex justify-center items-center'>
      <div className='text-center'>
        <h1 className='text-16xl text-white font-bold'>404</h1>
        <p className='text-4xl text-white font-bold -mt-60 mb-6'>Page not found</p>
        <button onClick={() => navigate('/')} type='button' className='btnHome'>
          Return Home
        </button>
      </div>
    </div>
  );
}
