import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { BACKEND_URL } from "../../app/constant";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // route to check if the userId is valid or not
    const userId = localStorage.getItem("userId");
    const fetchuser = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/auth/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (!response.ok) {
          localStorage.removeItem("userId");
          window.location.href = "/";
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    fetchuser();
  }, []);

  return (
    <nav className="bg-[#0d1117] text-cyan-100 p-4 border-b border-cyan-600 shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Title */}
        <Link to="/" className="text-2xl font-bold text-cyan-300 tracking-wide">
          Revive Admin
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex gap-6 text-cyan-100">
          <NavLink to="/records" label="Records" />
          <NavLink to="/entries" label="Entries" />
          <NavLink to="/scanner" label="Scanner" />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-cyan-200"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 space-y-2 bg-[#0b0f1a] p-4 rounded-lg shadow-md">
          <NavLink
            to="/records"
            label="Records"
            onClick={() => setMenuOpen(false)}
          />
          <NavLink
            to="/entries"
            label="Entries"
            onClick={() => setMenuOpen(false)}
          />
          <NavLink
            to="/scanner"
            label="Scanner"
            onClick={() => setMenuOpen(false)}
          />
        </div>
      )}
    </nav>
  );
}

// Reusable NavLink Component
function NavLink({ to, label, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block md:inline-block px-4 py-2 rounded-md hover:bg-cyan-600 hover:text-black transition duration-200 font-medium"
    >
      {label}
    </Link>
  );
}
