"use server";
import {
  FormState,
  LoginParams,
  LoginResponse,
  ResetPasswordParams,
} from "../shared/types";
import {
  CreateUserSchema,
  createUserSchema,
  LoginActionResponse,
  requestPasswordResetSchema,
  RequestPasswordResetSchema,
} from "./schema";
import {
  createUser,
  login,
  requestPasswordReset,
  resetPassword,
} from "../shared/data/auth";
import { cookies } from "next/headers";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

// 3. Keep the first parameter as 'prevState' when pairing with useActionState
export async function createUserAction(
  prevState: FormState<CreateUserSchema>,
  formData: FormData,
): Promise<FormState<CreateUserSchema>> {
  const validatedFields = createUserSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      error: true,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "There is an error with the input recievied",
    };
  }

  const response = await createUser({
    name: validatedFields.data.email.split("@")[0],
    email: validatedFields.data.email,
    password: validatedFields.data.password,
    callbackURL: APP_URL,
  });

  if (response.error) {
    return {
      error: true,
      errors: response.error.fieldErrors,
      message: response.error.message,
    };
  }

  const cookieStore = await cookies();

  for (const rawCookie of response.setCookieHeaders) {
    const [nameValue, ...attributes] = rawCookie.split("; ");
    const [name, value] = nameValue.split("=");

    cookieStore.set(name, decodeURIComponent(value), {
      httpOnly: attributes.some((a) => a.toLowerCase() === "httponly"),
      secure: attributes.some((a) => a.toLowerCase() === "secure"),
      sameSite: "lax",
      path: "/",
    });
  }

  return { error: false, message: "User has been created sucessfully" };
}

export async function loginUserAction(
  input: LoginParams,
): Promise<LoginActionResponse> {
  const response = await login(input);

  if (response.error) {
    return {
      error: {
        message: response.error.message,
      },
      data: null,
    };
  }

  const cookieStore = await cookies();

  for (const rawCookie of response.setCookieHeaders) {
    const [nameValue, ...attributes] = rawCookie.split("; ");
    const [name, value] = nameValue.split("=");

    cookieStore.set(name, decodeURIComponent(value), {
      httpOnly: attributes.some((a) => a.toLowerCase() === "httponly"),
      secure: attributes.some((a) => a.toLowerCase() === "secure"),
      sameSite: "lax",
      path: "/",
    });
  }

  return {
    error: null,
    data: {
      user: response.data.user,
    },
  };
}

export async function requestPasswordResetAction(
  prevState: FormState<RequestPasswordResetSchema>,
  formData: FormData,
): Promise<FormState<RequestPasswordResetSchema>> {
  const validatedFields = requestPasswordResetSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      error: true,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "There is an error with the input recievied",
    };
  }

  const response = await requestPasswordReset({
    email: validatedFields.data.email,
    redirectTo: `${APP_URL}/new-password`,
  });

  if (response.error) {
    return {
      error: true,
      message: response.error.message,
    };
  }

  const cookieStore = await cookies();

  for (const rawCookie of response.setCookieHeaders) {
    const [nameValue, ...attributes] = rawCookie.split("; ");
    const [name, value] = nameValue.split("=");

    cookieStore.set(name, decodeURIComponent(value), {
      httpOnly: attributes.some((a) => a.toLowerCase() === "httponly"),
      secure: attributes.some((a) => a.toLowerCase() === "secure"),
      sameSite: "lax",
      path: "/",
    });
  }

  return {
    error: false,
    message: "Your password reset link has been sent successfully.",
  };
}

export async function resetPasswordAction(input: ResetPasswordParams) {
  const response = await resetPassword(input);

  if (response.error) {
    return {
      success: false,
      message: response.error.message,
    };
  }

  const cookieStore = await cookies();

  for (const rawCookie of response.setCookieHeaders) {
    const [nameValue, ...attributes] = rawCookie.split("; ");
    const [name, value] = nameValue.split("=");

    cookieStore.set(name, decodeURIComponent(value), {
      httpOnly: attributes.some((a) => a.toLowerCase() === "httponly"),
      secure: attributes.some((a) => a.toLowerCase() === "secure"),
      sameSite: "lax",
      path: "/",
    });
  }

  return {
    success: true,
    message: "Your password has been reset successfully.",
  };
}
