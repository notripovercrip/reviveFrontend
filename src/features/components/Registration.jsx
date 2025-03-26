import { useState } from "react";
import bgimg from "../../assets/bgimg.mp4"; // Replace with correct path
import { BACKEND_URL } from "../../app/constant";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    fromTerna: "Terna Student",
    idNumber: "",
    idFile: null,
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

    if (!formData.idFile) {
      newErrors.idFile = "ID / Aadhar Card is required.";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    if (e.target.name === "idFile") {
      const file = e.target.files[0];
      if (file) {
        if (file.size > 1024 * 1024) {
          setErrors((prev) => ({
            ...prev,
            idFile: "File size must be less than 1MB",
          }));
          return;
        }
        setErrors((prev) => ({ ...prev, idFile: "" })); // Clear error when valid
        setFormData((prev) => ({ ...prev, idFile: file }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      setErrors((prev) => ({ ...prev, [e.target.name]: "" })); // Clear error on input change
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (isSubmitting) {
    setModal({
      show: true,
      message: "Please wait 10 seconds before submitting again.",
      success: false,
    });
    return;
  }

  const validationErrors = validate()

  setIsSubmitting(true);

  try {
    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("phone", formData.phone);
    formDataObj.append("email", formData.email);
    formDataObj.append("fromTerna", formData.fromTerna);
    formDataObj.append("idNumber", formData.idNumber);
    formDataObj.append("idFile", formData.idFile);

    const response = await fetch(`${BACKEND_URL}/api/register`, {
      method: "POST",
      body: formDataObj,
    });

    const data = await response.json();

    if (response.ok) {
      setModal({
        show: true,
        message: "Registration successful! We will be sending in Your QR's shortly.",
        success: true,
      });
      setFormData({
        name: "",
        phone: "",
        email: "",
        fromTerna: "Terna Student",
        idNumber: "",
        idFile: null,
      });
    } else {
      setModal({
        show: true,
        message: `Registration failed: ${data.message || "Unknown server error."}\n\nPlease check:\n- Name: Only letters & spaces\n- Phone: 10-digit number\n- Email: Valid email format\n- ID Number: Required\n- ID File: Max 1MB (JPG, PNG, PDF)`,
        success: false,
      });
    }
  } catch (err) {
    setModal({
      show: true,
      message: `Something went wrong. Server Error: ${err.message || "Unknown error"}`,
      success: false,
    });
  }

  setTimeout(() => {
    setIsSubmitting(false);
  }, 10000);
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
        <div className="bg-[#0d1117] bg-opacity-90 p-8 rounded-[1rem]">
          <h2 className="text-3xl font-extrabold text-cyan-300 text-center mb-6 tracking-wide">
            Revive Registration
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 text-cyan-100">
            <div>
              <label className="block text-sm font-semibold">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 w-full p-2 bg-[#0b0f1a] border border-cyan-500 rounded"
              />
              {errors.name && (
                <p className="text-pink-400 text-sm">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="mt-1 w-full p-2 bg-[#0b0f1a] border border-cyan-500 rounded"
              />
              {errors.phone && (
                <p className="text-pink-400 text-sm">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold">Email </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 w-full p-2 bg-[#0b0f1a] border border-cyan-500 rounded"
              />
              {errors.email && (
                <p className="text-pink-400 text-sm">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold">You are?</label>
              <select
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                className="mt-1 w-full p-2 bg-[#0b0f1a] border border-cyan-500 rounded"
              >
                <option>Terna Student</option>
                <option>Terna Passout</option>
                <option>Faculty</option>
                <option>Outsider</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold">
                Upload ID / Aadhar (Max 1MB)
              </label>
              <input
                type="file"
                name="idFile"
                onChange={handleChange}
                accept=".jpg,.jpeg,.png,.pdf"
                className="mt-1 w-full p-2 bg-[#0b0f1a] border border-cyan-500 rounded"
              />
              {formData.idFile && (
                <p className="text-sm text-cyan-300">{formData.idFile.name}</p>
              )}
              {errors.idFile && (
                <p className="text-pink-400 text-sm">{errors.idFile}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-black font-bold py-2 rounded"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
