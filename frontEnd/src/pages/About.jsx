import React from "react";
import company from '../assets/company.png'
import image from '../assets/image.png'

export default function About() {
  return (
    <div className="bg-gray-100 min-h-screen py-12 px-6 md:px-20">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-10">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          About <span className="text-blue-600">Blue Diamond</span>
        </h1>
        <p className="text-gray-600 text-lg text-center mb-8">
          At Blue Diamond, we believe in providing the finest quality diamonds
          with unmatched brilliance and elegance. Our collection showcases
          exquisite craftsmanship, ensuring every piece tells a unique story.
        </p>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <img
              src={image}
              alt="Our Store"
              className="w-full rounded-xl shadow-md"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Story</h2>
            <p className="text-gray-600 text-lg">
              Established in 2005, Blue Diamond has been a trusted name in the
              jewelry industry. We source ethically mined diamonds, ensuring
              sustainability and responsible sourcing practices. Our passion for
              perfection drives us to offer timeless and contemporary designs.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center mt-12">
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Mission</h2>
            <p className="text-gray-600 text-lg">
              Our mission is to craft elegant and timeless jewelry that enhances
              every special moment in your life. We strive for excellence,
              ensuring each diamond reflects unmatched quality and brilliance.
            </p>
          </div>
          <div className="flex justify-center items-center">
            <img
              src={company}
              alt="Our Mission"
              className="w-full rounded-xl shadow-md w-[430px] h-[370px] "
            />
          </div>
        </div>

        <div className="text-center mt-12">
          <h2 className="text-2xl font-semibold text-gray-700">Why Choose Us?</h2>
          <p className="text-gray-600 text-lg mt-4">
            ✔ Ethically Sourced Diamonds <br />✔ Certified & High-Quality
            Craftsmanship <br />✔ Customization Available <br />✔ 24/7 Customer
            Support
          </p>
        </div>
      </div>
    </div>
  );
}
