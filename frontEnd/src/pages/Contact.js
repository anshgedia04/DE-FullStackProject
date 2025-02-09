import React, { useState } from 'react';
import { AiOutlineMail, AiOutlineUser, AiOutlinePhone, AiOutlineMessage } from 'react-icons/ai';
import { MdSend } from 'react-icons/md';
import { ContactService } from '../services/ContactService/ContactService';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    contactNo: ''
  });

  const changeHandler = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const contact_company = async () => {
    // Add service logic here
    console.log(formData);
    await ContactService(formData);
  };

  return (
    <div className="flex flex-col items-center bg-gray-50 py-10 px-4">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Get in Touch</h2>
      <p className="text-gray-600 text-center mb-8">We'd love to hear from you! Whether you have questions about our diamonds or need assistance, feel free to reach out.</p>

      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md">
        <div className="mb-4">
          <label className="flex items-center text-gray-700 text-sm mb-2">
            <AiOutlineUser className="mr-2" /> Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={changeHandler}
            placeholder="Your Name"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="flex items-center text-gray-700 text-sm mb-2">
            <AiOutlineMail className="mr-2" /> Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            placeholder="Your Email"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="flex items-center text-gray-700 text-sm mb-2">
            <AiOutlineMessage className="mr-2" /> Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={changeHandler}
            placeholder="How can we assist you?"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
            rows="4"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="flex items-center text-gray-700 text-sm mb-2">
            <AiOutlinePhone className="mr-2" /> Contact Number
          </label>
          <input
            type="text"
            name="contactNo"
            value={formData.contactNo}
            onChange={changeHandler}
            placeholder="Your Contact Number"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        <button
          onClick={contact_company}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md flex items-center justify-center hover:bg-blue-700 transition duration-200"
        >
          <MdSend className="mr-2" /> Send Message
        </button>
      </div>
    </div>
  );
}
