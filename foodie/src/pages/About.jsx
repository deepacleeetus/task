import React from "react";

function About() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-6 py-10">
      <div className="max-w-3xl bg-white shadow-md rounded-xl p-8">
        <h1 className="text-3xl font-bold text-green-700 mb-4 text-center">
          About Us
        </h1>
        <p className="text-gray-700 mb-4 text-justify leading-relaxed">
          Welcome to <span className="font-semibold text-green-600">Foodies Hub</span>,
          your go-to destination for delicious meals, made fresh and delivered fast!
          Our mission is simple — to bring tasty, hygienic, and affordable food to your
          doorstep with just a few clicks.
        </p>
        <p className="text-gray-700 mb-4 text-justify leading-relaxed">
          We started our journey with the vision of connecting food lovers with
          top-quality local restaurants and homemade kitchens.
        </p>
        <p className="text-gray-700 text-justify leading-relaxed">
          Our dedicated team ensures timely delivery and customer satisfaction
          because we believe great food deserves great service. Thank you for
          choosing <span className="font-semibold text-green-600">Foodies Hub</span> —
          where every meal is made with love ❤️.
        </p>

        <div className="mt-6 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            📍 Contact Us
          </h2>
          <p className="text-gray-600">Email: support@foodieshub.com</p>
          <p className="text-gray-600">Phone: +91 97065 43210</p>
          <p className="text-gray-600">Location: Kochi, Kerala, India</p>
        </div>
      </div>
    </div>
  );
}

export default About;
