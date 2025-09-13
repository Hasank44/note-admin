import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const handleSubscribe = (e) => {
    const value = e.target.email.value;
    e.preventDefault();
    console.log('Email submitted:', value);
  };

  return (
    <footer className="w-full bg-black/60 font-serif ">
      <div className="bg-gray-900 py-3">
        <div className="max-w-7xl mx-auto mb-5 px-4 sm:px-6 lg:px-8 grid grid-cols-He1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          <div>
            <h2 className="text-gray-200 mb-3 text-lg">About Us</h2>
            <p className="text-gray-400 text-sm max-w-xs mx-auto sm:mx-0">
              We are a team of handle User. Discover your next favorite with us.
            </p>
            <div className="flex justify-center sm:justify-start gap-4 mt-4 text-gray-400">
              <a href="https://facebook.com" aria-label="Visit our Facebook page">
                <FaFacebook className="cursor-pointer hover:text-amber-500" />
              </a>
              <a href="https://twitter.com" aria-label="Visit our Twitter page">
                <FaTwitter className="cursor-pointer hover:text-amber-500" />
              </a>
              <a href="https://instagram.com" aria-label="Visit our Instagram page">
                <FaInstagram className="cursor-pointer hover:text-amber-500" />
              </a>
              <a href="https://linkedin.com" aria-label="Visit our LinkedIn page">
                <FaLinkedin className="cursor-pointer hover:text-amber-500" />
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-gray-200 mb-3 text-lg">Quick Links</h2>
            <ul className="text-gray-400 text-sm space-y-2">
              <li><a href="/#" className="hover:text-amber-500">Home</a></li>
              <li><a href="/#" className="hover:text-amber-500">All Users</a></li>
              <li><a href="/#" className="hover:text-amber-500">New Releases</a></li>
              <li><a href="#" className="hover:text-amber-500">About Us</a></li>
            </ul>
          </div>

          <div>
            <h2 className="text-gray-200 mb-3 text-lg">Support</h2>
            <ul className="text-gray-400 text-sm space-y-2">
              <li><a href="#" className="hover:text-amber-500">About Us</a></li>
              <li><a href="#" className="hover:text-amber-500">FAQ</a></li>
              <li><a href="#" className="hover:text-amber-500">Users Information</a></li>
              <li><a href="#" className="hover:text-amber-500">Returns Policy</a></li>
              <li><a href="#" className="hover:text-amber-500">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h2 className="text-gray-200 mb-3 text-lg">Newsletter</h2>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for updates and exclusive offers.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <label htmlFor="email-bottom" className="sr-only">
                Email address for newsletter
              </label>
              <input
                id="email-bottom"
                type="email"
                name="email"
                placeholder="Your Email Address"
                className="px-2 py-1.5 rounded-md text-gray-300 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500 w-full max-w-xs mx-auto sm:mx-0"
                aria-label="Email address for newsletter"
                required
              />
              <button
                type="submit"
                className="px-2 py-1.5 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors cursor-pointer"
                aria-label="Subscribe to newsletter"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <hr className="border-gray-700 pt-2" />
        <div className="bg-gray-900 text-center text-gray-300 text-sm py-1 font-sans">
          &copy; {new Date().getFullYear()} Your Note. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;