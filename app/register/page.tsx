"use client";

import React, { useActionState } from "react";
import Link from "next/link";
import AuthCard from "@/app/components/AuthCard";
import { RegisterState, SignUp } from "../lib/auth-actions";

export default function RegisterPage() {
  const initialState: RegisterState = { message: null, errors: {} };
  const [state, formAction, pending] = useActionState(SignUp, initialState);

  return (
    <div className="min-h-screen bg-[#f7f8fd] text-[#647196] font-sans">
      <div className="container mx-auto px-6 py-12 md:py-24">
        <div className="flex justify-center">
          <AuthCard title="Register">
            <form action={formAction} className="space-y-6">
              {state.message && (
                <div className="p-4 mb-4 text-sm text-white bg-[#d73737] rounded-md font-bold">
                  {state.message}
                </div>
              )}
              {/* Name Field */}
              <div className="space-y-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-bold text-[#3a4374]"
                >
                  Full Name
                </label>
                <input
                  name="name" // MUST HAVE THIS
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full p-4 text-sm bg-[#f7f8fd] border-none rounded-md focus:ring-2 focus:ring-[#4661e6] outline-none transition"
                />
                {state.errors?.name && (
                  <p className="text-red-500 text-xs">{state.errors.name[0]}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-bold text-[#3a4374]"
                >
                  Email Address
                </label>
                <input
                  name="email" // MUST HAVE THIS
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-4 text-sm bg-[#f7f8fd] border-none rounded-md focus:ring-2 focus:ring-[#4661e6] outline-none transition"
                />
                {state.errors?.email && (
                  <p className="text-red-500 text-xs">
                    {state.errors.email[0]}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-3">
                <label
                  htmlFor="password"
                  className="block text-sm font-bold text-[#3a4374]"
                >
                  Create Password
                </label>
                <input
                  name="password" // MUST HAVE THIS
                  type="password"
                  placeholder="At least 8 characters"
                  className="w-full p-4 text-sm bg-[#f7f8fd] border-none rounded-md focus:ring-2 focus:ring-[#4661e6] outline-none transition"
                />
                {state.errors?.password && (
                  <p className="text-red-500 text-xs">
                    {state.errors.password[0]}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-4 mt-12 pt-4">
                <button
                  disabled={pending}
                  type="submit"
                  className="px-6 py-3 text-sm font-bold text-[#f2f4fe] bg-linear-to-r from-[#ad1fea] via-[#d73737] to-[#f49f3f] rounded-md hover:opacity-90 disabled:opacity-50"
                >
                  {pending ? "Creating..." : "Create Account"}
                </button>
              </div>
            </form>
            <div className="mt-12 text-center text-sm">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-[#4661e6] hover:underline"
              >
                Sign in
              </Link>
            </div>
          </AuthCard>
        </div>
      </div>
    </div>
  );
}
