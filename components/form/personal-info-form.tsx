"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PersonalInfo, NIGERIA_STATES } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { AnimatedTypingInput } from "@/components/ui/animated-typing-input";

interface PersonalInfoFormProps {
  onSubmit: (info: PersonalInfo) => void;
}

const inputIcons = {
  fullName: (
    <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  age: (
    <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  birthday: (
    <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  phone: (
    <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  state: (
    <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  guardian: (
    <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
};

export function PersonalInfoForm({ onSubmit }: PersonalInfoFormProps) {
  const [formData, setFormData] = useState<PersonalInfo>({
    fullName: "",
    age: 0,
    phoneNumber: "",
    birthday: "",
    stateOfBirth: "",
    parentGuardianPhone: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof PersonalInfo, string>>>({});

  const handleChange = (field: keyof PersonalInfo, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof PersonalInfo, string>> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.age || formData.age < 10 || formData.age > 30)
      newErrors.age = "Please enter a valid age (10-30)";
    if (!formData.phoneNumber.trim() || formData.phoneNumber.length < 8)
      newErrors.phoneNumber = "Valid phone number is required";
    if (!formData.birthday) newErrors.birthday = "Birthday is required";
    if (!formData.stateOfBirth) newErrors.stateOfBirth = "Please select your state of birth";
    if (!formData.parentGuardianPhone.trim() || formData.parentGuardianPhone.length < 8)
      newErrors.parentGuardianPhone = "Parent/Guardian phone number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      sessionStorage.setItem("hop_personal_info", JSON.stringify(formData));
      onSubmit(formData);
    }
  };

  const renderField = (
    field: keyof PersonalInfo,
    label: string,
    type: string,
    placeholder: string,
    icon: React.ReactNode
  ) => {
    const value = formData[field]?.toString() || "";
    const isSelect = type === "select";

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-1.5"
      >
        <label className="block text-sm font-medium text-white/60">{label}</label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
            {icon}
          </div>
          {isSelect ? (
            <select
              value={value}
              onChange={(e) => handleChange(field, e.target.value)}
              className={`w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white/5 border ${
                errors[field] ? "border-red-400" : "border-white/10"
              } text-white backdrop-blur-sm focus:outline-none focus:border-green-400/50 focus:ring-2 focus:ring-green-400/20 transition-all duration-300 appearance-none`}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23ffffff'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 1rem center",
                backgroundSize: "1.25rem",
              }}
            >
              <option value="" className="bg-gray-900">Select your state</option>
              {NIGERIA_STATES.map((state) => (
                <option key={state} value={state} className="bg-gray-900">{state}</option>
              ))}
            </select>
          ) : type === "number" || type === "date" ? (
            <input
              type={type}
              value={value}
              onChange={(e) => handleChange(field, type === "number" ? parseInt(e.target.value) || 0 : e.target.value)}
              placeholder={placeholder}
              min={type === "number" ? 10 : undefined}
              max={type === "number" ? 30 : undefined}
              className={`w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/5 border ${
                errors[field] ? "border-red-400" : "border-white/10"
              } text-white placeholder-white/25 backdrop-blur-sm focus:outline-none focus:border-green-400/50 focus:ring-2 focus:ring-green-400/20 transition-all duration-300`}
              style={type === "date" ? { colorScheme: "dark" } : undefined}
            />
          ) : (
            <div className="relative">
              <AnimatedTypingInput
                type={type}
                value={value}
                onChange={(e) => handleChange(field, (e.target as HTMLInputElement).value)}
                placeholder={placeholder}
                className="pl-12"
              />
            </div>
          )}
        </div>
        {errors[field] && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-xs mt-1 flex items-center gap-1"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors[field]}
          </motion.p>
        )}
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 md:p-12 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring", bounce: 0.6 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 mb-6 shadow-lg shadow-green-500/25"
          >
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-2xl md:text-3xl font-bold text-white mb-2"
          >
            Tell Us About Yourself
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-white/50"
          >
            We just need a few details before we begin
          </motion.p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {renderField("fullName", "Full Name", "text", "Enter your full name", inputIcons.fullName)}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {renderField("age", "Age", "number", "Your age", inputIcons.age)}
            {renderField("birthday", "Birthday", "date", "", inputIcons.birthday)}
          </div>
          {renderField("phoneNumber", "Phone Number", "tel", "e.g. 080 XXX XXXX", inputIcons.phone)}
          {renderField("stateOfBirth", "State of Birth", "select", "", inputIcons.state)}
          {renderField(
            "parentGuardianPhone",
            "Parent or Guardian's Phone Number",
            "tel",
            "Parent/Guardian's phone number",
            inputIcons.guardian
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="pt-6"
          >
            <Button
              type="submit"
              variant="gradient"
              size="lg"
              className="w-full text-lg py-4 rounded-2xl"
            >
              Begin Questionnaire
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
}
