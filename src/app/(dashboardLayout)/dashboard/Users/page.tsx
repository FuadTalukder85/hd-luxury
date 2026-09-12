"use client";
import { useState } from "react";
import Image from "next/image";
import proImg from "../../../../assets/images/profileImg01.jpg";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEye } from "react-icons/fi";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import {
  useDeleteUserMutation,
  useGetUserQuery,
  useUpdateUserRoleMutation,
} from "../../../../shared/redux/api/UserApi";
import toast, { Toaster } from "react-hot-toast";
import { LoginInputs } from "../../../../shared/types/types";

const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [page, setPage] = useState(1);

  const { data, refetch, isFetching } = useGetUserQuery({
    search: activeSearch || undefined,
    role: roleFilter || undefined,
    page,
    limit: 10,
  });

  const meta = (data as any)?.meta;
  const [deleteUser] = useDeleteUserMutation();
  const [updateUserRole] = useUpdateUserRoleMutation();

  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleRoleChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
    users: LoginInputs
  ) => {
    const selectedRole = e.target.value;
    if (!selectedRole) return;
    try {
      await updateUserRole({ id: users._id, role: selectedRole }).unwrap();
      toast.success("Successfully updated user role");
      refetch();
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error("Failed to update role");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id).unwrap();
      toast.success("User deleted successfully");
      refetch();
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast.error("Failed to delete user");
    }
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setPage(1);
    setActiveSearch(searchQuery.trim());
  };

  return (
    <div className="p-3 md:p-6 text-seaBlue">
      <Toaster />
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 border rounded-t-lg gap-4">
        <h5 className="font-bold text-lg">All Users List</h5>
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <select
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setPage(1);
            }}
            className="py-2 px-3 bg-gray-100 border text-xs font-semibold rounded outline-none"
          >
            <option value="">All Roles</option>
            <option value="User">User</option>
            <option value="Agent">Agent</option>
            <option value="Admin">Admin</option>
          </select>
          <form onSubmit={handleSearchSubmit} className="flex items-center bg-gray-100 rounded-md overflow-hidden border">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="py-2 px-3 bg-transparent outline-none text-sm w-full md:w-64 text-black"
              placeholder="Search user name or email..."
            />
            <button
              type="submit"
              className="bg-yellow p-3 text-white hover:bg-seaBlue transition-colors"
            >
              <IoIosSearch className="text-lg" />
            </button>
          </form>
        </div>
      </div>
      <div className="bg-white border-x border-b rounded-b-lg overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead className="bg-gray-50 text-xs uppercase font-semibold text-gray-500 border-b">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">User Photo & Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Join Date</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm">
            {isFetching ? (
              <tr>
                <td colSpan={6} className="text-center py-10 text-gray-500">
                  Loading users...
                </td>
              </tr>
            ) : data && data.length > 0 ? (
              data.map((users: LoginInputs, index: number) => (
                <tr key={users._id || index} className="hover:bg-gray-50">
                  <td className="py-3 px-4">{((page - 1) * 10) + index + 1}</td>
                  <td className="py-3 px-4 flex items-center gap-3">
                    <Image
                      className="rounded-full w-10 h-10 object-cover"
                      src={users.image || proImg}
                      alt="pro"
                      width={40}
                      height={40}
                    />
                    <span className="font-semibold">{users.name}</span>
                  </td>
                  <td className="py-3 px-4">{users.email}</td>
                  <td className="py-3 px-4">{users.date || "N/A"}</td>
                  <td className="py-3 px-4">
                    <select
                      className="bg-gray-100 border p-1 rounded text-xs font-semibold outline-none"
                      value={users.role || "User"}
                      onChange={(e) => handleRoleChange(e, users)}
                    >
                      <option value="User">User</option>
                      <option value="Agent">Agent</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </td>
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
                          setDeleteId(users._id);
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
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {meta && meta.totalPages > 1 && (
        <div className="flex justify-between items-center mt-6">
          <p className="text-xs text-gray-500">
            Showing {((page - 1) * 10) + 1} to {Math.min(page * 10, meta.total)} of {meta.total} users
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
              Are you sure you want to delete this user?
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

export default Users;
