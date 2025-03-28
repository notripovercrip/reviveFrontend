import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaEnvelope, FaDownload } from "react-icons/fa";
import axios from "axios";
import * as XLSX from "xlsx"; // Import xlsx library
import { BACKEND_URL } from "../../app/constant";

const ParticipantsTable = () => {
  const [participants, setParticipants] = useState([]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/register/${id}`);
      setParticipants(participants.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleEmail = async (id) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/qr/sendPersonal`, { id });
      console.log(res.data);
    } catch (error) {
      console.log(error?.message);
    }
  };

  const handleDownloadExcel = () => {
    if (participants.length === 0) {
      alert("No participants to download.");
      return;
    }

    const data = participants.map(({ name, email, phoneNumber, idCardUrl, fromTerna }) => ({
      Name: name,
      Email: email,
      Phone: phoneNumber,
      "ID / Aadhar": idCardUrl,
      "From Terna": fromTerna
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Participants");

    XLSX.writeFile(workbook, "Participants_List.xlsx");
  };

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/register`);
        setParticipants(res.data.participants);
        console.log("Participants:", res.data.participants);
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    };
    fetchParticipants();
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1117] text-cyan-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-cyan-300">Registered Participants</h1>
        <button
          onClick={handleDownloadExcel}
          className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg shadow-md transition-all"
        >
          <FaDownload />
          Download Excel
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-[#0b0f1a] border border-cyan-500 shadow-lg rounded-lg text-left">
          <thead className="bg-gradient-to-r from-cyan-600 to-purple-700 text-white">
            <tr>
              <th className="py-3 px-4 border-b border-cyan-500">Num</th>
              <th className="py-3 px-4 border-b border-cyan-500">Name</th>
              <th className="py-3 px-4 border-b border-cyan-500">Email</th>
              <th className="py-3 px-4 border-b border-cyan-500">Phone</th>
              <th className="py-3 px-4 border-b border-cyan-500">ID / Aadhar</th>
              <th className="py-3 px-4 border-b border-cyan-500">From Terna</th>
              <th className="py-3 px-4 border-b border-cyan-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {participants.length > 0 &&
              participants.map((p, ind) => (
                <tr
                  key={p._id}
                  className="hover:bg-[#111827] border-b border-cyan-800 transition-all"
                >
                  <td className="py-2 px-4">{ind + 1}</td>
                  <td className="py-2 px-4">{p.name}</td>
                  <td className="py-2 px-4">{p.email}</td>
                  <td className="py-2 px-4">{p.phoneNumber}</td>
                  <td className="py-2 px-4">{p.idCardUrl}</td>
                  <td className="py-2 px-4 capitalize">{p.fromTerna}</td>
                  <td className="py-2 px-4 flex gap-4">
                    <button
                      onClick={() => handleEmail(p.id)}
                      className="text-cyan-400 hover:text-pink-400 transition-colors"
                    >
                      <FaEnvelope size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-red-500 hover:text-red-300 transition-colors"
                    >
                      <FaTrashAlt size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            {participants.length === 0 && (
              <tr>
                <td colSpan="7" className="py-4 text-center text-cyan-500">
                  No participants found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ParticipantsTable;
