"use client";
import React, { useEffect } from "react";
import { useForm, FieldValues } from "react-hook-form";
import FormField from "../../../../../shared/components/ui/FormField";
import {
  useGetSinglePropertyQuery,
  useUpdatePropertyMutation,
} from "../../../../../shared/redux/api/PropertyApi";
import { TPropertyTypes } from "../../../../../shared/types/types";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";

type Props = {
  onClose: () => void;
  propertyId: string | null;
};

const UpdatePropertyModal: React.FC<Props> = ({ onClose, propertyId }) => {
  const { data: property, isLoading } = useGetSinglePropertyQuery(propertyId, {
    skip: !propertyId,
  });
  const [updateProperty] = useUpdatePropertyMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>();

  useEffect(() => {
    if (property) {
      reset(property);
    }
  }, [property, reset]);

  const onSubmit = async (formData: FieldValues) => {
    if (!propertyId) return;
    try {
      await updateProperty({
        id: propertyId,
        body: formData as Partial<TPropertyTypes>,
      }).unwrap();
      toast.success("Property updated successfully!");
      onClose();
    } catch (error) {
      console.error("Failed to update property:", error);
      toast.error("Failed to update property");
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg text-seaBlue">Loading property details...</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl relative my-8 text-seaBlue max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
        >
          <IoMdClose />
        </button>
        <h3 className="text-xl font-bold mb-4">Update Property</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              label="Property Name"
              name="propertyName"
              register={register}
              error={errors.propertyName as any}
              defaultValue={property?.propertyName}
              required
            />
            <FormField
              label="Price ($)"
              name="price"
              type="number"
              register={register}
              error={errors.price as any}
              defaultValue={property?.price}
              required
            />
            <FormField
              label="Property Categories"
              name="propertyCategory"
              type="select"
              options={[
                { value: "Apartment", label: "Apartment" },
                { value: "House", label: "House" },
                { value: "Office", label: "Office" },
              ]}
              register={register}
              error={errors.propertyCategory as any}
              defaultValue={property?.propertyCategory}
              required
            />
            <FormField
              label="Property For"
              name="propertyFor"
              type="select"
              options={[
                { value: "Sale", label: "Sale" },
                { value: "Rent", label: "Rent" },
                { value: "Featured", label: "Featured" },
              ]}
              register={register}
              error={errors.propertyFor as any}
              defaultValue={property?.propertyFor}
              required
            />
            <FormField
              label="Bedrooms"
              name="bedroom"
              type="number"
              register={register}
              error={errors.bedroom as any}
              defaultValue={property?.bedroom}
              required
            />
            <FormField
              label="Bathrooms"
              name="bathroom"
              type="number"
              register={register}
              error={errors.bathroom as any}
              defaultValue={property?.bathroom}
              required
            />
            <FormField
              label="Square Feet"
              name="squareFoot"
              type="number"
              register={register}
              error={errors.squareFoot as any}
              defaultValue={property?.squareFoot}
              required
            />
            <FormField
              label="Floor"
              name="floor"
              type="number"
              register={register}
              error={errors.floor as any}
              defaultValue={property?.floor}
              required
            />
            <FormField
              label="Build Year"
              name="buildYear"
              type="number"
              register={register}
              error={errors.buildYear as any}
              defaultValue={property?.buildYear}
              required
            />
            <FormField
              label="Status"
              name="status"
              type="select"
              options={[
                { value: "pending", label: "Pending" },
                { value: "approved", label: "Approved" },
              ]}
              register={register}
              error={errors.status as any}
              defaultValue={property?.status || "pending"}
              required
            />
            <FormField
              label="Zip-Code"
              name="zipCode"
              register={register}
              error={errors.zipCode as any}
              defaultValue={property?.zipCode}
              required
            />
            <FormField
              label="City"
              name="city"
              type="select"
              options={[
                { value: "Faridpur", label: "Faridpur" },
                { value: "Mirpur", label: "Mirpur" },
                { value: "Gazipur", label: "Gazipur" },
                { value: "Narayanganj", label: "Narayanganj" },
                { value: "Dhaka", label: "Dhaka" },
              ]}
              register={register}
              error={errors.city as any}
              defaultValue={property?.city}
              required
            />
            <FormField
              label="Country"
              name="country"
              type="select"
              options={[
                { value: "Bangladesh", label: "Bangladesh" },
                { value: "USA", label: "USA" },
              ]}
              register={register}
              error={errors.country as any}
              defaultValue={property?.country}
              required
            />
          </div>

          <FormField
            label="Property Address"
            name="address"
            register={register}
            error={errors.address as any}
            defaultValue={property?.address}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Property Image 01"
              name="propertyImage01"
              register={register}
              error={errors.propertyImage01 as any}
              defaultValue={property?.propertyImage01}
              required
            />
            <FormField
              label="Property Image 02"
              name="propertyImage02"
              register={register}
              error={errors.propertyImage02 as any}
              defaultValue={property?.propertyImage02}
            />
            <FormField
              label="Property Image 03"
              name="propertyImage03"
              register={register}
              error={errors.propertyImage03 as any}
              defaultValue={property?.propertyImage03}
            />
            <FormField
              label="Property Image 04"
              name="propertyImage04"
              register={register}
              error={errors.propertyImage04 as any}
              defaultValue={property?.propertyImage04}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-seaBlue">
              Description<span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("description", { required: true })}
              defaultValue={property?.description}
              rows={4}
              placeholder="Description"
              className="w-full border border-gray-300 rounded-md shadow-sm mt-1 p-2 outline-none"
            ></textarea>
            {errors.description && (
              <span className="text-red-600 text-xs">This field is required</span>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-seaBlue rounded hover:bg-gray-300 transition-colors text-sm font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-yellow text-white rounded hover:bg-seaBlue transition-colors text-sm font-semibold"
            >
              Update Property
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePropertyModal;
