// components/ContactForm.js
import React from 'react';

const ContactForm = () => {
  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-md text-gray-300">
      <h2 className="text-xl font-semibold mb-4">Get more updates...</h2>
      <p className="mb-4">
        Do you want to get notified when a new component is added to Flowbite? Sign up for our newsletter and you'll be among the first to find out about new features, components, versions, and tools.
      </p>
      <form>
        <div className="flex items-center mb-4">
          <input
            type="email"
            placeholder="Your email address..."
            className="w-full p-2.5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <button
            type="submit"
            className="ml-2 px-4 py-2 text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Subscribe
          </button>
        </div>
      </form>
      <p className="text-sm">
        By subscribing, you agree with ConvertKit's <a href="#" className="text-blue-500 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>.
      </p>
    </div>
  );
};

export default ContactForm;
