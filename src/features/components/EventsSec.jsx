import { useState } from "react";

const Events = () => {
  const [activeTab, setActiveTab] = useState("concerts");

  const events = {
    concerts: [
      { id: 1, title: "Rock Night", image: "/concert2.jpg" },
      { id: 2, title: "Jazz Evening", image: "/concert1.jpeg" },
      { id: 3, title: "Pop Fest", image: "/concert3.jpeg" },
    ],
    standup: [
      { id: 1, title: "Comedy Blast", image: "/standup4.jpeg" },
      { id: 2, title: "Laugh Riot", image: "/standup2.jpeg" },
      { id: 3, title: "Joke Jam", image: "/standup3.jpeg" },
    ],
    sports: [
      { id: 1, title: "Football Frenzy", image: "/sports1.jpeg" },
      { id: 2, title: "Basketball Bash", image: "/sports2.jpeg" },
      { id: 3, title: "Cricket Clash", image: "/sports3.jpeg" },
    ],
  };

  return (
    <section className="py-24 bg-[#0d1117]">
      <h2 className="text-5xl md:text-6xl font-extrabold text-center text-cyan-300 tracking-tight">
        Our Events
      </h2>
      <div className="flex justify-center mt-8 space-x-1.5 px-4">
        {["concerts", "standup", "sports"].map((tab) => (
          <button
            key={tab}
            className={`px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wide transition-all duration-300 shadow-lg ${
              activeTab === tab
                ? "bg-yellow-400 text-black"
                : "bg-gradient-to-r from-cyan-400 to-purple-400 text-black hover:from-purple-400 hover:to-cyan-400 animate-gradient"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-12 px-6">
        <div className="block md:hidden flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 custom-scrollbar">
          {events[activeTab].map((event) => (
            <div
              key={event.id}
              className="w-80 h-52 bg-[#0b0f1a] border-2 border-cyan-400 rounded-xl flex items-center justify-center snap-center shrink-0 animate-border-pulse"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          ))}
        </div>

        <div className="hidden md:flex justify-center gap-8 max-w-5xl mx-auto">
          {events[activeTab].map((event) => (
            <div
              key={event.id}
              className="w-96 h-64 bg-[#0b0f1a] border-2 border-cyan-400 rounded-xl flex items-center justify-center transform hover:scale-105 transition-transform duration-300 animate-border-pulse"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar {
          -webkit-overflow-scrolling: touch;
        }
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #22d3ee;
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
          0%,
          100% {
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

export default Events;
