import Link from "next/link";
import React from "react";
import { MdOutlineTableRestaurant } from "react-icons/md";

const LandingPage: React.FC = () => {
  return (
    <div className="banner bg-white flex items-center justify-center text-center text-black">
      <div className="flex flex-col items-center">
        <Link href='/products'>
          <button className="bg-white py-2 px-4 rounded-full mb-4 text-black">
            Discover Culinary Excellence →
          </button>
        </Link>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
          Online Reservations
        </h1>
        <p className="text-lg md:text-xl mb-8 text-white">
          Enjoy the finest dishes from top chefs. Welcome to an exceptional
          dining experience.
        </p>
        <div className="flex space-x-4">
          <button className="bg-white text-black py-2 px-6 rounded-full font-semibold">
            About Us
          </button>
          <button className="bg-white text-black py-2 px-6 rounded-full font-semibold flex items-center space-x-2">
            <MdOutlineTableRestaurant />
            <span>Reserve Your Table Today</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
