const Gallery = () => {
    return (
      <section className="py-24 bg-[#0d1117]">
        <h2 className="text-5xl md:text-6xl font-extrabold text-center text-cyan-300 tracking-tight">
          Our Vibrant Gallery
        </h2>
        <div className="mt-8 flex overflow-x-auto snap-x snap-mandatory gap-6 px-8 pb-4 custom-scrollbar">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-48 md:h-64 bg-[#0b0f1a] border-2 border-cyan-400 rounded-xl flex items-center justify-center snap-center shrink-0 w-72 md:w-80 animate-border-pulse"
            >
              <p className="text-purple-300 text-lg font-semibold">[Image {i}]</p>
            </div>
          ))}
        </div>
  
        <style jsx>{`
          .custom-scrollbar {
            -webkit-overflow-scrolling: touch;
          }
          .custom-scrollbar::-webkit-scrollbar {
            height: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #22d3ee; /* Cyan-400 */
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
              border-color: #22d3ee; /* Cyan-400 */
            }
            50% {
              border-color: #c084fc; /* Purple-400 */
            }
          }
          .animate-border-pulse {
            animation: borderPulse 2s infinite ease-in-out;
          }
        `}</style>
      </section>
    );
  };
  
  export default Gallery;