"use client";
import React, { useState } from "react";
import { useCreateContactMutation } from "../../../../shared/redux/api/ContactApi";
import toast from "react-hot-toast";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [createContact] = useCreateContactMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Please fill in all required fields");
      return;
    }
    try {
      await createContact({
        name,
        email,
        subject,
        message,
        date: new Date().toISOString().split("T")[0],
      }).unwrap();
      toast.success("Message sent successfully!");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error("Error sending contact message:", error);
      toast.error("Failed to send message");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg border shadow-sm">
      <h4 className="text-xl font-bold text-seaBlue mb-4">Send Us A Message</h4>
      <div>
        <label className="block text-xs font-semibold text-seaBlue mb-1">Your Name *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border rounded-md text-sm outline-none text-black"
          placeholder="Full name"
          required
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-seaBlue mb-1">Email Address *</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-md text-sm outline-none text-black"
          placeholder="youremail@example.com"
          required
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-seaBlue mb-1">Subject</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-3 border rounded-md text-sm outline-none text-black"
          placeholder="Subject"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-seaBlue mb-1">Your Message *</label>
        <textarea
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-3 border rounded-md text-sm outline-none text-black"
          placeholder="How can we help you?"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-yellow text-white font-bold uppercase text-sm rounded hover:bg-seaBlue transition-colors"
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;
