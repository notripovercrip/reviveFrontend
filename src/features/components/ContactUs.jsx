import { FaInstagram } from "react-icons/fa";

const ContactUs = () => {
    return (
      <section className="py-24 bg-[#0d1117] text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-black to-purple-900/20 pointer-events-none" />
        
        <h2 className="text-5xl md:text-6xl font-extrabold text-cyan-300 tracking-tight relative z-10">
          Get in Touch
        </h2>
        <p className="mt-6 text-lg text-purple-300 max-w-2xl mx-auto leading-relaxed relative z-10">
          We’d love to hear from you! Whether it’s for event collaborations, sponsorships, 
          or just to say hi, reach out to the Revive team anytime.
        </p>
  
        <div className="mt-8 relative z-10">
          <p className="text-xl text-purple-300">Email us at:</p>
          <a
            href="mailto:revive@terna.ac.in"
            className="mt-2 inline-block text-2xl font-semibold text-purple-300 hover:text-purple-200 transition-colors duration-300"
          >
            revive@terna.ac.in
          </a>
        </div>
        <div className="mt-8 relative z-10">
          <p className="text-xl text-purple-300">Phone No :</p>
          <a
          href="tel:+91 93242 80418"
          className="mt-2 mr-2 inline-block text-2xl font-semibold text-purple-300 hover:text-purple-200 transition-colors duration-300"
          >
            +91 93242 80418
            </a>
          <a
          href="tel:+91 76669 73551"
          className="mt-2 inline-block text-2xl font-semibold text-purple-300 hover:text-purple-200 transition-colors duration-300"
          >
            +91 76669 73551
            </a>
        </div>
  
        <div className="mt-10 flex justify-center gap-6 relative z-10">
          <a
            href="https://www.instagram.com/reviveterna/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-300 hover:text-purple-200 transition-colors duration-300"
          >
            <FaInstagram className="w-8 h-8" />
          </a>
        </div>
  
        <div className="mt-12 relative z-10">
          <p className="text-purple-400 text-md animate-pulse">
            Let's create something amazing together!
          </p>
        </div>
      </section>
    );
  };
  
  export default ContactUs;