import React from 'react';
import { FaGithub } from 'react-icons/fa';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center text-white">
      <div className="flex flex-col items-center">
        <button className="bg-gray-800 py-2 px-4 rounded-full mb-4">
          Introducing Lift Mode →
        </button>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Build your component library</h1>
        <p className="text-lg md:text-xl mb-8">
          Beautifully designed components that you can copy and paste into your apps.
          Accessible. Customizable. Open Source.
        </p>
        <div className="flex space-x-4">
          <button className="bg-white text-black py-2 px-6 rounded-full font-semibold">Get Started</button>
          <button className="bg-gray-800 py-2 px-6 rounded-full font-semibold flex items-center space-x-2">
            <FaGithub />
            <span>GitHub</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
