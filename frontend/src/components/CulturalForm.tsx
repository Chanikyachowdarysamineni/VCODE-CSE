import React, { ChangeEvent, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { validationRules } from "@/utils/validation";
import { SECTIONS_BY_YEAR } from "@/utils/sections";

type FormDataType = {
  name: string;
  email: string;
  registrationNo: string;
  phoneNo: string;
  section: string;
  year: string;
  eventName: string;
};

export default function CulturalForm() {
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    registrationNo: "",
    phoneNo: "",
    section: "",
    year: "",
    eventName: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const getSectionsForYear = (year: string) => {
    return SECTIONS_BY_YEAR[year as keyof typeof SECTIONS_BY_YEAR] || [];
  };

  const culturalEvents = [
    "Dance",
    "Music",
    "Drama",
    "Art & Painting",
    "Photography",
    "Fashion Show",
    "Debate",
    "Poetry",
    "Story Telling",
  ];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    const nameValidation = validationRules.validateName(formData.name);
    if (!nameValidation.valid) newErrors.name = nameValidation.error;

    const emailValidation = validationRules.validateEmail(formData.email);
    if (!emailValidation.valid) newErrors.email = emailValidation.error;

    const regValidation = validationRules.validateRegistrationNo(
      formData.registrationNo
    );
    if (!regValidation.valid)
      newErrors.registrationNo = regValidation.error;

    const phoneValidation = validationRules.validatePhoneNo(formData.phoneNo);
    if (!phoneValidation.valid) newErrors.phoneNo = phoneValidation.error;

    if (!formData.section.trim()) {
      newErrors.section = "Section is required";
    }

    if (!formData.year) {
      newErrors.year = "Year is required";
    }

    if (!formData.eventName) {
      newErrors.eventName = "Event name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill all required fields correctly");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/cultural/register",
        formData
      );

      if (response.status === 201 || response.status === 200) {
        toast.success("Registration successful!");
        setFormData({
          name: "",
          email: "",
          registrationNo: "",
          phoneNo: "",
          section: "",
          year: "",
          eventName: "",
        });
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 md:p-8">
      <Toaster />
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Cultural Events</h2>
        <p className="text-gray-400">
          Join us for exciting cultural celebrations
        </p>
      </div>

      <form onSubmit={submitForm} className="space-y-6">
        {/* Event Name Dropdown */}
        <div>
          <Label htmlFor="eventName" className="text-white mb-2 block">
            Event Name <span className="text-red-500">*</span>
          </Label>
          <select
            id="eventName"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            className={cn(
              "w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none transition",
              errors.eventName ? "border-red-500" : ""
            )}
            required
          >
            <option value="">Select an event</option>
            {culturalEvents.map((event) => (
              <option key={event} value={event}>
                {event}
              </option>
            ))}
          </select>
          {errors.eventName && (
            <p className="text-red-500 text-sm mt-1">{errors.eventName}</p>
          )}
        </div>

        {/* Name */}
        <div>
          <Label htmlFor="name" className="text-white mb-2 block">
            Full Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            className={cn(
              "w-full",
              errors.name
                ? "border-red-500 focus:border-red-500"
                : "border-gray-600"
            )}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email" className="text-white mb-2 block">
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className={cn(
              "w-full",
              errors.email
                ? "border-red-500 focus:border-red-500"
                : "border-gray-600"
            )}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Registration Number */}
        <div>
          <Label htmlFor="registrationNo" className="text-white mb-2 block">
            Registration No <span className="text-red-500">*</span>
          </Label>
          <Input
            id="registrationNo"
            type="text"
            name="registrationNo"
            placeholder="Enter your registration number"
            value={formData.registrationNo}
            onChange={handleChange}
            className={cn(
              "w-full",
              errors.registrationNo
                ? "border-red-500 focus:border-red-500"
                : "border-gray-600"
            )}
          />
          {errors.registrationNo && (
            <p className="text-red-500 text-sm mt-1">
              {errors.registrationNo}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <Label htmlFor="phoneNo" className="text-white mb-2 block">
            Phone Number <span className="text-red-500">*</span>
          </Label>
          <Input
            id="phoneNo"
            type="tel"
            name="phoneNo"
            placeholder="Enter your phone number"
            value={formData.phoneNo}
            onChange={handleChange}
            className={cn(
              "w-full",
              errors.phoneNo
                ? "border-red-500 focus:border-red-500"
                : "border-gray-600"
            )}
          />
          {errors.phoneNo && (
            <p className="text-red-500 text-sm mt-1">{errors.phoneNo}</p>
          )}
        </div>

        {/* Section and Year */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="section" className="text-white mb-2 block">
              Section <span className="text-red-500">*</span>
            </Label>
            <Input
              id="section"
              type="text"
              name="section"
              placeholder="Enter your section"
              value={formData.section}
              onChange={handleChange}
              className={cn(
                "w-full",
                errors.section
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-600"
              )}
            />
            {errors.section && (
              <p className="text-red-500 text-sm mt-1">{errors.section}</p>
            )}
          </div>

          <div>
            <Label htmlFor="year" className="text-white mb-2 block">
              Year <span className="text-red-500">*</span>
            </Label>
            <select
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className={cn(
                "w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none transition",
                errors.year ? "border-red-500" : ""
              )}
              required
            >
              <option value="">Select Year (Required: 2nd or 3rd)</option>
              <option value="2nd">2nd Year</option>
              <option value="3rd">3rd Year</option>
            </select>
            {errors.year && (
              <p className="text-red-500 text-sm mt-1">{errors.year}</p>
            )}
          </div>

          {/* Section */}
          {formData.year && getSectionsForYear(formData.year).length > 0 && (
            <div>
              <Label htmlFor="section" className="text-white mb-2 block">
                Section <span className="text-red-500">*</span>
              </Label>
              <select
                id="section"
                name="section"
                value={formData.section}
                onChange={handleChange}
                className={cn(
                  "w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none transition",
                  errors.section ? "border-red-500" : ""
                )}
                required
              >
                <option value="">Select Section</option>
                {getSectionsForYear(formData.year).map((sec) => (
                  <option key={sec} value={sec}>{sec}</option>
                ))}
              </select>
              {errors.section && (
                <p className="text-red-500 text-sm mt-1">{errors.section}</p>
              )}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <ClipLoader color="white" size={20} />
              Registering...
            </>
          ) : (
            "Register"
          )}
        </button>
      </form>
    </div>
  );
}
