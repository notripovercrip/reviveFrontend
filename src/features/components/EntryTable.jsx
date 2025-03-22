import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../app/constant";

const EntriesTable = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/entries`);
        setEntries(res.data.Entries || []);
      } catch (error) {
        console.error("Failed to fetch entries:", error);
      }
    };
    fetchEntries();
  }, []);

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-cyan-100 p-8">
      <h1 className="text-3xl font-bold text-cyan-300 mb-6 text-center">
        Entry Logs
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-[#0b0f1a] border border-cyan-500 shadow-lg rounded-lg text-left">
          <thead className="bg-gradient-to-r from-cyan-600 to-purple-700 text-white">
            <tr>
              <th className="py-3 px-4 border-b border-cyan-500">
                Participant
              </th>
              <th className="py-3 px-4 border-b border-cyan-500">Admin</th>
              <th className="py-3 px-4 border-b border-cyan-500">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {entries.length > 0 ? (
              entries.map((entry) => (
                <tr
                  key={entry._id}
                  className="hover:bg-[#111827] border-b border-cyan-800 transition-all"
                >
                  <td className="py-2 px-4">
                    {entry.participant?.name || "Unknown"}
                  </td>
                  <td className="py-2 px-4">
                    {entry.admin?.name || "Unknown"}
                  </td>
                  <td className="py-2 px-4">{formatDate(entry.createdAt)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-4 text-center text-cyan-500">
                  No entry records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EntriesTable;
