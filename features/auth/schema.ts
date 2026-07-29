import { z } from "zod";
import { User } from "../shared/types";

export const createUserSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;

export const requestPasswordResetSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type RequestPasswordResetSchema = z.infer<
  typeof requestPasswordResetSchema
>;

export const resetPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export type LoginActionResponse = {
  error: { message: string } | null;
  data: { user: User } | null;
};
