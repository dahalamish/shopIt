import React from "react";
import { Link } from "react-router-dom";
import { SectionTitle } from "../components";

const About = () => {
  return (
    <div>
      <SectionTitle title="About Us" path="Home | About" />
      <div className="about-content text-center max-w-2xl mx-auto mt-5">
      <h2 className="text-6xl text-center mb-10 max-sm:text-3xl text-accent-content">We love our customers!</h2>
      <p className="text-lg text-center max-sm:text-sm max-sm:px-2 text-accent-content">
      Welcome to our e-commerce platform, your ultimate destination for a seamless shopping experience. Explore a vast collection of products across various categories, tailored to meet all your needs. Enjoy exclusive deals, secure transactions, and fast delivery right to your doorstep. With user-friendly navigation and 24/7 customer support, we ensure your online shopping is convenient and enjoyable. Start browsing now and discover the best in quality and service!
      </p>
      <Link to="/contact" className="btn btn-wide bg-blue-600 hover:bg-blue-500 text-white mt-5">Contact Us</Link>
      </div>
    </div>
  );
};

export default About;
