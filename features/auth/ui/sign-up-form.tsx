"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/ui/google-icon";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useActionState, startTransition } from "react";
import { createUserAction } from "../actions";
import { SubmitButton } from "./submit-button";
import { showErrorToast } from "@/features/shared/ui/show-error";
import { motion } from "motion/react";

const initialFormState = {
  error: false,
  message: "",
};

const signUpFormVariants = {
  visible: { opacity: 1, y: 0 },
  hidden: {
    opacity: 0,
    y: -10,
  },
};

export const SignUpForm = ({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<"sign-up" | "confirm-email">>;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction] = useActionState(
    createUserAction,
    initialFormState,
  );
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    const hasFieldErrors = state.errors && Object.keys(state.errors).length > 0;

    if (state.error && state.message && !hasFieldErrors) {
      showErrorToast({ errorDetail: state.message });
    }

    if (!state.error) {
      setStep("confirm-email");
    }
  }, [state, setStep]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents automatic form reset
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <motion.div
      transition={{
        duration: 0.4,
        delay: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      variants={signUpFormVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"

      className="w-full flex flex-col items-center justify-center space-y-8"
    >
      <div className="space-y-1">
        <h1 className="text-[24px] font-bold text-foreground tracking-[-1px] text-center">
          Create an account
        </h1>
        <p className="text-muted-foreground">
          Please fill in the form to create an account.
        </p>
      </div>

      <div className="max-w-108 w-full space-y-4">
        <form onSubmit={handleSubmit} className="w-full  space-y-2">
          {/* Email */}
          <div className="space-y-1">
            <Label htmlFor="email" className="font-medium text-base">
              Email
            </Label>
            <Input placeholder="m@example.com" name="email" />
            {state.errors?.email && (
              <p className="text-red-500">{state.errors.email[0]}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <Label htmlFor="password" className="text-base font-medium">
              Password
            </Label>

            <InputGroup>
              <InputGroupInput
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                name="password"
              />
              <InputGroupAddon align="inline-end">
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="cursor-pointer text-muted-foreground hover:text-foreground focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeIcon className="w-4 h-4" />
                  ) : (
                    <EyeOffIcon className="w-4 h-4" />
                  )}
                </button>
              </InputGroupAddon>
            </InputGroup>

            {state.errors?.password && (
              <p className="text-red-500">{state.errors.password[0]}</p>
            )}
          </div>

          <SubmitButton className="bg-accent-green w-full text-foreground cursor-pointer border border-black/20 text-base hover:bg-[#87c88d]">
            <span>Create an account</span>
          </SubmitButton>
        </form>

        {/* Divider */}
        <div className="w-full max-w-md relative">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-zinc-200" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        {/* Third Party Login */}
        <div className="w-full max-w-md">
          <Button
            size="lg"
            className="w-full border border-black/20 text-base  bg-white cursor-pointer text-foreground hover:bg-white/80"
          >
            <GoogleIcon className="w-4 h-4" />
            <span>Continue with google</span>
          </Button>
        </div>

        {/* Footer */}
        <p className="w-full max-w-md text-center text-muted-foreground">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-foreground hover:underline"
          >
            Sign in
          </a>
        </p>
      </div>
    </motion.div>
  );
};
