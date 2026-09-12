"use client";
import Image from "next/image";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEye } from "react-icons/fi";
import {
  useDeleteContactMutation,
  useGetContactQuery,
  useGetSingleContactQuery,
} from "../../../../shared/redux/api/ContactApi";
import proImg from "../../../../assets/images/profileImg01.jpg";
import { MdClose } from "react-icons/md";
import { LoginInputs } from "../../../../shared/types/types";
import toast, { Toaster } from "react-hot-toast";
import { IoMdClose } from "react-icons/io";

const MessagePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(
    null
  );
  const { data, refetch } = useGetContactQuery("");
  const { data: singleContact } = useGetSingleContactQuery(selectedContactId, {
    skip: !selectedContactId,
  });
  const [deleteContact] = useDeleteContactMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleShowModal = (id: string) => {
    setSelectedContactId(id);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteContact(id).unwrap();
      toast.success("Message deleted successfully");
      refetch();
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to delete message:", error);
      toast.error("Failed to delete message");
    }
  };

  return (
    <div className="p-3 md:p-6 text-seaBlue">
      <Toaster />
      <h5 className="bg-white p-4 border rounded-t-lg font-bold text-lg">
        All Messages List
      </h5>
      <div className="bg-white border-x border-b rounded-b-lg overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[750px]">
          <thead className="bg-gray-50 text-xs uppercase font-semibold text-gray-500 border-b">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Person & Subject</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm">
            {data?.map((contact: LoginInputs, index: number) => (
              <tr key={contact._id || index} className="hover:bg-gray-50">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4 flex items-center gap-3">
                  <Image
                    className="rounded-lg w-10 h-10 object-cover"
                    src={proImg}
                    alt="pro"
                    width={40}
                    height={40}
                  />
                  <div>
                    <p className="font-semibold text-seaBlue">{contact?.name}</p>
                    <p className="text-xs text-gray-500 truncate max-w-xs">{contact?.subject}</p>
                  </div>
                </td>
                <td className="py-3 px-4">{contact?.email}</td>
                <td className="py-3 px-4">{contact?.date}</td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleShowModal(contact._id)}
                      className="bg-gray-100 p-2 rounded-md hover:bg-seaBlue hover:text-white transition-colors"
                    >
                      <FiEye />
                    </button>
                    <button
                      onClick={() => {
                        setDeleteId(contact._id);
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

      {showModal && (
        <div className="fixed inset-0 text-seaBlue bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 relative">
            <div className="flex justify-between items-center mb-4 border-b pb-3">
              <h4 className="font-bold text-lg">{singleContact?.name}</h4>
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedContactId(null);
                }}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                <MdClose />
              </button>
            </div>
            <div className="space-y-2 text-sm">
              <p className="font-semibold">
                Email: <span className="font-normal text-gray-600">{singleContact?.email}</span>
              </p>
              <p className="font-semibold">
                Subject: <span className="font-normal text-gray-600">{singleContact?.subject}</span>
              </p>
              <p className="font-semibold mt-4">Message:</p>
              <p className="p-3 bg-gray-50 rounded border text-gray-700 leading-relaxed">
                {singleContact?.message}
              </p>
            </div>
          </div>
        </div>
      )}

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
              Are you sure you want to delete this message?
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

export default MessagePage;
