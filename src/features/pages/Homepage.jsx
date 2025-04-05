import { useState, useEffect } from "react";
import bgImg from "../../assets/bgimg.mp4";
import AboutUs from "../components/AboutUs";
import Gallery from "../components/GallerySection";
import Events from "../components/EventsSec";
import ContactUs from "../components/ContactUs";
import { Link } from "react-router-dom";

export default function HomePage() {

  return (
    <div
      className="relative min-h-screen bg-black text-white"
      style={{ fontFamily: "DM Sans, sans-serif" }}
    >
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-screen h-screen object-cover z-0"
      >
        <source src={bgImg} type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-1"></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center min-h-screen backdrop-blur-sm">
          <h1
            className="text-6xl md:text-8xl font-bold text-cyan-300 glow"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Revive 3.0
          </h1>
          <p
            className="mt-4 text-lg text-cyan-200"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            3 Years of Vibe, Voices and Victories
          </p>
          <button
            className="mt-6 px-6 py-3 bg-gradient-to-r from-cyan-400 to-pink-500 hover:from-pink-500 hover:to-cyan-400 text-black font-bold rounded-full transition-all duration-300 shadow-lg animate-gradient"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            <Link to="/">
            Registrations have been closed!
            </Link>
          </button>
        </section>

        {/* About Section */}
        <AboutUs />

        {/* Events Section */}
        <Events />
        {/* Gallery Section */}
        <Gallery />

        {/* Contact Section */}
        <ContactUs />

        {/* Footer */}
        <footer className="py-6 bg-[#0d1117] text-center text-cyan-300">
          &copy; 2025 Revive | Terna Public Charitable Trust
        </footer>
      </div>
    </div>
  );
}
