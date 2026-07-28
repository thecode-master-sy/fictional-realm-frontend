import "server-only";
import {
  SignUpParams,
  SignUpResponse,
  SignUpError,
  SignUpSuccess,
} from "../types";
import { parseValidationErrors } from "../utils";

export async function createUser(
  params: SignUpParams,
): Promise<SignUpResponse> {
  try {
    const response = await fetch(
      "http://localhost:3000/api/auth/sign-up/email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "http://localhost:3001",
        },
        credentials: "include", // sends/receives the session cookie cross-origin
        body: JSON.stringify({
          name: params.name,
          email: params.email,
          password: params.password,
          image: params.image,
          callbackURL: params.callbackURL,
          rememberMe: params.rememberMe ?? true,
        }),
      },
    );

    const data = await response.json();

    const setCookieHeaders = response.headers.getSetCookie
      ? response.headers.getSetCookie()
      : [];

    if (!response.ok) {
      // Check if it's the specific validation error format
      if (
        data.code === "VALIDATION_ERROR" &&
        typeof data.message === "string"
      ) {
        return {
          data: null,
          error: {
            message: "Validation failed. Please check your inputs.",
            code: data.code,
            fieldErrors: parseValidationErrors(data.message), // Use the abstracted function here
          },
          setCookieHeaders,
        } as SignUpError;
      }

      // Fallback for other standard errors
      return { data: null, error: data, setCookieHeaders } as SignUpError;
    }

    return { data: data, error: null, setCookieHeaders } as SignUpSuccess;
  } catch (err) {
    return {
      data: null,
      error: { message: err instanceof Error ? err.message : "Network error" },
      setCookieHeaders: [],
    };
  }
}
