"use client";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../shared/providers/AuthProvider";
import { useCreateUserMutation } from "../../../../shared/redux/api/UserApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const RegisterForm = () => {
  const { createUser } = useContext(AuthContext);
  const [createUserApi] = useCreateUserMutation();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser(email, password);
      await createUserApi({
        name,
        email,
        number,
        role: "User",
        date: new Date().toISOString().split("T")[0],
      }).unwrap();

      toast.success("Account registered successfully!");
      router.push("/");
    } catch (error) {
      console.error("Register error:", error);
      toast.error("Failed to register account.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-lg border shadow-md max-w-md mx-auto">
      <h3 className="text-2xl font-bold text-seaBlue text-center mb-6">Create Account</h3>
      <div>
        <label className="block text-xs font-semibold text-seaBlue mb-1">Full Name *</label>
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
        <label className="block text-xs font-semibold text-seaBlue mb-1">Phone Number</label>
        <input
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className="w-full p-3 border rounded-md text-sm outline-none text-black"
          placeholder="+1 555-0199"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-seaBlue mb-1">Password *</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded-md text-sm outline-none text-black"
          placeholder="••••••••"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-yellow text-white font-bold uppercase text-sm rounded hover:bg-seaBlue transition-colors mt-2"
      >
        Register Account
      </button>
    </form>
  );
};

export default RegisterForm;
