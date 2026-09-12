"use client";
import { AiOutlineDelete } from "react-icons/ai";
import useCurrentUser from "../../../../shared/hooks/useCurrentUser";
import {
  useDeletePropertyMutation,
  useGetPropertyQuery,
} from "../../../../shared/redux/api/PropertyApi";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import UpdatePropertyModal from "../AllProperty/components/UpdatePropertyModal";
import toast, { Toaster } from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import { FiEye } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const MyProperty = () => {
  const currentUser = useCurrentUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data: myProperties, refetch, isFetching } = useGetPropertyQuery(
    currentUser?.email
      ? {
          email: currentUser.email,
          search: activeSearch || undefined,
          page,
          limit: 10,
        }
      : undefined
  );

  const meta = (myProperties as any)?.meta;
  const [deleteProperty] = useDeletePropertyMutation();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [editById, setEditById] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      await deleteProperty(id).unwrap();
      refetch();
      toast.success("Property deleted successfully");
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to delete property:", error);
      toast.error("Failed to delete property");
    }
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setPage(1);
    setActiveSearch(searchQuery.trim());
  };

  if (!currentUser) {
    return (
      <div className="flex items-center mt-36 justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-3 md:p-6 text-seaBlue">
      <Toaster />
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-lg border mb-6 gap-4">
        <h5 className="font-bold text-lg">My Property Listings</h5>
        <form onSubmit={handleSearchSubmit} className="flex items-center w-full md:w-auto bg-gray-100 rounded-md overflow-hidden border">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-2 px-3 bg-transparent outline-none text-sm w-full md:w-80 text-black"
            placeholder="Search by title..."
          />
          <button
            type="submit"
            className="bg-yellow p-3 text-white hover:bg-seaBlue transition-colors"
          >
            <IoIosSearch className="text-lg" />
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg border overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead className="bg-gray-50 text-xs uppercase font-semibold text-gray-500 border-b">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Property</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm">
            {isFetching ? (
              <tr>
                <td colSpan={6} className="text-center py-10 text-gray-500">
                  Loading properties...
                </td>
              </tr>
            ) : myProperties && myProperties.length > 0 ? (
              myProperties.map((property: any, index: number) => (
                <tr key={property._id || index} className="hover:bg-gray-50">
                  <td className="py-3 px-4">{((page - 1) * 10) + index + 1}</td>
                  <td className="py-3 px-4 flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded overflow-hidden shrink-0">
                      <Image
                        src={property.propertyImage01 || "/banner01.jpg"}
                        alt="prop"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-seaBlue">{property.propertyName}</p>
                      <p className="text-xs text-gray-400">{property.city}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">{property.propertyCategory}</td>
                  <td className="py-3 px-4">{property.propertyFor}</td>
                  <td className="py-3 px-4 font-semibold">${property.price}.00</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <Link href={`/dashboard/AllProperty/${property?._id}`}>
                        <button className="bg-gray-100 p-2 rounded-md hover:bg-seaBlue hover:text-white transition-colors">
                          <FiEye />
                        </button>
                      </Link>
                      <button
                        onClick={() => {
                          setEditById(property._id);
                          setShowUpdateModal(true);
                        }}
                        className="bg-gray-100 p-2 rounded-md hover:bg-seaBlue hover:text-white transition-colors"
                      >
                        <CiEdit />
                      </button>
                      <button
                        onClick={() => {
                          setDeleteId(property._id);
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
                <td colSpan={6} className="text-center py-10 text-gray-500">
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
              className="px-3 py-1 bg-gray-100 border text-xs font-semibold rounded disabled:opacity-50 hover:bg-seaBlue hover:text-white"
            >
              Previous
            </button>
            <span className="text-xs font-semibold text-seaBlue self-center px-2">
              Page {meta.page} / {meta.totalPages}
            </span>
            <button
              disabled={page >= meta.totalPages}
              onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
              className="px-3 py-1 bg-gray-100 border text-xs font-semibold rounded disabled:opacity-50 hover:bg-seaBlue hover:text-white"
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

export default MyProperty;
