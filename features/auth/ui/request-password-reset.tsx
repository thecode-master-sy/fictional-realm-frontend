"use client";
import { RequestPasswordResetForm } from "./request-password-reset-form";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { ConfirmResetPasswordEmail } from "./confirm-reset-email";

type Step = "request-reset" | "check-email";

export const RequestPasswordResetComponent = () => {
  const [step, setStep] = useState<Step>("request-reset");

  return (
    <AnimatePresence mode="wait">
      {step == "request-reset" ? (
        <RequestPasswordResetForm setStep={setStep} key="request-reset" />
      ) : (
        <ConfirmResetPasswordEmail setStep={setStep} key="check-email" />
      )}
    </AnimatePresence>
  );
};
