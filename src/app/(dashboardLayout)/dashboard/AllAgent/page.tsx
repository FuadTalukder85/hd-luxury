"use client";
import React, { useState } from "react";
import Image from "next/image";
import proImg from "../../../../assets/images/profileImg01.jpg";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEye } from "react-icons/fi";
import {
  useDeleteUserMutation,
  useGetUserQuery,
} from "../../../../shared/redux/api/UserApi";
import toast, { Toaster } from "react-hot-toast";
import { LoginInputs } from "../../../../shared/types/types";
import { IoMdClose } from "react-icons/io";

const AllAgent = () => {
  const { data, refetch } = useGetUserQuery("");
  const [deleteUser] = useDeleteUserMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const agents = data?.filter((u: LoginInputs) => u.role === "Agent");

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id).unwrap();
      toast.success("Agent deleted successfully");
      refetch();
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to delete agent:", error);
      toast.error("Failed to delete agent");
    }
  };

  return (
    <div className="p-3 md:p-6 text-seaBlue">
      <Toaster />
      <h5 className="bg-white p-4 border rounded-t-lg font-bold text-lg">
        All Agents List
      </h5>
      <div className="bg-white border-x border-b rounded-b-lg overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead className="bg-gray-50 text-xs uppercase font-semibold text-gray-500 border-b">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Agent Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm">
            {agents?.map((agent: LoginInputs, index: number) => (
              <tr key={agent._id || index} className="hover:bg-gray-50">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4 flex items-center gap-3">
                  <Image
                    className="rounded-full w-10 h-10 object-cover"
                    src={agent.image || proImg}
                    alt="agent"
                    width={40}
                    height={40}
                  />
                  <span className="font-semibold">{agent.name}</span>
                </td>
                <td className="py-3 px-4">{agent.email}</td>
                <td className="py-3 px-4">{agent.number || "N/A"}</td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button className="bg-gray-100 p-2 rounded-md hover:bg-seaBlue hover:text-white transition-colors">
                      <FiEye />
                    </button>
                    <button className="bg-gray-100 p-2 rounded-md hover:bg-seaBlue hover:text-white transition-colors">
                      <CiEdit />
                    </button>
                    <button
                      onClick={() => {
                        setDeleteId(agent._id);
                        setIsOpen(true);
                      }}
                      className="bg-yellow text-white p-2 rounded-md hover:bg-seaBlue transition-colors"
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isOpen && deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm relative text-center">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
              <IoMdClose />
            </button>
            <div className="flex justify-center mb-4 text-yellow text-5xl">
              <AiOutlineDelete />
            </div>
            <p className="text-seaBlue font-semibold text-lg mb-6">
              Are you sure you want to delete this agent?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-gray-200 text-seaBlue px-4 py-2 rounded-md hover:bg-seaBlue hover:text-white transition-colors text-sm font-semibold"
              >
                No, cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="bg-yellow text-white px-4 py-2 rounded-md hover:bg-seaBlue transition-colors text-sm font-semibold"
              >
                Yes, I&apos;m sure
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllAgent;
