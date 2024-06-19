import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    // <footer className="bg-slate-200">
    //   <div className="container mx-auto p-4">
    //     <p className="text-center font-bold" title="Youtube Channel">
    //       Dynamic Coding 
    //     </p>
    //   </div>
    // </footer>

    <footer className="bg-gray-800 text-white py-8">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between">
        {/* Links Section */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">Shop</a></li>
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </div>
        {/* Social Media Section */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-400"><FaFacebookF /></a>
            <a href="#" className="hover:text-gray-400"><FaTwitter /></a>
            <a href="#" className="hover:text-gray-400"><FaInstagram /></a>
          </div>
        </div>
        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p className="mb-2">Email: info@shoppingcart.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
      </div>
      <div className="mt-8 text-center border-t border-gray-700 pt-4">
        <p>&copy; {new Date().getFullYear()} Shopping Cart. All rights reserved.</p>
      </div>
    </div>
  </footer>
    
  );
};

export default Footer;
