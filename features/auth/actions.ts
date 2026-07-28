"use server";
import { FormState } from "../shared/types";
import { CreateUserSchema, createUserSchema } from "./schema";
import { createUser } from "../shared/data/auth";
import { cookies } from "next/headers";

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
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "There is an error with the input recievied",
    };
  }

  const response = await createUser({
    name: validatedFields.data.email.split("@")[0],
    email: validatedFields.data.email,
    password: validatedFields.data.password,
  });

  if (response.error) {
    return {
      success: false,
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

  return { success: true, message: "User has been created sucessfully" };
}
