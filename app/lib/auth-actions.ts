'use server';

import { z } from "zod";
import { auth } from "./auth";
import { loginUserSchema, registerUserSchema } from "./schemas";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export type RegisterState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

export async function SignUp(
  initialState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const validatedFields = registerUserSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    const { fieldErrors } = z.flattenError(validatedFields.error);
    return { errors: fieldErrors };
  }

  const { name, email, password } = validatedFields.data;

  console.log({ name, email, password });

  // 2. Database Operation
  try {
    await auth.api.signUpEmail({
      body: { name, email, password },
    });
    // Don't redirect inside the try block!
  } catch (error: any) {
    // 1. Log the error for your own debugging
    console.error("Auth Error:", error);

    // 2. Map specific Better-Auth errors to user-friendly messages
    // Better-Auth usually sends back a code or a message
    const errorMessage =
      error.body?.message || error.message || "Something went wrong";

    if (errorMessage.toLowerCase().includes("invalid")) {
      return { message: "Invalid email or password.", errors: {} };
    }

    return {
      message: "An unexpected error occurred. Please try again.",
      errors: {},
    };
  }

  // 3. Successful Redirect (Outside the try/catch)
  redirect("/login");
}

export type SignInState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

export async function SignIn(
  initialState: SignInState,
  formData: FormData,
): Promise<SignInState> {
  const validatedFields = loginUserSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    const { fieldErrors } = z.flattenError(validatedFields.error);
    return { errors: fieldErrors };
  }

  const { email, password } = validatedFields.data;

  console.log({ email, password });

  // 2. Database Operation
  try {
    await auth.api.signInEmail({
      body: { email, password }, // This endpoint requires session cookies.
      headers: await headers(),
    });
    // Don't redirect inside the try block!
  } catch (error: any) {
    // 1. Log the error for your own debugging
    console.error("Auth Error:", error);

    // 2. Map specific Better-Auth errors to user-friendly messages
    // Better-Auth usually sends back a code or a message
    const errorMessage =
      error.body?.message || error.message || "Something went wrong";

    if (errorMessage.toLowerCase().includes("invalid")) {
      return { message: "Invalid email or password.", errors: {} };
    }

    return {
      message: "An unexpected error occurred. Please try again.",
      errors: {},
    };
  } finally {
    redirect("/");
  }
}
