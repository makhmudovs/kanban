"use server";

import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import {
  SignupFormSchema,
  FormState,
  SinginFormState,
  SigninFormSchema,
} from "@/app/lib/definitions";
import { headers } from "next/headers";

export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Call the provider or db to create a user...

  const { name, email, password } = validatedFields.data;
  const data = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
      // image: "https://example.com/image.png",
      // callbackURL: "https://example.com/callback",
    },
  });

  if (!data.token || !data.user) {
    return {
      message: "An error occurred while creating your account.",
    };
  }
  redirect("/login");
}

export async function signin(state: SinginFormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SigninFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Call the provider or db to create a user...

  const { email, password } = validatedFields.data;
  const data = await auth.api.signInEmail({
    body: {
      email,
      password,
      // rememberMe: true,
      // callbackURL: "https://example.com/callback",
    },
    // This endpoint requires session cookies.
    headers: await headers(),
  });

  if (!data.token || !data.user) {
    return {
      message: "An error occurred while creating your account.",
    };
  }
  redirect("/dashboard");
}

export async function validateUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }
  return session.user.id;
}

// export async function logout() {
//   const supabase = await createClient();
//   await supabase.auth.signOut();

//   redirect("/login");
// }
