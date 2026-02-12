import React, { ChangeEvent, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { validationRules } from "@/utils/validation";

type FormDataType = {
  eventName: string;
  participants: Participant[];
  topic: string;
};

type Participant = {
  name: string;
  email: string;
  registrationNo: string;
  phoneNo: string;
  section: string;
  year: string;
};

export default function PosterForm() {
  interface FormErrors {
    topic: string;
    participants: Record<number, Record<string, string>>;
  }

  const [formData, setFormData] = useState<FormDataType>({
    eventName: "Poster Presentation",
    topic: "",
    participants: [
      {
        name: "",
        email: "",
        registrationNo: "",
        phoneNo: "",
        section: "",
        year: "",
      },
    ],
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({
    topic: "",
    participants: {},
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "topic") {
      setFormData({ ...formData, topic: value });
      setErrors((prev) => ({ ...prev, topic: "" }));
    } else {
      setFormData({
        ...formData,
        participants: [{ ...formData.participants[0], [name]: value }],
      });
      // Clear error for this participant field
      setErrors((prev) => ({
        ...prev,
        participants: {
          ...prev.participants,
          0: {
            ...prev.participants[0],
            [name]: "",
          },
        },
      }));
    }
  };

  const clearForm = () => {
    setFormData({
      eventName: "Poster Presentation",
      topic: "",
      participants: [
        {
          name: "",
          email: "",
          registrationNo: "",
          phoneNo: "",
          section: "",
          year: "",
        },
      ],
    });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      topic: "",
      participants: {
        0: {},
      },
    };

    // Validate topic
    if (!formData.topic.trim()) {
      newErrors.topic = "Topic is required";
    }

    // Validate participant
    const participant = formData.participants[0];

    const nameValidation = validationRules.validateName(participant.name);
    if (!nameValidation.valid) newErrors.participants[0].name = nameValidation.error;

    const emailValidation = validationRules.validateEmail(participant.email);
    if (!emailValidation.valid) newErrors.participants[0].email = emailValidation.error;

    const regValidation = validationRules.validateRegistrationNo(participant.registrationNo);
    if (!regValidation.valid) newErrors.participants[0].registrationNo = regValidation.error;

    const phoneValidation = validationRules.validatePhoneNo(participant.phoneNo);
    if (!phoneValidation.valid) newErrors.participants[0].phoneNo = phoneValidation.error;

    if (!participant.section.trim()) {
      newErrors.participants[0].section = "Section is required";
    }

    const yearValidation = validationRules.validateYear(participant.year);
    if (!yearValidation.valid) newErrors.participants[0].year = yearValidation.error;

    setErrors(newErrors);
    return Object.keys(newErrors).filter((key) => {
      if (key === "participants") {
        return Object.keys(newErrors.participants[0]).length > 0;
      }
      return newErrors[key as keyof FormErrors];
    }).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please correct the errors above");
      return;
    }

    setLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
      const response = await axios.post(
        `${apiUrl}/api/register`,
        {
          eventName: "Poster Presentation",
          participants: formData.participants,
          topic: formData.topic,
        }
      );
      toast.success("Registration successful!");
      clearForm();
      console.log("Registration successful:", response.data);
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

  const sectionsForYear: Record<number, string[]> = {
    2: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
    ],
    3: ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-lvh rounded-none p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-100 dark:text-neutral-200">
        Participate in this
      </h2>
      <Toaster position="top-center" />
      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.participants[0].name}
            onChange={handleChange}
          />
          {errors.participants[0]?.name && (
            <p className="text-red-400 text-xs mt-1">{errors.participants[0].name}</p>
          )}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.participants[0].email}
            onChange={handleChange}
          />
          {errors.participants[0]?.email && (
            <p className="text-red-400 text-xs mt-1">{errors.participants[0].email}</p>
          )}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="registrationNo">Registration Number</Label>
          <Input
            id="registrationNo"
            name="registrationNo"
            placeholder="Enter your registration number"
            value={formData.participants[0].registrationNo}
            onChange={handleChange}
          />
          {errors.participants[0]?.registrationNo && (
            <p className="text-red-400 text-xs mt-1">{errors.participants[0].registrationNo}</p>
          )}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="phoneNo">Phone Number</Label>
          <Input
            id="phoneNo"
            name="phoneNo"
            placeholder="Enter your phone number"
            value={formData.participants[0].phoneNo}
            onChange={handleChange}
          />
          {errors.participants[0]?.phoneNo && (
            <p className="text-red-400 text-xs mt-1">{errors.participants[0].phoneNo}</p>
          )}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="year">Year</Label>
          <select
            id="year"
            name="year"
            value={formData.participants[0].year}
            onChange={handleChange}
            className="w-full p-2 rounded-md border bg-neutral-900 text-white"
          >
            <option value="">Select Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
          </select>
          {errors.participants[0]?.year && (
            <p className="text-red-400 text-xs mt-1">{errors.participants[0].year}</p>
          )}
        </LabelInputContainer>

        {formData.participants[0].year &&
          sectionsForYear[
            +formData.participants[0].year as keyof typeof sectionsForYear
          ] && (
            <LabelInputContainer className="mb-4">
              <Label htmlFor="section">Section</Label>
              <select
                id="section"
                name="section"
                value={formData.participants[0].section}
                onChange={handleChange}
                className="w-full p-2 rounded-md border bg-neutral-900 text-white"
              >
                <option value="">Select Section</option>
                {sectionsForYear[
                  +formData.participants[0].year as keyof typeof sectionsForYear
                ].map((sec) => (
                  <option key={sec} value={sec}>
                    {sec}
                  </option>
                ))}
              </select>
              {errors.participants[0]?.section && (
                <p className="text-red-400 text-xs mt-1">{errors.participants[0].section}</p>
              )}
            </LabelInputContainer>
          )}

        <LabelInputContainer className="mb-4">
          <Label htmlFor="topic">Poster Topic</Label>
          <Input
            id="topic"
            name="topic"
            placeholder="Enter your poster topic"
            value={formData.topic}
            onChange={handleChange}
          />
          {errors.topic && (
            <p className="text-red-400 text-xs mt-1">{errors.topic}</p>
          )}
        </LabelInputContainer>

        <button
          className="relative h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white flex justify-center items-center"
          type="submit"
          disabled={loading}
        >
          {loading ? <ClipLoader color="#fff" size={20} /> : "Register →"}
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}

// Bottom gradient effect for button
const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
);

// Wrapper for label and input
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
