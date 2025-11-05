import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateOrder() {
  const [sender, setSender] = useState("");
  const [senderAddress, setSenderAddress] = useState("");
  const [receiver, setReceiver] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");
  const [deliveryCategory, setDeliveryCategory] = useState("");
  const [itemType, setItemType] = useState("");
  const [packageDetails, setPackageDetails] = useState("");
  const [riderNote, setRiderNote] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [trackingId, setTrackingId] = useState("");
  const [formVisible, setFormVisible] = useState(true);
  const navigate = useNavigate();

  const generateTrackingId = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    const randomNumbers = Math.floor(100000 + Math.random() * 900000);
    return `TRK-${randomLetter}${randomNumbers}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !sender ||
      !senderAddress ||
      !receiver ||
      !receiverAddress ||
      !receiverPhone ||
      !receiverEmail ||
      !deliveryCategory ||
      !itemType ||
      !packageDetails
    ) {
      alert("Please fill all fields.");
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      alert("Please login to create an order.");
      navigate("/login");
      return;
    }

    const id = generateTrackingId();
    const newOrder = {
      trackingId: id,
      sender,
      senderAddress,
      receiver,
      receiverAddress,
      receiverPhone,
      receiverEmail,
      deliveryCategory,
      itemType,
      packageDetails,
      riderNote,
      status: "Pending",
      date: new Date().toLocaleString(),
      createdBy: currentUser.email,
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    existingOrders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(existingOrders));

    setTrackingId(id);
    setSuccessMsg("✅ Order created successfully!");
    setFormVisible(false);
  };

  const handleViewTracking = () => {
    navigate(`/track?trackingId=${trackingId}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-red-600 mb-6 text-center">
          Create Delivery Order
        </h1>

        {formVisible ? (
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            {/* Left Column - Sender Info */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-700">Sender Information</h2>
              <input
                type="text"
                placeholder="Sender Name"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                className="w-full p-3 border rounded-md"
              />
              <input
                type="text"
                placeholder="Sender Address"
                value={senderAddress}
                onChange={(e) => setSenderAddress(e.target.value)}
                className="w-full p-3 border rounded-md"
              />

              <select
                value={deliveryCategory}
                onChange={(e) => setDeliveryCategory(e.target.value)}
                className="w-full p-3 border rounded-md text-gray-700"
              >
                <option value="">Select Delivery Category</option>
                <option value="Same-Day Delivery">Same-Day Delivery</option>
                <option value="Nationwide Delivery">Nationwide Delivery</option>
                <option value="Global Delivery">Global Delivery</option>
              </select>

              <select
                value={itemType}
                onChange={(e) => setItemType(e.target.value)}
                className="w-full p-3 border rounded-md text-gray-700"
              >
                <option value="">Select Item Type</option>
                <option value="Fragile">Fragile</option>
                <option value="Clothing">Clothing</option>
                <option value="Electronics">Electronics</option>
                <option value="Documents">Documents</option>
                <option value="Others">Others</option>
              </select>
            </div>

            {/* Right Column - Receiver Info */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-700">Receiver Information</h2>
              <input
                type="text"
                placeholder="Receiver Name"
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
                className="w-full p-3 border rounded-md"
              />
              <input
                type="text"
                placeholder="Receiver Address"
                value={receiverAddress}
                onChange={(e) => setReceiverAddress(e.target.value)}
                className="w-full p-3 border rounded-md"
              />
              <input
                type="tel"
                placeholder="Receiver Phone Number"
                value={receiverPhone}
                onChange={(e) => setReceiverPhone(e.target.value)}
                className="w-full p-3 border rounded-md"
              />
              <input
                type="email"
                placeholder="Receiver Email Address"
                value={receiverEmail}
                onChange={(e) => setReceiverEmail(e.target.value)}
                className="w-full p-3 border rounded-md"
              />
            </div>

            {/* Bottom Section - Package Details */}
            <div className="md:col-span-2 space-y-3">
              <textarea
                placeholder="Package Details"
                value={packageDetails}
                onChange={(e) => setPackageDetails(e.target.value)}
                className="w-full p-3 border rounded-md"
              ></textarea>

              <textarea
                placeholder="Special Note for Rider (optional)"
                value={riderNote}
                onChange={(e) => setRiderNote(e.target.value)}
                className="w-full p-3 border rounded-md"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition"
              >
                Create Order
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center">
            <p className="text-green-600 font-medium">{successMsg}</p>
            <p className="mt-2 text-gray-700 text-lg">
              <strong>Tracking ID:</strong> {trackingId}
            </p>

            <button
              onClick={handleViewTracking}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              View Tracking
            </button>
          </div>
        )}
      </div>
    </div>
  );
}