const Gallery = () => {
  // Image file names stored in an array
  const images = [
    "concert1.jpeg",
    "concert3.jpeg",
    "concert2.jpg",
    "gallery3.jpeg",
    "sports1.jpeg",
    "gallery1.jpeg",
    "gallery2.jpeg",
    "sports2.jpeg",
    "sports3.jpeg",
  ];

  return (
    <section className="py-24 bg-[#0d1117]">
      <h2 className="text-5xl md:text-6xl font-extrabold text-center text-cyan-300 tracking-tight">
        Our Vibrant Gallery
      </h2>

      {/* Horizontal Scrollable Gallery */}
      <div className="mt-8 flex overflow-x-auto snap-x snap-mandatory gap-6 px-8 pb-4 custom-scrollbar">
        {images.map((image, index) => (
          <div
            key={index}
            className="h-48 md:h-64 border-4 rounded-xl snap-center shrink-0 w-72 md:w-80 animate-border-pulse overflow-hidden"
          >
            <img
              src={`/${image}`} // Ensure images are stored in the public/images folder
              alt={`Gallery Image ${index + 1}`}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        ))}
      </div>

      {/* Styles */}
      <style jsx>{`
        .custom-scrollbar {
          -webkit-overflow-scrolling: touch;
        }
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #22d3ee; /* Cyan */
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background-color: #0b0f1a;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #22d3ee #0b0f1a;
        }

        @keyframes borderPulse {
          0%, 100% {
            border-color: #22d3ee; /* Cyan */
          }
          50% {
            border-color: #c084fc; /* Purple */
          }
        }
        .animate-border-pulse {
          animation: borderPulse 2s infinite ease-in-out;
          border-width: 4px;
          border-style: solid;
        }
      `}</style>
    </section>
  );
};

export default Gallery;
