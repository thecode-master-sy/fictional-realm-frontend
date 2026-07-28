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

export type SignUpError = {
  data: null;
  error: {
    message: string;
    code?: string;
    fieldErrors?: Record<string, string[]>;
  };
  setCookieHeaders: string[];
};

export type SignUpResponse = SignUpSuccess | SignUpError;

export type FormState<T> = {
  success: boolean;
  errors?: {
    [K in keyof T]?: string[];
  };
  message?: string;
};
