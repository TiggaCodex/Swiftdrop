import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const TrackDelivery = () => {
  const [trackingId, setTrackingId] = useState("");
  const [order, setOrder] = useState(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Awaiting Input");

  const location = useLocation();

  // Load tracking ID from query if available
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const idFromQuery = params.get("trackingId");
    if (idFromQuery) {
      setTrackingId(idFromQuery);
      handleTrack(idFromQuery);
    }
  }, [location]);

  const handleTrack = (idParam) => {
    const id = idParam || trackingId;
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const found = orders.find((o) => o.trackingId === id);

    if (found) {
      setOrder(found);
      setStatus("Order Found ✅");
      setProgress(25);
    } else {
      setOrder(null);
      setStatus("No delivery found for this Tracking ID ❌");
      setProgress(0);
    }
  };

  // Simulate live delivery progress
  useEffect(() => {
    if (progress > 0 && progress < 100) {
      const timer = setTimeout(() => {
        setProgress((prev) => {
          const newProgress = prev + 25;
          if (newProgress === 50) setStatus("Out for Delivery 🚚");
          if (newProgress === 75) setStatus("Almost There 📍");
          if (newProgress >= 100) setStatus("Delivered 🎉");
          return newProgress > 100 ? 100 : newProgress;
        });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-red-600">
          Track Your Delivery
        </h2>
        <input
          type="text"
          placeholder="Enter Tracking ID"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          className="border px-4 py-2 rounded w-full mb-4"
        />
        <button
          onClick={() => handleTrack()}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
        >
          Track
        </button>

        <div className="mt-6">
          <p className="font-semibold text-gray-700">{status}</p>
          {order && (
            <>
              <p className="text-sm text-gray-600 mt-2">
                <strong>Sender:</strong> {order.sender}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Receiver:</strong> {order.receiver}
              </p>
              <p className="text-sm text-gray-600">
                <strong>From:</strong> {order.senderAddress}
              </p>
              <p className="text-sm text-gray-600">
                <strong>To:</strong> {order.receiverAddress}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Note:</strong> {order.instructions}
              </p>
            </>
          )}

          {progress > 0 && (
            <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
              <div
                className="bg-red-600 h-3 rounded-full transition-all duration-700"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackDelivery;