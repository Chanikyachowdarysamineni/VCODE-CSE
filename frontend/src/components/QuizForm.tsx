import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { validationRules } from "@/utils/validation";
import { SECTIONS_BY_YEAR } from "@/utils/sections";

interface Participant {
  name: string;
  email: string;
  registrationNo: string;
  phoneNo: string;
  section: string;
  year: string;
}

interface FormErrors {
  teamName: string;
  members: Record<number, Record<string, string>>;
}

export default function QuizForm() {
  const [formData, setFormData] = useState<Participant[]>([
    {
      name: "",
      email: "",
      registrationNo: "",
      phoneNo: "",
      section: "",
      year: "",
    },
    {
      name: "",
      email: "",
      registrationNo: "",
      phoneNo: "",
      section: "",
      year: "",
    },
    {
      name: "",
      email: "",
      registrationNo: "",
      phoneNo: "",
      section: "",
      year: "",
    },
    {
      name: "",
      email: "",
      registrationNo: "",
      phoneNo: "",
      section: "",
      year: "",
    },
  ]);
  const [teamName, setTeamName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({
    teamName: "",
    members: {},
  });

  const getSectionsForYear = (year: string) => {
    return SECTIONS_BY_YEAR[year as keyof typeof SECTIONS_BY_YEAR] || [];
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const updatedFormData = [...formData];
    updatedFormData[index] = { ...updatedFormData[index], [name]: value };
    setFormData(updatedFormData);
    // Clear error
    setErrors((prev) => ({
      ...prev,
      members: {
        ...prev.members,
        [index]: {
          ...(prev.members[index] || {}),
          [name]: "",
        },
      },
    }));
  };

  const handleTeamNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(e.target.value);
    setErrors((prev) => ({ ...prev, teamName: "" }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      teamName: "",
      members: {},
    };

    // Validate team name
    const teamNameValidation = validationRules.validateTeamName(teamName);
    if (!teamNameValidation.valid) newErrors.teamName = teamNameValidation.error;

    // Validate each member
    for (let i = 0; i < formData.length; i++) {
      const member = formData[i];
      newErrors.members[i] = {};

      // Validate name
      const nameValidation = validationRules.validateName(member.name);
      if (!nameValidation.valid) newErrors.members[i].name = nameValidation.error;

      // Validate email
      const emailValidation = validationRules.validateEmail(member.email);
      if (!emailValidation.valid) newErrors.members[i].email = emailValidation.error;

      // Validate phone number
      const phoneValidation = validationRules.validatePhoneNo(member.phoneNo);
      if (!phoneValidation.valid) newErrors.members[i].phoneNo = phoneValidation.error;

      // Validate registration number
      const regNoValidation = validationRules.validateRegistrationNo(member.registrationNo);
      if (!regNoValidation.valid) newErrors.members[i].registrationNo = regNoValidation.error;

      // Validate year
      const yearValidation = validationRules.validateYear(member.year);
      if (!yearValidation.valid) newErrors.members[i].year = yearValidation.error;

      // Validate section
      const sectionValidation = validationRules.validateSection(member.section);
      if (!sectionValidation.valid) newErrors.members[i].section = sectionValidation.error;

      // Remove empty error entries
      if (Object.keys(newErrors.members[i]).length === 0) {
        delete newErrors.members[i];
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors.members).length === 0 && !newErrors.teamName;
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
        eventName: "Technical Quiz",
        participants: formData,
        teamName: teamName,
      });

      toast.success("Registration successful!");
      setFormData([
        {
          name: "",
          email: "",
          registrationNo: "",
          phoneNo: "",
          section: "",
          year: "",
        },
        {
          name: "",
          email: "",
          registrationNo: "",
          phoneNo: "",
          section: "",
          year: "",
        },
        {
          name: "",
          email: "",
          registrationNo: "",
          phoneNo: "",
          section: "",
          year: "",
        },
        {
          name: "",
          email: "",
          registrationNo: "",
          phoneNo: "",
          section: "",
          year: "",
        },
      ]);
      setTeamName("");
      setErrors({ teamName: "", members: {} });
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

  return (
    <div className="shadow-input mx-auto w-full max-w-lvh rounded-none p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <Toaster position="top-right" />
      <h2 className="text-xl font-bold text-neutral-100 dark:text-neutral-200">
        Participate in the Coding Challenge (Team of 3)
      </h2>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-8 p-4 rounded-md border border-green-400 text-white bg-green-900/20">
          <Label htmlFor="teamName">Team Name *</Label>
          <Input
            id="teamName"
            name="teamName"
            placeholder="Enter your team name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
        </LabelInputContainer>

        {formData.map((member, index) => (
          <div key={index} className="border-b border-gray-600 pb-6 mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">
              Member {index + 1}
            </h3>

            {["name", "email", "registrationNo", "phoneNo"].map((field) => (
              <LabelInputContainer key={field} className="mb-4">
                <Label htmlFor={`${field}-${index}`}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </Label>
                <Input
                  id={`${field}-${index}`}
                  name={field}
                  placeholder={`Enter ${field}`}
                  value={member[field as keyof typeof member]}
                  onChange={(e) => handleChange(e, index)}
                />
              </LabelInputContainer>
            ))}

            <LabelInputContainer className="mb-4">
              <Label htmlFor={`year-${index}`}>Year</Label>
              <select
                id={`year-${index}`}
                name="year"
                value={member.year}
                onChange={(e) => handleChange(e, index)}
                className="w-full p-2 rounded-md border bg-neutral-900 text-white"
                required
              >
                <option value="">Select Year (Required: 2nd or 3rd)</option>
                <option value="2nd">2nd Year</option>
                <option value="3rd">3rd Year</option>
              </select>
            </LabelInputContainer>

            {member.year && getSectionsForYear(member.year).length > 0 && (
              <LabelInputContainer className="mb-4">
                <Label htmlFor={`section-${index}`}>Section <span className="text-red-500">*</span></Label>
                <select
                  id={`section-${index}`}
                  name="section"
                  value={member.section}
                  onChange={(e) => handleChange(e, index)}
                  className="w-full p-2 rounded-md border bg-neutral-900 text-white"
                  required
                >
                  <option value="">Select Section</option>
                  {getSectionsForYear(member.year).map((sec) => (
                    <option key={sec} value={sec}>
                      {sec}
                    </option>
                  ))}
                </select>
              </LabelInputContainer>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 text-white"
        >
          {loading ? <ClipLoader color="#fff" size={20} /> : "Register →"}
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}

// LabelInputContainer, Label, Input components should be defined or imported accordingly.

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
