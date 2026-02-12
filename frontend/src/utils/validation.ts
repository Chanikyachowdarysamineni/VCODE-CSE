// Comprehensive form validation utilities
export const validationRules = {
  // Name validation
  validateName: (name: string): { valid: boolean; error: string } => {
    if (!name || !name.trim()) {
      return { valid: false, error: "Name is required" };
    }
    if (name.trim().length < 2) {
      return { valid: false, error: "Name must be at least 2 characters" };
    }
    if (name.trim().length > 50) {
      return { valid: false, error: "Name cannot exceed 50 characters" };
    }
    if (!/^[a-zA-Z\s'-]+$/.test(name.trim())) {
      return { valid: false, error: "Name can only contain letters, spaces, hyphens, and apostrophes" };
    }
    return { valid: true, error: "" };
  },

  // Email validation
  validateEmail: (email: string): { valid: boolean; error: string } => {
    if (!email || !email.trim()) {
      return { valid: false, error: "Email is required" };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return { valid: false, error: "Please enter a valid email address" };
    }
    return { valid: true, error: "" };
  },

  // Phone number validation
  validatePhoneNo: (phoneNo: string): { valid: boolean; error: string } => {
    if (!phoneNo || !phoneNo.trim()) {
      return { valid: false, error: "Phone number is required" };
    }
    if (!/^\d+$/.test(phoneNo.trim())) {
      return { valid: false, error: "Phone number must contain only digits" };
    }
    if (phoneNo.trim().length !== 10) {
      return { valid: false, error: "Phone number must be exactly 10 digits" };
    }
    return { valid: true, error: "" };
  },

  // Registration number validation
  validateRegistrationNo: (regNo: string): { valid: boolean; error: string } => {
    if (!regNo || !regNo.trim()) {
      return { valid: false, error: "Registration number is required" };
    }
    // Format: dddlldd(d/l)dd - 3 digits, 2 letters, 2 digits, 1 digit/letter, 2 digits
    const regnoRegex = /^[0-9]{3}[a-zA-Z]{2}[0-9]{2}[0-9a-zA-Z][0-9]{2}$/;
    if (!regnoRegex.test(regNo.trim())) {
      return { valid: false, error: "Registration number format should be: 3 digits, 2 letters, 2 digits, 1 digit/letter, 2 digits (e.g., 123AB45C67)" };
    }
    return { valid: true, error: "" };
  },

  // Year validation
  validateYear: (year: string): { valid: boolean; error: string } => {
    if (!year) {
      return { valid: false, error: "Year is required" };
    }
    const validYears = ["1", "2", "3", "4"];
    if (!validYears.includes(year)) {
      return { valid: false, error: "Please select a valid year" };
    }
    return { valid: true, error: "" };
  },

  // Section validation
  validateSection: (section: string): { valid: boolean; error: string } => {
    if (!section) {
      return { valid: false, error: "Section is required" };
    }
    return { valid: true, error: "" };
  },

  // Team name validation
  validateTeamName: (teamName: string): { valid: boolean; error: string } => {
    if (!teamName || !teamName.trim()) {
      return { valid: false, error: "Team name is required" };
    }
    if (teamName.trim().length < 2) {
      return { valid: false, error: "Team name must be at least 2 characters" };
    }
    if (teamName.trim().length > 50) {
      return { valid: false, error: "Team name cannot exceed 50 characters" };
    }
    return { valid: true, error: "" };
  },

  // Generic field validation
  validateRequired: (value: string, fieldName: string): { valid: boolean; error: string } => {
    if (!value || !value.trim()) {
      return { valid: false, error: `${fieldName} is required` };
    }
    if (value.trim().length < 2) {
      return { valid: false, error: `${fieldName} must be at least 2 characters` };
    }
    return { valid: true, error: "" };
  },

  // GitHub/LinkedIn URL validation (optional)
  validateUrl: (url: string): { valid: boolean; error: string } => {
    if (!url) {
      return { valid: true, error: "" }; // Optional field
    }
    try {
      new URL(url);
      return { valid: true, error: "" };
    } catch {
      return { valid: false, error: "Please enter a valid URL" };
    }
  },

  // Problem statement validation
  validateProblemStatement: (text: string): { valid: boolean; error: string } => {
    if (!text || !text.trim()) {
      return { valid: false, error: "Problem statement is required" };
    }
    if (text.trim().length < 10) {
      return { valid: false, error: "Problem statement must be at least 10 characters" };
    }
    if (text.trim().length > 500) {
      return { valid: false, error: "Problem statement cannot exceed 500 characters" };
    }
    return { valid: true, error: "" };
  },

  // Image/File validation
  validateImage: (file: File | null): { valid: boolean; error: string } => {
    if (!file) {
      return { valid: false, error: "Image is required" };
    }
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      return { valid: false, error: "Only JPEG, PNG, GIF, and WebP images are allowed" };
    }
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return { valid: false, error: "Image size must not exceed 5MB" };
    }
    return { valid: true, error: "" };
  },
};

/**
 * Validate a participant object
 */
export const validateParticipant = (participant: any): { valid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  // Validate name
  const nameValidation = validationRules.validateName(participant.name);
  if (!nameValidation.valid) errors.name = nameValidation.error;

  // Validate email
  const emailValidation = validationRules.validateEmail(participant.email);
  if (!emailValidation.valid) errors.email = emailValidation.error;

  // Validate phone number
  const phoneValidation = validationRules.validatePhoneNo(participant.phoneNo);
  if (!phoneValidation.valid) errors.phoneNo = phoneValidation.error;

  // Validate registration number
  const regNoValidation = validationRules.validateRegistrationNo(participant.registrationNo);
  if (!regNoValidation.valid) errors.registrationNo = regNoValidation.error;

  // Validate year if present
  if (participant.year) {
    const yearValidation = validationRules.validateYear(participant.year);
    if (!yearValidation.valid) errors.year = yearValidation.error;
  }

  // Validate section if present
  if (participant.section) {
    const sectionValidation = validationRules.validateSection(participant.section);
    if (!sectionValidation.valid) errors.section = sectionValidation.error;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};
