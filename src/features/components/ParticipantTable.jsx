import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaEnvelope } from "react-icons/fa";
import axios from "axios";
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

  const handleEmail = (id) => {
    try {
        const res = axios.post(`${BACKEND_URL}/api/qr/sendPersonal`, { id });
        console.log(res.data);
    } catch (error) {
        console.log(error?.message);
    }
  };

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/register`);
        setParticipants(res.data.participants);
        console.log("Participants:", participants);
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    };
    fetchParticipants();
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1117] text-cyan-100 p-8">
      <h1 className="text-3xl font-bold text-cyan-300 mb-6 text-center">
        Registered Participants
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-[#0b0f1a] border border-cyan-500 shadow-lg rounded-lg text-left">
          <thead className="bg-gradient-to-r from-cyan-600 to-purple-700 text-white">
            <tr>
              <th className="py-3 px-4 border-b border-cyan-500">Name</th>
              <th className="py-3 px-4 border-b border-cyan-500">Email</th>
              <th className="py-3 px-4 border-b border-cyan-500">Phone</th>
              <th className="py-3 px-4 border-b border-cyan-500">
                ID / Aadhar
              </th>
              <th className="py-3 px-4 border-b border-cyan-500">From Terna</th>
              <th className="py-3 px-4 border-b border-cyan-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {participants.length>0 && participants.map((p) => (
                <tr
                  key={p._id}
                  className="hover:bg-[#111827] border-b border-cyan-800 transition-all"
                >
                  <td className="py-2 px-4">{p.name}</td>
                  <td className="py-2 px-4">{p.email}</td>
                  <td className="py-2 px-4">{p.phoneNumber}</td>
                  <td className="py-2 px-4">{p.idNumber}</td>
                  <td className="py-2 px-4 capitalize">{p.fromTerna ? 'Yes' : 'No'}</td>
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
                <td colSpan="6" className="py-4 text-center text-cyan-500">
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
