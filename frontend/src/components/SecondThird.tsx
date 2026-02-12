import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import axios from "axios";

export default function SecondThird() {
  const [formData, setFormData] = useState(
    Array(5).fill({
      name: "",
      email: "",
      registrationNo: "",
      phoneNo: "",
      year: "" as "" | keyof typeof sectionsForYear,
      section: "",
    })
  );

  const [loading, setLoading] = useState(false);

  const handleChange = (
    index: number,
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updatedData = [...formData];
    updatedData[index] = { ...updatedData[index], [name]: value };
    setFormData(updatedData);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (formData.some((member) => Object.values(member).some((val) => !val))) {
      toast.error("All fields are required for every member.");
      return;
    }

    try {
      setLoading(true);
      await axios.post("https://vcode-m6ni.onrender.com/api/register", {
        eventName: "Hackathon",
        participants: formData,
      });

      toast.success("Registration successful!");
      setFormData(
        Array(5).fill({
          name: "",
          email: "",
          registrationNo: "",
          phoneNo: "",
          year: "",
          section: "",
        })
      );
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

  const sectionsForYear = {
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
      "T",
      "U",
      "V",
    ],
    3: ["A",
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
      "S"],
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-lvh rounded-none p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <Toaster />
      <h2 className="text-xl font-bold text-neutral-100 dark:text-neutral-200">
        Register All Three Team Members
      </h2>

      <form className="my-8" onSubmit={handleSubmit}>
        {formData.map((member, index) => (
          <div
            key={index}
            className="mb-8 p-4 rounded-md border border-blue-400 text-white"
          >
            <h3 className="text-lg font-semibold mb-4">Member {index + 1}</h3>

            {["name", "email", "registrationNo", "phoneNo"].map((field) => (
              <LabelInputContainer className="mb-4" key={field}>
                <Label htmlFor={`${field}-${index}`}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </Label>
                <Input
                  id={`${field}-${index}`}
                  name={field}
                  placeholder={`Enter your ${field}`}
                  value={member[field]}
                  onChange={(e) => handleChange(index, e)}
                />
              </LabelInputContainer>
            ))}

            <LabelInputContainer className="mb-4">
              <Label htmlFor={`year-${index}`}>Year</Label>
              <select
                id={`year-${index}`}
                name="year"
                value={member.year}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-2 rounded-md border bg-neutral-900 text-white"
              >
                <option value="">Select Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
              </select>
            </LabelInputContainer>

            {member.year &&
              sectionsForYear[member.year as keyof typeof sectionsForYear] && (
                <LabelInputContainer className="mb-4">
                  <Label htmlFor={`section-${index}`}>Section</Label>
                  <select
                    id={`section-${index}`}
                    name="section"
                    value={member.section}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full p-2 rounded-md border bg-neutral-900 text-white"
                  >
                    <option value="">Select Section</option>
                    {sectionsForYear[
                      member.year as keyof typeof sectionsForYear
                    ].map((sec) => (
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
          className="relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 text-white cursor-pointer"
          disabled={loading}
        >
          {loading ? (
            <ClipLoader color="#ffffff" size={20} />
          ) : (
            "Submit Team Details →"
          )}
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}

const LabelInputContainer: React.FC<
  React.PropsWithChildren<{ className?: string }>
> = ({ children, className }) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};
