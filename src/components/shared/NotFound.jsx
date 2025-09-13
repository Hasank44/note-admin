import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router
import notFound from '../../assets/image/404.svg'
const NotFound = () => {
  return (
    <div className="min-h-screen sm:flex items-center justify-center bg-gray-100">
        <img src={notFound} alt="" className='w-full sm:w-[28%]' />
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;