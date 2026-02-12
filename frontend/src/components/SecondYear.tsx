import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import axios from "axios";

export default function SecondYear() {
  const [formData, setFormData] = useState([
    { name: "", email: "", registrationNo: "", phoneNo: "", year: "2", section: "" },
    { name: "", email: "", registrationNo: "", phoneNo: "", year: "2", section: "" },
  ]);

  const [loading, setLoading] = useState(false);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = [...prevData];
      updatedData[index][name as keyof typeof updatedData[0]] = value;
      return updatedData;
    });
  };

  interface Member {
    name: string;
    email: string;
    registrationNo: string;
    phoneNo: string;
    year: string;
    section: string;
  }

  interface FormData {
    eventName: string;
    participants: Member[];
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.some((member) => Object.values(member).some((value) => !value))) {
      toast.error("All fields are required for every member.");
      return;
    }

    try {
      setLoading(true);
      const payload: FormData = {
        eventName: "Hackathon",
        participants: formData,
      };
      await axios.post("https://vcode-m6ni.onrender.com/api/register", payload);

      toast.success("Registration successful!");
      setFormData([
        { name: "", email: "", registrationNo: "", phoneNo: "", year: "2", section: "" },
        { name: "", email: "", registrationNo: "", phoneNo: "", year: "2", section: "" },
      ]);
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
    2: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S","T","U","V"],
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-lg rounded-none p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <Toaster />
      <h2 className="text-xl font-bold text-neutral-100 dark:text-neutral-200">
        Register Your Team Members
      </h2>

      <form className="my-8" onSubmit={handleSubmit}>
        {formData.map((member, index) => (
          <div key={index} className="mb-8 p-4 rounded-md border border-blue-400 text-white">
            <h3 className="text-lg font-semibold mb-4">Member {index + 1}</h3>

            <LabelInputContainer>
              <Label htmlFor={`name-${index}`}>Name</Label>
              <Input
                id={`name-${index}`}
                name="name"
                placeholder="Enter your name"
                value={member.name}
                onChange={(e) => handleChange(index, e)}
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor={`email-${index}`}>Email Address</Label>
              <Input
                id={`email-${index}`}
                name="email"
                type="email"
                placeholder="Enter your email"
                value={member.email}
                onChange={(e) => handleChange(index, e)}
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor={`registrationNo-${index}`}>Registration Number</Label>
              <Input
                id={`registrationNo-${index}`}
                name="registrationNo"
                placeholder="Enter your registration number"
                value={member.registrationNo}
                onChange={(e) => handleChange(index, e)}
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor={`phoneNo-${index}`}>Phone Number</Label>
              <Input
                id={`phoneNo-${index}`}
                name="phoneNo"
                placeholder="Enter your phone number"
                value={member.phoneNo}
                onChange={(e) => handleChange(index, e)}
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor={`section-${index}`}>Section</Label>
              <select
                id={`section-${index}`}
                name="section"
                value={member.section}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-2 rounded-md border bg-neutral-900 text-white"
              >
                <option value="">Select Section</option>
                {sectionsForYear[2].map((sec) => (
                  <option key={sec} value={sec}>{sec}</option>
                ))}
              </select>
            </LabelInputContainer>
          </div>
        ))}

        <button
          type="submit"
          className="relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 text-white cursor-pointer"
          disabled={loading}
        >
          {loading ? <ClipLoader color="#ffffff" size={20} /> : "Submit Team Details →"}
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}

const LabelInputContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="flex w-full flex-col space-y-2">{children}</div>;
};

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 blur-sm transition duration-500" />
    </>
  );
};
