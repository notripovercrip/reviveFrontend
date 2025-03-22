import { useState } from "react";
import bgimg from "../../assets/bgimg.mp4"; // Replace with correct path
import { BACKEND_URL } from "../../app/constant";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    fromTerna: "yes",
    idNumber: "",
  });
  const [modal, setModal] = useState({
    show: false,
    message: "",
    success: true,
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = "Name should only contain letters and spaces.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!formData.idNumber.trim()) {
      newErrors.idNumber = "ID / Aadhar Number is required.";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs here if needed (in addition to field validation)
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form Submitted:", formData);
      setFormData({
        name: "",
        phone: "",
        email: "",
        fromTerna: "yes",
        idNumber: "",
      });
    } else {
      setErrors(validationErrors);
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setModal({
          show: true,
          message: "Registration successful! Check your email for the QR code.",
          success: true,
        });
      } else {
        setModal({
          show: true,
          message: data.message || "Registration failed.",
          success: false,
        });
      }
    } catch (err) {
      console.error("Error submitting form", err);
      setModal({
        show: true,
        message: "Something went wrong. Please try again later.",
        success: false,
      });
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center text-white px-3">
      {modal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 px-4">
          <div
            className={`max-w-md w-full p-6 rounded-xl border-2 shadow-xl bg-[#0d1117] ${
              modal.success ? "border-cyan-400" : "border-pink-500"
            } text-white animate-fadeIn`}
          >
            <h3
              className={`text-xl font-bold mb-2 ${
                modal.success ? "text-cyan-400" : "text-pink-400"
              }`}
            >
              {modal.success ? "Success 🎉" : "Error ⚠️"}
            </h3>
            <p className="text-sm text-cyan-100">{modal.message}</p>
            <button
              onClick={() => setModal({ ...modal, show: false })}
              className="mt-4 w-full py-2 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-black font-semibold rounded hover:opacity-90 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        className="absolute w-full h-full object-cover z-[5]"
      >
        <source src={bgimg} type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60 z-[6]" />

      {/* Form Container */}
      <div className="relative z-20 w-full max-w-lg p-[3px] rounded-2xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-gradient shadow-2xl">
        {/* Inner Form Container */}
        <div className="bg-[#0d1117] bg-opacity-90 p-8 rounded-[1rem]">
          <h2 className="text-3xl font-extrabold text-cyan-300 text-center mb-6 tracking-wide">
            Revive Registration
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 text-cyan-100">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 w-full p-2 bg-[#0b0f1a] text-cyan-200 border border-cyan-500 rounded focus:ring-purple-500 focus:border-purple-500"
                required
              />
              {errors.name && (
                <p className="text-pink-400 text-sm">{errors.name}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 w-full p-2 bg-[#0b0f1a] text-cyan-200 border border-cyan-500 rounded focus:ring-purple-500 focus:border-purple-500"
                required
              />
              {errors.phone && (
                <p className="text-pink-400 text-sm">{errors.phone}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full p-2 bg-[#0b0f1a] text-cyan-200 border border-cyan-500 rounded focus:ring-purple-500 focus:border-purple-500"
                required
              />
              {errors.email && (
                <p className="text-pink-400 text-sm">{errors.email}</p>
              )}
            </div>

            {/* From Terna */}
            <div>
              <label className="block text-sm font-semibold">
                Are you from Terna?
              </label>
              <select
                name="fromTerna"
                value={formData.fromTerna}
                onChange={handleChange}
                className="mt-1 w-full p-2 bg-[#0b0f1a] text-cyan-200 border border-cyan-500 rounded"
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            {/* ID / Aadhar */}
            <div>
              <label className="block text-sm font-semibold">
                ID / Aadhar Number
              </label>
              <input
                type="text"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                className="mt-1 w-full p-2 bg-[#0b0f1a] text-cyan-200 border border-cyan-500 rounded focus:ring-purple-500 focus:border-purple-500"
                required
              />
              {errors.idNumber && (
                <p className="text-pink-400 text-sm">{errors.idNumber}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-black font-bold py-2 px-4 rounded mt-4 transition-all duration-300 shadow-lg animate-gradient"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
