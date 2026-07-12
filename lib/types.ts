export type QuestionType =
  | "text"       // short text input
  | "textarea"   // long text area
  | "radio"      // radio buttons
  | "radio-text" // radio buttons + optional custom text
  | "tel"        // phone number
  | "number"     // number input
  | "date"       // date picker
  | "select";    // dropdown select

export interface PersonalInfo {
  fullName: string;
  age: number;
  phoneNumber: string;
  birthday: string;
  stateOfBirth: string;
  parentGuardianPhone: string;
}

export interface Question {
  id: number;
  text: string;
  type: QuestionType;
  options?: string[];
  placeholder?: string;
  required?: boolean;
}

export interface QuestionnaireResponse {
  id?: string;
  created_at?: string;
  personal_info: PersonalInfo;
  answers: Record<number, string>;
}

export type AppStage = "landing" | "info" | "questionnaire" | "submitting" | "thank-you";

export const NIGERIA_STATES = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT (Abuja)",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];
