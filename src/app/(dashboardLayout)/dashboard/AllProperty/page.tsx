"use client";
import React, { useState } from "react";
import {
  useDeletePropertyMutation,
  useGetPropertyQuery,
} from "../../../../shared/redux/api/PropertyApi";
import UpdatePropertyModal from "./components/UpdatePropertyModal";
import toast, { Toaster } from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import { FiEye } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { TPropertyTypes } from "../../../../shared/types/types";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";

const DashProperty = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data: properties, refetch, isFetching } = useGetPropertyQuery({
    search: activeSearch || undefined,
    page,
    limit: 10,
  });

  const meta = (properties as any)?.meta;
  const [deleteProperty] = useDeletePropertyMutation();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [editById, setEditById] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteById, setDeleteById] = useState<string | null>(null);

  const handleApproved = async (statusId: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === "approved" ? "pending" : "approved";
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4900/";
      const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
      const response = await fetch(`${cleanBaseUrl}property/${statusId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) {
        toast.error("Failed to update status");
        return;
      }
      toast.success("Status updated");
      refetch();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProperty(id).unwrap();
      toast.success("Property deleted successfully");
      refetch();
      setIsOpen(false);
    } catch (error) {
      console.error("Error deleting property:", error);
      toast.error("Failed to delete property");
    }
  };

  const handleUpdateModal = (id: string) => {
    setEditById(id);
    setShowUpdateModal(true);
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setPage(1);
    setActiveSearch(searchQuery.trim());
  };

  const formatNumber = (num?: any) => {
    if (num === undefined || num === null || num === "") return "00";
    const parsed = parseInt(num, 10);
    return isNaN(parsed) ? "00" : String(parsed).padStart(2, "0");
  };

  return (
    <div className="p-3 md:p-6 text-seaBlue">
      <Toaster />
      <div className="bg-white p-4 rounded-t-lg border border-b-0 flex flex-col md:flex-row justify-between items-center gap-4">
        <h5 className="font-bold text-lg text-[#2D3748]">All Properties List</h5>
        <form onSubmit={handleSearchSubmit} className="flex items-center w-full md:w-auto bg-[#F0F4F8] rounded-md overflow-hidden border">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-2 px-4 bg-transparent outline-none text-sm w-full md:w-80 text-black placeholder-gray-400"
            placeholder="Search by property Title..."
          />
          <button
            type="submit"
            className="bg-yellow p-3 text-white hover:bg-seaBlue transition-colors"
          >
            <IoIosSearch className="text-lg" />
          </button>
        </form>
      </div>

      <div className="bg-white rounded-b-lg border overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#F7FAFC] text-xs font-bold text-[#4A5568] border-b">
            <tr>
              <th className="py-4 px-4 w-12">#</th>
              <th className="py-4 px-4">* Property Photo and Name</th>
              <th className="py-4 px-4">Size</th>
              <th className="py-4 px-4">Property Type</th>
              <th className="py-4 px-4">Rent/Sale</th>
              <th className="py-4 px-4">Bedrooms</th>
              <th className="py-4 px-4">Bathrooms</th>
              <th className="py-4 px-4">Location</th>
              <th className="py-4 px-4">Price</th>
              <th className="py-4 px-4">Post By</th>
              <th className="py-4 px-4">Status</th>
              <th className="py-4 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm font-medium text-[#2D3748]">
            {isFetching ? (
              <tr>
                <td colSpan={12} className="text-center py-10 text-gray-500">
                  Loading properties...
                </td>
              </tr>
            ) : properties && properties.length > 0 ? (
              properties.map((property: TPropertyTypes, index: number) => (
                <tr key={property._id || index} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4">{((page - 1) * 10) + index + 1}.</td>
                  <td className="py-3 px-4 flex items-center gap-3">
                    <div className="relative w-12 h-10 rounded overflow-hidden shrink-0 border">
                      <Image
                        src={property.propertyImage01 || "/banner01.jpg"}
                        alt={property.propertyName || "prop"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="font-semibold text-seaBlue">{property.propertyName}</span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{property.squareFoot ? `${property.squareFoot} SqFt` : "N/A"}</td>
                  <td className="py-3 px-4 text-gray-600">{property.propertyCategory || "House"}</td>
                  <td className="py-3 px-4 text-gray-600">{property.propertyFor || "Sale"}</td>
                  <td className="py-3 px-4 text-gray-600">{formatNumber(property.bedroom)}</td>
                  <td className="py-3 px-4 text-gray-600">{formatNumber(property.bathroom)}</td>
                  <td className="py-3 px-4 text-gray-600">{property.city || "Dhaka"}</td>
                  <td className="py-3 px-4 font-semibold text-seaBlue">${property.price}.00</td>
                  <td className="py-3 px-4">
                    <span
                      className={`py-1 px-3 rounded text-xs font-semibold text-white ${property.postBy === "Admin" ? "bg-[#2B364B]" : "bg-yellow"
                        }`}
                    >
                      {property.postBy || "Agent"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleApproved(property._id, property.status || "pending")}
                      className={`py-1 px-3 rounded text-xs font-semibold text-white transition-colors ${property?.status === "approved"
                        ? "bg-[#48BB78] hover:bg-emerald-600"
                        : "bg-[#ED8936] hover:bg-orange-600"
                        }`}
                    >
                      {property?.status || "pending"}
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center gap-2">
                      <Link href={`/dashboard/AllProperty/${property?._id}`}>
                        <button className="bg-[#EDF2F7] p-2 rounded-md text-gray-600 hover:bg-seaBlue hover:text-white transition-colors">
                          <FiEye />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleUpdateModal(property._id)}
                        className="bg-[#EDF2F7] p-2 rounded-md text-gray-600 hover:bg-seaBlue hover:text-white transition-colors"
                      >
                        <CiEdit />
                      </button>
                      <button
                        onClick={() => {
                          setDeleteById(property._id);
                          setIsOpen(true);
                        }}
                        className="bg-yellow text-white p-2 rounded-md hover:bg-seaBlue transition-colors"
                      >
                        <AiOutlineDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={12} className="text-center py-10 text-gray-500">
                  No property found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {meta && meta.totalPages > 1 && (
        <div className="flex justify-between items-center mt-6">
          <p className="text-xs text-gray-500">
            Showing {((page - 1) * 10) + 1} to {Math.min(page * 10, meta.total)} of {meta.total} properties
          </p>
          <div className="flex gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1 bg-gray-100 border text-xs font-semibold rounded disabled:opacity-50 hover:bg-seaBlue hover:text-white transition-colors"
            >
              Previous
            </button>
            <span className="text-xs font-semibold text-seaBlue self-center px-2">
              Page {meta.page} / {meta.totalPages}
            </span>
            <button
              disabled={page >= meta.totalPages}
              onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
              className="px-3 py-1 bg-gray-100 border text-xs font-semibold rounded disabled:opacity-50 hover:bg-seaBlue hover:text-white transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {showUpdateModal && editById && (
        <UpdatePropertyModal
          onClose={() => {
            setShowUpdateModal(false);
            setEditById(null);
          }}
          propertyId={editById}
        />
      )}

      {isOpen && deleteById && (
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
              Are you sure you want to delete this property?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-gray-200 text-seaBlue px-4 py-2 rounded-md hover:bg-seaBlue hover:text-white transition-colors text-sm font-semibold"
              >
                No, cancel
              </button>
              <button
                onClick={() => handleDelete(deleteById)}
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

export default DashProperty;
