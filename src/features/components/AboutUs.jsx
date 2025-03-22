  import { useEffect, useState } from 'react';

  const AboutUs = () => {
    const [eventCount, setEventCount] = useState(0);
    const [attendeeCount, setAttendeeCount] = useState(0);

    useEffect(() => {
      const eventTarget = 35; // Increased from 30+
      const attendeeTarget = 600; // Increased from 5000+
      const duration = 2000; // Animation duration in milliseconds

      const eventIncrement = eventTarget / (duration / 50);
      const attendeeIncrement = attendeeTarget / (duration / 50);

      const eventTimer = setInterval(() => {
        setEventCount((prev) => {
          if (prev >= eventTarget) {
            clearInterval(eventTimer);
            return eventTarget;
          }
          return prev + eventIncrement;
        });
      }, 50);

      const attendeeTimer = setInterval(() => {
        setAttendeeCount((prev) => {
          if (prev >= attendeeTarget) {
            clearInterval(attendeeTimer);
            return attendeeTarget;
          }
          return prev + attendeeIncrement;
        });
      }, 50);

      return () => {
        clearInterval(eventTimer);
        clearInterval(attendeeTimer);
      };
    }, []);

    return (
      <section className="py-24 bg-[#0d1117] text-center">
        <h2 className="text-5xl md:text-6xl font-extrabold text-cyan-300 tracking-tight">
          Discover Our Story
        </h2>
        <p className="mt-6 text-xl text-cyan-200 px-8 max-w-3xl mx-auto leading-relaxed">
          Revive, a dynamic student-led initiative under Terna Public Charitable Trust, 
          ignites campuses with unforgettable experiences—think electrifying concerts, 
          laugh-out-loud comedy nights, and heart-racing sports showdowns. 
          We’re here to spark joy and create memories that last a lifetime.
        </p>
        <div className="flex justify-center gap-6 md:gap-12 mt-12 px-2">
          <div className="p-6 bg-[#0b0f1a] border-2 border-purple-400 rounded-xl text-center transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-3xl font-bold text-purple-300">
              {Math.floor(eventCount)}+
            </h3>
            <p className="mt-2 text-lg text-purple-300">Epic Events Hosted</p>
          </div>
          <div className="p-6 bg-[#0b0f1a] border-2 border-purple-400 rounded-xl text-center transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-3xl font-bold text-purple-300">
              {Math.floor(attendeeCount)}+
            </h3>
            <p className="mt-2 text-lg text-purple-300">Thrilled Attendees</p>
          </div>
        </div>
      </section>
    );
  };

  export default AboutUs;