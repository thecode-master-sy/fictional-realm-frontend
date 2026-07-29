import "server-only";
import {
  SignUpParams,
  SignUpResponse,
  SignUpError,
  SignUpSuccess,
  LoginParams,
  LoginResponse,
  LoginError,
  LoginSuccess,
  RequestPasswordResetParams,
  RequestPasswordResetError,
  RequestPasswordResetResponse,
  RequestPasswordResetSuccess,
  ResetPasswordParams,
  ResetPasswordResponse,
  ResetPasswordError,
  ResetPasswordSuccess,
  GetSessionResponse,
  GetSessionError,
  GetSessionSuccess,
} from "../types";
import { parseValidationErrors } from "../utils";
import { cookies } from "next/headers";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api`;

export async function createUser(
  params: SignUpParams,
): Promise<SignUpResponse> {
  try {
    const response = await fetch(`${BASE_URL}/auth/sign-up/email`, {
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
    });

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

export async function login(params: LoginParams): Promise<LoginResponse> {
  try {
    const response = await fetch(`${BASE_URL}/auth/sign-in/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost:3001",
      },
      credentials: "include", // sends/receives the session cookie cross-origin
      body: JSON.stringify({
        email: params.email,
        password: params.password,
      }),
    });

    const data = await response.json();

    const setCookieHeaders = response.headers.getSetCookie
      ? response.headers.getSetCookie()
      : [];

    if (!response.ok) {
      // Check if it's the specific validation error format
      if (
        data.code === "INVALID_EMAIL" ||
        data.code === "INVALID_EMAIL_OR_PASSWORD"
      ) {
        return {
          data: null,
          error: {
            message: "Invalid email and password",
            code: data.code,
          },
          setCookieHeaders,
        } as SignUpError;
      }

      // Fallback for other standard errors
      console.log(data);
      return { data: null, error: data, setCookieHeaders } as LoginError;
    }

    return { data: data, error: null, setCookieHeaders } as LoginSuccess;
  } catch (err) {
    console.log(err);
    return {
      data: null,
      error: { message: "Something went wrong, try again." },
      setCookieHeaders: [],
    };
  }
}

export async function requestPasswordReset(
  params: RequestPasswordResetParams,
): Promise<RequestPasswordResetResponse> {
  try {
    const response = await fetch(`${BASE_URL}/auth/request-password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost:3001",
      },
      credentials: "include", // sends/receives the session cookie cross-origin
      body: JSON.stringify({
        email: params.email,
        redirectTo: params.redirectTo,
      }),
    });

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
        } as RequestPasswordResetError;
      }

      // Fallback for other standard errors
      return {
        data: null,
        error: data,
        setCookieHeaders,
      } as RequestPasswordResetError;
    }

    return {
      data: data,
      error: null,
      setCookieHeaders,
    } as RequestPasswordResetSuccess;
  } catch (err) {
    console.log(err);
    return {
      data: null,
      error: { message: "Something went wrong, try again." },
      setCookieHeaders: [],
    };
  }
}

export async function resetPassword(
  params: ResetPasswordParams,
): Promise<ResetPasswordResponse> {
  try {
    const response = await fetch(`${BASE_URL}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost:3001",
      },
      credentials: "include", // sends/receives the session cookie cross-origin
      body: JSON.stringify({
        newPassword: params.newPassword,
        token: params.token,
      }),
    });

    const data = await response.json();

    const setCookieHeaders = response.headers.getSetCookie
      ? response.headers.getSetCookie()
      : [];

    if (!response.ok) {
      return {
        data: null,
        error: data,
        setCookieHeaders,
      } as ResetPasswordError;
    }

    return {
      data: data,
      error: null,
      setCookieHeaders,
    } as ResetPasswordSuccess;
  } catch (err) {
    console.log(err);
    return {
      data: null,
      error: { message: "Something went wrong, try again." },
      setCookieHeaders: [],
    };
  }
}

export async function getSession(): Promise<GetSessionResponse> {
  try {
    const incomingCookies = (await cookies()).toString();

    const response = await fetch(`${BASE_URL}/auth/get-session`, {
      method: "GET",
      headers: {
        Cookie: incomingCookies, // forward the browser's session cookie to Hono
      },
      cache: "no-store", // never cache session state
    });

    const data = await response.json();

    const setCookieHeaders = response.headers.getSetCookie
      ? response.headers.getSetCookie()
      : [];

    if (!response.ok) {
      return {
        data: null,
        error: data ?? { message: "Not authenticated" },
        setCookieHeaders,
      } as GetSessionError;
    }

    // Better Auth returns `null` (200 OK) when there's no active session
    if (!data) {
      return {
        data: null,
        error: { message: "Not authenticated" },
        setCookieHeaders,
      } as GetSessionError;
    }

    return { data, error: null, setCookieHeaders } as GetSessionSuccess;
  } catch (err) {
    console.log(err);
    return {
      data: null,
      error: { message: "Something went wrong, try again." },
      setCookieHeaders: [],
    };
  }
}
