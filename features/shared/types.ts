export type ApiErrorResponse = {
  data: null;
  error: {
    message: string;
    code?: string;
    fieldErrors?: Record<string, string[]>;
  };
  setCookieHeaders: string[];
};

export type User = {
  id: string;
  email: string;
  name: string;
  image: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Session = {
  id: string;
  expiresAt: string; // ISO date string, e.g. "2026-07-29T07:17:48.109Z"
  token: string;
  createdAt: string;
  updatedAt: string;
  ipAddress: string | null;
  userAgent: string | null;
  userId: string;
};

export type SignUpParams = {
  name: string;
  email: string;
  password: string;
  image?: string;
  callbackURL?: string;
  rememberMe?: boolean;
};

export type SignUpSuccess = {
  data: {
    token: string;
    user: User;
  };
  error: null;
  setCookieHeaders: string[];
};

export type SignUpError = ApiErrorResponse;

export type SignUpResponse = SignUpSuccess | SignUpError;

export type FormState<T> = {
  error: boolean;
  errors?: {
    [K in keyof T]?: string[];
  };
  message?: string;
};

export type LoginParams = {
  email: string;
  password: string;
};

export type LoginSuccess = {
  data: {
    redirect: boolean;
    token: string;
    url: string;
    user: User;
  };
  error: null;
  setCookieHeaders: string[];
};

export type LoginError = ApiErrorResponse;

export type LoginResponse = LoginSuccess | LoginError;

export type RequestPasswordResetParams = {
  email: string;
  redirectTo: string;
};

export type RequestPasswordResetSuccess = {
  data: {
    message: string;
    status: boolean;
  };
  setCookieHeaders: string[];
  error: null;
};

export type RequestPasswordResetError = ApiErrorResponse;

export type RequestPasswordResetResponse =
  RequestPasswordResetSuccess | RequestPasswordResetError;

export type ResetPasswordParams = {
  newPassword: string;
  token: string;
};

export type ResetPasswordSuccess = {
  data: {
    status: boolean;
  };
  setCookieHeaders: string[];
  error: null;
};

export type ResetPasswordError = ApiErrorResponse;

export type ResetPasswordResponse = ResetPasswordSuccess | ResetPasswordError;

export type GetSessionSuccess = {
  data: { user: User; session: Session }; // shape matches Better Auth's session response
  error: null;
  setCookieHeaders: string[];
};

export type GetSessionError = {
  data: null;
  error: { message: string; code?: string };
  setCookieHeaders: string[];
};

export type GetSessionResponse = GetSessionSuccess | GetSessionError;
