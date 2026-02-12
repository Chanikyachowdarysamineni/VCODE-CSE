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
  gender: string;
  section: string;
  sportName: string;
  year: string;
  department: string;
  teamName: string;
  role: string;
  phoneNo: string;
};

export default function SportsForm() {
  interface FormErrors {
    name: string;
    email: string;
    registrationNo: string;
    gender: string;
    section: string;
    sportName: string;
    year: string;
    department: string;
    teamName: string;
    role: string;
    phoneNo: string;
  }

  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    registrationNo: "",
    email: "",
    gender: "",
    section: "",
    sportName: "",
    year: "",
    department: "",
    teamName: "",
    role: "",
    phoneNo: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    email: "",
    registrationNo: "",
    gender: "",
    section: "",
    sportName: "",
    year: "",
    department: "",
    teamName: "",
    role: "",
    phoneNo: "",
  });

  const getSectionsForYear = (year: string) => {
    return SECTIONS_BY_YEAR[year as keyof typeof SECTIONS_BY_YEAR] || [];
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Auto-map gender to section for Men/Women
    if (name === "gender" && (value === "Male" || value === "Female")) {
      setFormData({ 
        ...formData, 
        [name]: value, 
        section: value === "Male" ? "Men" : "Women"
      });
      setErrors((prev) => ({ ...prev, gender: "", section: "" }));
    } else if (name === "section" && value === "Faculty") {
      // Clear year field when Faculty is selected
      setFormData({ 
        ...formData, 
        [name]: value, 
        year: "",
        gender: "" // Clear gender as Faculty doesn't need it
      });
      setErrors((prev) => ({ ...prev, section: "", year: "", gender: "" }));
    } else {
      setFormData({ ...formData, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      name: "",
      email: "",
      registrationNo: "",
      gender: "",
      section: "",
      sportName: "",
      year: "",
      department: "",
      teamName: "",
      role: "",
      phoneNo: "",
    };

    // Validate name
    const nameValidation = validationRules.validateName(formData.name);
    if (!nameValidation.valid) newErrors.name = nameValidation.error;

    // Validate email
    const emailValidation = validationRules.validateEmail(formData.email);
    if (!emailValidation.valid) newErrors.email = emailValidation.error;

    // Validate registration number
    const regValidation = validationRules.validateRegistrationNo(formData.registrationNo);
    if (!regValidation.valid) newErrors.registrationNo = regValidation.error;

    // Validate phone number
    const phoneValidation = validationRules.validatePhoneNo(formData.phoneNo);
    if (!phoneValidation.valid) newErrors.phoneNo = phoneValidation.error;

    // Validate section
    if (!formData.section) {
      newErrors.section = "Section is required";
    }

    // Validate sport name
    if (!formData.sportName.trim()) {
      newErrors.sportName = "Sport name is required";
    }

    // Validate department
    if (!formData.department.trim()) {
      newErrors.department = "Department is required";
    }

    // Validate team name
    if (!formData.teamName.trim()) {
      newErrors.teamName = "Team name is required";
    }

    // Validate role
    if (!formData.role.trim()) {
      newErrors.role = "Role is required";
    }

    // Validate year only for students (Men/Women sections)
    if (formData.section === "Men" || formData.section === "Women") {
      const yearValidation = validationRules.validateYear(formData.year);
      if (!yearValidation.valid) newErrors.year = yearValidation.error;

      // Validate gender for students
      if (!formData.gender) {
        newErrors.gender = "Gender is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).filter((key) => newErrors[key as keyof FormErrors]).length === 0;
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
      await axios.post(`${apiUrl}/api/register`, {
        eventName: "Sports",
        participants: [formData],
      });

      toast.success("Sports registration successful!");
      setFormData({
        name: "",
        registrationNo: "",
        email: "",
        gender: "",
        section: "",
        sportName: "",
        year: "",
        department: "",
        teamName: "",
        role: "",
        phoneNo: "",
      });

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

  const sports = [
    "Cricket", "Football", "Volleyball", "Basketball", "Badminton", 
    "Athletics", "Table Tennis", "Tennis", "Kabaddi", "Hockey"
  ];

  const departments = [
    "Computer Science Engineering", "Information Technology", 
    "Electronics & Communication Engineering", "Electrical & Electronics Engineering",
    "Mechanical Engineering", "Civil Engineering", "Chemical Engineering",
    "Biotechnology", "MBA", "MCA", "Faculty"
  ];

  const LabelInputContainer = ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    return (
      <div className={cn("flex flex-col space-y-2 w-full", className)}>
        {children}
      </div>
    );
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-4xl rounded-none p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <Toaster />
      <h2 className="text-xl font-bold text-neutral-100 dark:text-neutral-200 mb-2">
        Sports Event Registration
      </h2>
      <p className="text-sm text-neutral-400 mb-6">
        Register for sports events. Faculty members and students have different registration requirements.
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <LabelInputContainer className="mb-4">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter your full name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">{errors.name}</p>
            )}
          </LabelInputContainer>

          {/* Email */}
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email ID *</Label>
            <Input
              id="email"
              name="email"
              placeholder="Enter your email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email}</p>
            )}
          </LabelInputContainer>

          {/* Registration Number */}
          <LabelInputContainer className="mb-4">
            <Label htmlFor="registrationNo">Registration Number *</Label>
            <Input
              id="registrationNo"
              name="registrationNo"
              placeholder="Enter your registration number"
              type="text"
              value={formData.registrationNo}
              onChange={handleChange}
              required
            />
            {errors.registrationNo && (
              <p className="text-red-400 text-xs mt-1">{errors.registrationNo}</p>
            )}
          </LabelInputContainer>

          {/* Phone Number */}
          <LabelInputContainer className="mb-4">
            <Label htmlFor="phoneNo">Phone Number *</Label>
            <Input
              id="phoneNo"
              name="phoneNo"
              placeholder="Enter your phone number"
              type="tel"
              value={formData.phoneNo}
              onChange={handleChange}
              required
            />
            {errors.phoneNo && (
              <p className="text-red-400 text-xs mt-1">{errors.phoneNo}</p>
            )}
          </LabelInputContainer>

          {/* Section */}
          <LabelInputContainer className="mb-4">
            <Label htmlFor="section">Section *</Label>
            <select
              id="section"
              name="section"
              value={formData.section}
              onChange={handleChange}
              className="w-full p-2 rounded-md border bg-neutral-900 text-white dark:border-neutral-700"
              required
            >
              <option value="">Select Section</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Faculty">Faculty</option>
            </select>
            {errors.section && (
              <p className="text-red-400 text-xs mt-1">{errors.section}</p>
            )}
          </LabelInputContainer>

          {/* Gender - Only for students */}
          {(formData.section === "Men" || formData.section === "Women") && (
            <LabelInputContainer className="mb-4">
              <Label htmlFor="gender">Gender *</Label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-2 rounded-md border bg-neutral-900 text-white dark:border-neutral-700"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && (
                <p className="text-red-400 text-xs mt-1">{errors.gender}</p>
              )}
            </LabelInputContainer>
          )}

          {/* Sport Name */}
          <LabelInputContainer className="mb-4">
            <Label htmlFor="sportName">Sport Name *</Label>
            <select
              id="sportName"
              name="sportName"
              value={formData.sportName}
              onChange={handleChange}
              className="w-full p-2 rounded-md border bg-neutral-900 text-white dark:border-neutral-700"
              required
            >
              <option value="">Select Sport</option>
              {sports.map((sport) => (
                <option key={sport} value={sport}>{sport}</option>
              ))}
            </select>
            {errors.sportName && (
              <p className="text-red-400 text-xs mt-1">{errors.sportName}</p>
            )}
          </LabelInputContainer>

          {/* Year - Only for students */}
          {(formData.section === "Men" || formData.section === "Women") && (
            <LabelInputContainer className="mb-4">
              <Label htmlFor="year">Academic Year *</Label>
              <select
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full p-2 rounded-md border bg-neutral-900 text-white dark:border-neutral-700"
                required
              >
                <option value="">Select Year (Required: 2nd or 3rd)</option>
                <option value="2nd">2nd Year</option>
                <option value="3rd">3rd Year</option>
              </select>
              {errors.year && (
                <p className="text-red-400 text-xs mt-1">{errors.year}</p>
              )}
            </LabelInputContainer>
          )}

          {/* Academic Section - Only for students */}
          {(formData.section === "Men" || formData.section === "Women") && formData.year && getSectionsForYear(formData.year).length > 0 && (
            <LabelInputContainer className="mb-4">
              <Label htmlFor="academicSection">Class Section (A-Z) *</Label>
              <select
                id="academicSection"
                name="academicSection"
                value={formData.registrationNo} // reuse registrationNo to store section temporarily
                onChange={(e) => {
                  setFormData({ ...formData, registrationNo: e.target.value });
                  setErrors((prev) => ({ ...prev, registrationNo: "" }));
                }}
                className="w-full p-2 rounded-md border bg-neutral-900 text-white dark:border-neutral-700"
                required
              >
                <option value="">Select Class Section</option>
                {getSectionsForYear(formData.year).map((sec) => (
                  <option key={sec} value={sec}>{sec}</option>
                ))}
              </select>
              {errors.registrationNo && (
                <p className="text-red-400 text-xs mt-1">{errors.registrationNo}</p>
              )}
            </LabelInputContainer>
          )}

          {/* Department */}
          <LabelInputContainer className="mb-4">
            <Label htmlFor="department">Department *</Label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full p-2 rounded-md border bg-neutral-900 text-white dark:border-neutral-700"
              required
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            {errors.department && (
              <p className="text-red-400 text-xs mt-1">{errors.department}</p>
            )}
          </LabelInputContainer>

          {/* Team Name */}
          <LabelInputContainer className="mb-4">
            <Label htmlFor="teamName">Team Name *</Label>
            <Input
              id="teamName"
              name="teamName"
              placeholder="Enter team name"
              type="text"
              value={formData.teamName}
              onChange={handleChange}
              required
            />
            {errors.teamName && (
              <p className="text-red-400 text-xs mt-1">{errors.teamName}</p>
            )}
          </LabelInputContainer>

          {/* Role in Team */}
          <LabelInputContainer className="mb-4">
            <Label htmlFor="role">Role in Team *</Label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 rounded-md border bg-neutral-900 text-white dark:border-neutral-700"
              required
            >
              <option value="">Select Role</option>
              <option value="Player">Player</option>
              <option value="Captain">Captain</option>
              <option value="Substitute">Substitute</option>
            </select>
            {errors.role && (
              <p className="text-red-400 text-xs mt-1">{errors.role}</p>
            )}
          </LabelInputContainer>
        </div>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] mt-6"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <ClipLoader color="#ffffff" size={20} />
          ) : (
            <>
              Register for Sports &rarr;
              <BottomGradient />
            </>
          )}
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
    </>
  );
};