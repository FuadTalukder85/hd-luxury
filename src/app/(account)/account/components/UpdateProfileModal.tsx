"use client";
import React, { useState } from "react";
import { UpdateProfileModalProps } from "../../../../shared/types/types";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";

const UpdateProfileModal: React.FC<UpdateProfileModalProps> = ({ onClose }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated successfully");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
        >
          <IoMdClose />
        </button>
        <h3 className="text-xl font-bold text-seaBlue mb-4">Update Profile</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-seaBlue mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded text-sm text-black"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-seaBlue mb-1">Phone Number</label>
            <input
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="w-full p-2 border rounded text-sm text-black"
              placeholder="Phone number"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-seaBlue mb-1">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 border rounded text-sm text-black"
              placeholder="Address"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-yellow text-white font-semibold text-sm rounded hover:bg-seaBlue transition-colors"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
