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
  success: boolean;
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
