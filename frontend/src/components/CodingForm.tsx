import React, { ChangeEvent, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { validationRules } from "@/utils/validation";
import { SECTIONS_BY_YEAR } from "@/utils/sections";

// Define the expected form data structure
type FormDataType = {
  name: string;
  email: string;
  registrationNo: string;
  phoneNo: string;
  section: string;
  year: string;
};

export default function CodingForm() {
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    registrationNo: "",
    phoneNo: "",
    section: "",
    year: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate name
    const nameValidation = validationRules.validateName(formData.name);
    if (!nameValidation.valid) newErrors.name = nameValidation.error;

    // Validate email
    const emailValidation = validationRules.validateEmail(formData.email);
    if (!emailValidation.valid) newErrors.email = emailValidation.error;

    // Validate phone number
    const phoneValidation = validationRules.validatePhoneNo(formData.phoneNo);
    if (!phoneValidation.valid) newErrors.phoneNo = phoneValidation.error;

    // Validate registration number
    const regNoValidation = validationRules.validateRegistrationNo(formData.registrationNo);
    if (!regNoValidation.valid) newErrors.registrationNo = regNoValidation.error;

    // Validate year
    const yearValidation = validationRules.validateYear(formData.year);
    if (!yearValidation.valid) newErrors.year = yearValidation.error;

    // Validate section
    const sectionValidation = validationRules.validateSection(formData.section);
    if (!sectionValidation.valid) newErrors.section = sectionValidation.error;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
      await axios.post(`${apiUrl}/api/register`, {
        eventName: "Coding Challenge",
        participants: [formData],
      });

      toast.success("Registration successful!");
      setFormData({
        name: "",
        email: "",
        registrationNo: "",
        phoneNo: "",
        section: "",
        year: "",
      });
      setErrors({});

    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error("Registration failed: " + error.response.data.error);
      } else {
        console.error("An unexpected error occurred:", error);
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const getSectionsForYear = (year: string) => {
    return SECTIONS_BY_YEAR[year as keyof typeof SECTIONS_BY_YEAR] || [];
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-full sm:max-w-2xl rounded-none p-3 sm:p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <Toaster />
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-neutral-100 dark:text-neutral-200">
        Participate in Coding Challenge
      </h2>

      <form className="my-6 sm:my-8" onSubmit={handleSubmit}>
        {(Object.keys(formData) as (keyof FormDataType)[]).map((key) => (
          key !== "section" && (
            <LabelInputContainer key={key} className="mb-4">
              <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
              {key === "year" ? (
                <div>
                  <select
                    id={key}
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className={cn(
                      "w-full p-2 rounded-md border bg-neutral-900 text-white dark:border-neutral-700",
                      errors[key] ? "border-red-500" : ""
                    )}
                  >
                    <option value="">Select Year (Required: 2nd or 3rd)</option>
                    <option value="2nd">2nd Year</option>
                    <option value="3rd">3rd Year</option>
                  </select>
                  {errors[key] && <p className="text-red-400 text-xs mt-1">{errors[key]}</p>}
                </div>
              ) : (
                <div>
                  <Input
                    id={key}
                    name={key}
                    type={key === "email" ? "email" : "text"}
                    placeholder={`Enter your ${key}`}
                    value={formData[key]}
                    onChange={handleChange}
                    className={errors[key] ? "border-red-500" : ""}
                  />
                  {errors[key] && <p className="text-red-400 text-xs mt-1">{errors[key]}</p>}
                </div>
              )}
            </LabelInputContainer>
          )
        ))}

        {formData.year && getSectionsForYear(formData.year).length > 0 && (
          <LabelInputContainer className="mb-4">
            <Label htmlFor="section">Section <span className="text-red-500">*</span></Label>
            <div>
              <select
                id="section"
                name="section"
                value={formData.section}
                onChange={handleChange}
                className={cn(
                  "w-full p-2 rounded-md border bg-neutral-900 text-white dark:border-neutral-700",
                  errors.section ? "border-red-500" : ""
                )}
                required
              >
                <option value="">Select Section</option>
                {getSectionsForYear(formData.year).map((sec) => (
                  <option key={sec} value={sec}>{sec}</option>
                ))}
              </select>
              {errors.section && <p className="text-red-400 text-xs mt-1">{errors.section}</p>}
            </div>
          </LabelInputContainer>
        )}

        <button
          type="submit"
          disabled={loading}
          className="group relative block w-full rounded-md bg-gradient-to-br from-black to-neutral-600 text-white font-semibold py-2 sm:py-3 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <ClipLoader size={20} color="#fff" /> : "Register →"}
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}

const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
);

interface LabelInputContainerProps {
  children: React.ReactNode;
  className?: string;
}

const LabelInputContainer = ({ children, className }: LabelInputContainerProps) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>{children}</div>
  );
};
