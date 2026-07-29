"use client";

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
import { motion } from "motion/react";
import { useState } from "react";
import { resetPasswordAction } from "../actions";
import { showErrorToast } from "@/features/shared/ui/show-error";
import { Spinner } from "@/components/ui/spinner";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const newPasswordFormVariants = {
  visible: { opacity: 1, y: 0 },
  hidden: {
    opacity: 0,
    y: -10,
  },
};

export const NewPasswordComponent = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const togglePasswordVisibility = (
    type: "password" | "confirm-password" = "password",
  ) => {
    if (type == "password") {
      setShowPassword((prev) => !prev);
    } else {
      setShowConfirmPassword((prev) => !prev);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setPending(true);
    e.preventDefault(); // Prevents automatic form reset
    const formData = new FormData(e.currentTarget);

    const password = formData.get("password")?.toString() ?? "";
    const confirmPassword = formData.get("confirm-password")?.toString() ?? "";

    if (password != confirmPassword) {
      setPending(false);
      return showErrorToast({
        errorDetail: "The passwords do not match",
      });
    }

    const token = searchParams.get("token") ?? "";

    const response = await resetPasswordAction({
      newPassword: password,
      token,
    });
    setPending(false);
    if (!response.success) {
      return showErrorToast({
        errorDetail: response.message,
      });
    }

    router.push("/");
  };

  return (
    <motion.div
      transition={{
        duration: 0.4,
        delay: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      variants={newPasswordFormVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"

      className="w-full flex flex-col items-center justify-center space-y-8"
    >
      <div className="space-y-1">
        <h1 className="text-[24px] font-bold text-foreground tracking-[-1px] text-center">
          New password{" "}
        </h1>
        <p className="text-muted-foreground">Please enter your new password</p>
      </div>

      <div className="max-w-108 w-full space-y-4">
        <form onSubmit={handleSubmit} className="w-full  space-y-2">
          {/* Password */}
          <div>
            <InputGroup>
              <InputGroupInput
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
              />
              <InputGroupAddon align="inline-end">
                <button
                  type="button"

                  onClick={() => togglePasswordVisibility()}
                  className="cursor-pointer text-muted-foreground hover:text-foreground focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeIcon className="w-4 h-4" strokeWidth={1} />
                  ) : (
                    <EyeOffIcon className="w-4 h-4" strokeWidth={1} />
                  )}
                </button>
              </InputGroupAddon>
            </InputGroup>
          </div>

          <div>
            <InputGroup>
              <InputGroupInput
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                name="confirm-password"
              />
              <InputGroupAddon align="inline-end">
                <button
                  type="button"

                  onClick={() => togglePasswordVisibility("confirm-password")}
                  className="cursor-pointer text-muted-foreground hover:text-foreground focus:outline-none"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeIcon className="w-4 h-4" strokeWidth={1} />
                  ) : (
                    <EyeOffIcon className="w-4 h-4" strokeWidth={1} />
                  )}
                </button>
              </InputGroupAddon>
            </InputGroup>
          </div>

          {/* Login Button */}
          <Button
            disabled={pending}
            type="submit"
            size="lg"
            className="bg-accent-green w-full text-foreground cursor-pointer border border-black/20 text-base hover:bg-[#87c88d]"
          >
            {pending ? <Spinner /> : "Set new password"}
          </Button>
        </form>
      </div>
    </motion.div>
  );
};
