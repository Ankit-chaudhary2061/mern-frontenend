'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Building } from 'lucide-react';
import axios from 'axios';

const ContactSection = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    description: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      await axios.post("http://localhost:8000/api/contact", {
  name: form.firstName + " " + form.lastName,
  email: form.email,
  message: form.description,
});

      setSuccessMessage('Message sent successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setSuccessMessage('Something went wrong. Please try again.');
      setTimeout(() => setSuccessMessage(''), 3000);
    } finally {
      setIsSending(false);
    }
  };

  return (<>
  
    <section className="bg-gray-50 py-20">
  <div className="container mx-auto px-[200px]">

    <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">

      {/* FORM */}
      <div className="col-span-1 md:col-span-6 bg-white shadow-lg rounded-2xl p-8 border border-gray-100">

        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Contact Us
        </h2>

        <p className="text-gray-500 mb-6 leading-relaxed">
          Whether you have questions about our teas, need assistance with an
          order, or simply want to share your experience — we’re here to help.
        </p>

        <form className="space-y-5" onSubmit={handleSubmit} autoComplete="off">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="input-clean"
              value={form.firstName}
              onChange={handleChange}
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="input-clean"
              value={form.lastName}
              onChange={handleChange}
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="input-clean"
            value={form.email}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Write your message..."
            rows={4}
            className="input-clean resize-none"
            value={form.description}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={isSending}
            className={`w-full py-3 rounded-lg font-medium text-white transition-all duration-300 ${
              isSending
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#326E3B] hover:bg-[#285732] hover:shadow-md"
            }`}
          >
            {isSending ? "Sending..." : "Send Message"}
          </button>

          {successMessage && (
            <p className="text-green-600 text-sm text-center">
              {successMessage}
            </p>
          )}
        </form>
      </div>

      {/* INFO */}
      <div className="col-span-1 md:col-start-8 md:col-span-5 flex flex-col gap-4">

        {/* ADDRESS */}
        <div className="flex items-start gap-3 bg-[#326E3B] text-white rounded-xl p-4 shadow-sm">
          <MapPin className="w-5 h-5 mt-1 shrink-0" />
          <p className="text-sm leading-relaxed">
            Rampokh, Suryadaya Municipality-9 <br />
            Fikal, Ilam
          </p>
        </div>

        {/* PHONE */}
        <div className="info-clean">
          <Phone className="icon text-[#326E3B]" />
          <p className="text-sm text-gray-500">
            1800-123-456 <br />
            Mon–Sat: 8:00 am – 6:00 pm
          </p>
        </div>

        {/* EMAIL */}
        <div className="info-clean">
          <Mail className="icon text-[#326E3B]" />
          <div>
            <p className="text-sm text-gray-500">
              We reply within 24 hours
            </p>
            <p className="text-[#326E3B] font-medium">
              ankitchau2061@gmail.com
            </p>
          </div>
        </div>

        {/* COMPANY */}
        <div className="info-clean">
          <Building className="icon text-[#326E3B]" />
          <p className="text-sm text-gray-500">
            Rampokha Green Tea & Agro Processing Industries Pvt. Ltd
          </p>
        </div>

      </div>

    </div>
  </div>

  {/* STYLES */}
  <style jsx>{`
    .input-clean {
      width: 100%;
      padding: 12px 14px;
      border-radius: 10px;
      border: 1px solid #e5e7eb;
      outline: none;
      transition: all 0.2s ease;
      background: #fafafa;
      color: #111827;
    }

    .input-clean::placeholder {
      color: #9ca3af;
    }

    .input-clean:focus {
      border-color: #326e3b;
      background: white;
      box-shadow: 0 0 0 2px rgba(50, 110, 59, 0.15);
    }

    .info-clean {
      display: flex;
      gap: 12px;
      align-items: flex-start;
      padding: 16px;
      border-radius: 12px;
      background: white;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.04);
    }

    .icon {
      width: 20px;
      height: 20px;
      margin-top: 3px;
    }
  `}</style>
</section>
    </>
  );
};

export default ContactSection;