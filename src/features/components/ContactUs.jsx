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
  
        <div className="mt-10 flex justify-center gap-6 relative z-10">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-300 hover:text-purple-200 transition-colors duration-300"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.326 3.608 1.301.975.975 1.24 2.242 1.301 3.608.058 1.266.07 1.646.07 4.85 0 3.204-.012 3.584-.07 4.85-.326 1.366-.975 1.24-2.242 1.301-3.608.058-1.266.07-1.646.07-4.85 0-3.204-.012-3.584-.07-4.85-.062-1.366-.326-2.633-1.301-3.608-.975-.975-2.242-1.24-3.608-1.301-1.266-.058-1.646-.07-4.85-.07-3.204 0-3.584.012-4.85.07M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
            </svg>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-300 hover:text-purple-200 transition-colors duration-300"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
            </svg>
          </a>
        </div>
  
        <div className="mt-12 relative z-10">
          <p className="text-purple-400 text-sm animate-pulse">
            Let “ s create something amazing together!
          </p>
        </div>
      </section>
    );
  };
  
  export default ContactUs;