"use client";
import { SignUpForm } from "./sign-up-form";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { ConfirmYourEmailComponent } from "./confirm-your-email";

type Step = "sign-up" | "confirm-email";

export const SignUpComponent = () => {
  const [step, setStep] = useState<Step>("sign-up");

  return (
    <AnimatePresence mode="wait" initial={false}>
      {step == "sign-up" ? (
        <SignUpForm setStep={setStep} key="sign-up" />
      ) : (
        <ConfirmYourEmailComponent setStep={setStep} key="confirm-email" />
      )}
    </AnimatePresence>
  );
};
