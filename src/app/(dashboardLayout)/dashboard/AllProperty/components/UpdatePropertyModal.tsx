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
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg text-[#1C2D42]">Loading property details...</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 md:p-8 w-full max-w-7xl relative my-6 text-[#1C2D42] max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Orange Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-[#F68B1E] text-white p-1 rounded hover:bg-[#d97715] transition-colors"
        >
          <IoMdClose className="text-xl" />
        </button>

        {/* Modal Title */}
        <h3 className="text-xl font-bold text-[#1C2D42] mb-6">Update your property</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Row 1: Property Name | Property Image 01 | Property Image 02 */}
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
          </div>

          {/* Row 2: Property Image 03 | Property Image 04 | Price */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <FormField
              label="Price"
              name="price"
              type="number"
              register={register}
              error={errors.price as any}
              defaultValue={property?.price}
              required
            />
          </div>

          {/* Row 3: Property For | Property Categories | Bedroom */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              label="Property For"
              name="propertyFor"
              type="select"
              options={[
                { value: "Rent", label: "Rent" },
                { value: "Sale", label: "Sale" },
                { value: "Featured", label: "Featured" },
              ]}
              register={register}
              error={errors.propertyFor as any}
              defaultValue={property?.propertyFor}
              required
            />
            <FormField
              label="Property Categories"
              name="propertyCategory"
              type="select"
              options={[
                { value: "House", label: "House" },
                { value: "Apartment", label: "Apartment" },
                { value: "Office", label: "Office" },
              ]}
              register={register}
              error={errors.propertyCategory as any}
              defaultValue={property?.propertyCategory}
              required
            />
            <FormField
              label="Bedroom"
              name="bedroom"
              type="number"
              register={register}
              error={errors.bedroom as any}
              defaultValue={property?.bedroom}
              required
            />
          </div>

          {/* Row 4: Bathroom | Square Foot | Floor */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              label="Bathroom"
              name="bathroom"
              type="number"
              register={register}
              error={errors.bathroom as any}
              defaultValue={property?.bathroom}
              required
            />
            <FormField
              label="Square Foot"
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
          </div>

          {/* Row 5: Build year | Property Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Build year"
              name="buildYear"
              type="number"
              register={register}
              error={errors.buildYear as any}
              defaultValue={property?.buildYear}
              required
            />
            <FormField
              label="Property Address"
              name="address"
              register={register}
              error={errors.address as any}
              defaultValue={property?.address}
              required
            />
          </div>

          {/* Row 6: Zip-Code | City | Country */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                { value: "Select country", label: "Select country" },
                { value: "Bangladesh", label: "Bangladesh" },
                { value: "USA", label: "USA" },
              ]}
              register={register}
              error={errors.country as any}
              defaultValue={property?.country || "Select country"}
              required
            />
          </div>

          {/* Row 7: Description */}
          <div>
            <label className="block text-sm font-medium text-[#1C2D42] mb-1">
              Description
            </label>
            <textarea
              {...register("description")}
              defaultValue={property?.description}
              rows={4}
              placeholder="Explore nearby amenities to precisely locate your property..."
              className="w-full border border-gray-300 rounded-md shadow-sm p-3 text-sm text-[#1C2D42] outline-none focus:border-[#F68B1E] transition-colors"
            ></textarea>
          </div>

          {/* Action Buttons: Update Property (Navy) | Cancel (Orange) */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#1C2D42] text-white rounded font-semibold text-sm hover:bg-[#111c2a] transition-colors shadow-sm"
            >
              Update Property
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 bg-[#F68B1E] text-white rounded font-semibold text-sm hover:bg-[#d97715] transition-colors shadow-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePropertyModal;
