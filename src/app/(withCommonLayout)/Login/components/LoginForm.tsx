"use client";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../shared/providers/AuthProvider";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LoginForm = () => {
  const { signIn } = useContext(AuthContext);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      toast.success("Login successful!");
      router.push("/");
    } catch (error: any) {
      console.error("Login error:", error);
      if (
        error?.code === "auth/invalid-credential" ||
        error?.code === "auth/user-not-found" ||
        error?.code === "auth/wrong-password"
      ) {
        toast.error("Invalid email or password. Please register first if you do not have an account.");
      } else {
        toast.error("Failed to login. Please check your credentials.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-lg border shadow-md max-w-md mx-auto">
      <h3 className="text-2xl font-bold text-seaBlue text-center mb-6">Account Login</h3>
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
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
