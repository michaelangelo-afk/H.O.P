"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PersonalInfo, NIGERIA_STATES } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface PersonalInfoFormProps {
  onSubmit: (info: PersonalInfo) => void;
}

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
    // Clear error when field is filled
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
      // Store in sessionStorage for /questionnaire page fallback
      sessionStorage.setItem("hop_personal_info", JSON.stringify(formData));
      onSubmit(formData);
    }
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
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 mb-6"
          >
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </motion.div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Tell Us About Yourself
          </h2>
          <p className="text-white/50">
            We just need a few details before we begin
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/70">Full Name</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              placeholder="Enter your full name"
              className={`w-full px-4 py-3.5 rounded-xl bg-white/5 border ${
                errors.fullName ? "border-red-400" : "border-white/10"
              } text-white placeholder-white/30 backdrop-blur-sm focus:outline-none focus:border-green-400/50 focus:ring-1 focus:ring-green-400/30 transition-all duration-200`}
            />
            {errors.fullName && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-xs">
                {errors.fullName}
              </motion.p>
            )}
          </div>

          {/* Age & Birthday row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/70">Age</label>
              <input
                type="number"
                min={10}
                max={30}
                value={formData.age || ""}
                onChange={(e) => handleChange("age", parseInt(e.target.value) || 0)}
                placeholder="Your age"
                className={`w-full px-4 py-3.5 rounded-xl bg-white/5 border ${
                  errors.age ? "border-red-400" : "border-white/10"
                } text-white placeholder-white/30 backdrop-blur-sm focus:outline-none focus:border-green-400/50 focus:ring-1 focus:ring-green-400/30 transition-all duration-200`}
              />
              {errors.age && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-xs">
                  {errors.age}
                </motion.p>
              )}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/70">Birthday</label>
              <input
                type="date"
                value={formData.birthday}
                onChange={(e) => handleChange("birthday", e.target.value)}
                className={`w-full px-4 py-3.5 rounded-xl bg-white/5 border ${
                  errors.birthday ? "border-red-400" : "border-white/10"
                } text-white [color-scheme:dark] backdrop-blur-sm focus:outline-none focus:border-green-400/50 focus:ring-1 focus:ring-green-400/30 transition-all duration-200`}
              />
              {errors.birthday && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-xs">
                  {errors.birthday}
                </motion.p>
              )}
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/70">Phone Number</label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
              placeholder="e.g. 080 XXX XXXX"
              className={`w-full px-4 py-3.5 rounded-xl bg-white/5 border ${
                errors.phoneNumber ? "border-red-400" : "border-white/10"
              } text-white placeholder-white/30 backdrop-blur-sm focus:outline-none focus:border-green-400/50 focus:ring-1 focus:ring-green-400/30 transition-all duration-200`}
            />
            {errors.phoneNumber && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-xs">
                {errors.phoneNumber}
              </motion.p>
            )}
          </div>

          {/* State of Birth */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/70">State of Birth</label>
            <select
              value={formData.stateOfBirth}
              onChange={(e) => handleChange("stateOfBirth", e.target.value)}
              className={`w-full px-4 py-3.5 rounded-xl bg-white/5 border ${
                errors.stateOfBirth ? "border-red-400" : "border-white/10"
              } text-white backdrop-blur-sm focus:outline-none focus:border-green-400/50 focus:ring-1 focus:ring-green-400/30 transition-all duration-200 appearance-none`}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23ffffff'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 1rem center",
                backgroundSize: "1.5rem",
              }}
            >
              <option value="" className="bg-gray-900">Select your state</option>
              {NIGERIA_STATES.map((state) => (
                <option key={state} value={state} className="bg-gray-900">
                  {state}
                </option>
              ))}
            </select>
            {errors.stateOfBirth && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-xs">
                {errors.stateOfBirth}
              </motion.p>
            )}
          </div>

          {/* Parent/Guardian Phone */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/70">Parent or Guardian&apos;s Phone Number</label>
            <input
              type="tel"
              value={formData.parentGuardianPhone}
              onChange={(e) => handleChange("parentGuardianPhone", e.target.value)}
              placeholder="Parent/Guardian's phone number"
              className={`w-full px-4 py-3.5 rounded-xl bg-white/5 border ${
                errors.parentGuardianPhone ? "border-red-400" : "border-white/10"
              } text-white placeholder-white/30 backdrop-blur-sm focus:outline-none focus:border-green-400/50 focus:ring-1 focus:ring-green-400/30 transition-all duration-200`}
            />
            {errors.parentGuardianPhone && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-xs">
                {errors.parentGuardianPhone}
              </motion.p>
            )}
          </div>

          {/* Submit */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="pt-4"
          >
            <Button
              type="submit"
              variant="gradient"
              size="lg"
              className="w-full text-lg py-4 rounded-xl"
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
