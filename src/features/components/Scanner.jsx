import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { BACKEND_URL } from "../../app/constant";

export default function HtmlScanner() {
  const [scanResult, setScanResult] = useState(null);
  const [participant, setParticipant] = useState(null);
  const [error, setError] = useState(null);
  const [scannerInitialized, setScannerInitialized] = useState(false);

  const verifyParticipant = async (code) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/qr/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data : code , admin : localStorage.getItem('userId')}),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data?.message || "Verification failed.");
        setParticipant(null);
      } else {
        setParticipant(data.user);
        setError(null);
      }
    } catch (err) {
      console.error("Verification Error:", err);
      setError("Server error. Please try again.");
      setParticipant(null);
    }
  };

  const handleRescan = () => {
    const html5QrcodeScanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: 250,
    });

    html5QrcodeScanner.render(onScanSuccess, onScanError);

    function onScanSuccess(decodedText, decodedResult) {
      console.log(`Scan result: ${decodedText}`, decodedResult);
      setScanResult(decodedText);
      verifyParticipant(decodedText);
      html5QrcodeScanner.clear();
    }

    function onScanError(errorMessage) {
      console.warn("QR Scan Error:", errorMessage);
    }

    setScannerInitialized(true);
  };

  useEffect(() => {
    if (!scannerInitialized) {
      handleRescan();
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black relative overflow-hidden text-cyan-100 px-4">
      {/* Scanner */}
      <div
        id="reader"
        className="w-full max-w-md rounded-lg border border-cyan-400 p-2 bg-[#0d1117] z-10"
      ></div>

      {/* Scan Again */}
      <button
        onClick={handleRescan}
        className="mt-6 px-6 py-3 bg-gradient-to-r from-cyan-400 to-pink-500 hover:from-pink-500 hover:to-cyan-400 text-black font-bold rounded-full transition-all duration-300 shadow-lg"
      >
        Scan QR
      </button>

      {/* Results */}
      {error && (
        <div className="mt-8 p-4 border border-pink-500 bg-[#1a0f1f] rounded-xl text-red-300 max-w-md text-center">
          <p className="font-semibold text-lg">❌ {error}</p>
        </div>
      )}

      {participant && (
        <div className="mt-8 p-4 border border-purple-400 bg-[#0b0f1a] rounded-xl max-w-md w-full text-cyan-200 space-y-2">
          <h2 className="text-2xl text-purple-300 font-bold text-center mb-2">✅ Participant Details</h2>
          <p><span className="font-semibold text-cyan-300">Name:</span> {participant.name}</p>
          <p><span className="font-semibold text-cyan-300">Email:</span> {participant.email}</p>
          <p><span className="font-semibold text-cyan-300">Phone:</span> {participant.phoneNumber}</p>
          <p><span className="font-semibold text-cyan-300">From Terna:</span> {participant.fromTerna ? "Yes" : "No"}</p>
          <p><span className="font-semibold text-cyan-300">ID/Aadhar:</span> {participant.idNumber}</p>
        </div>
      )}
    </div>
  );
}
