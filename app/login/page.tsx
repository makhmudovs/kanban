"use client";

import React, { useActionState } from "react";
import Link from "next/link";
import AuthCard from "@/app/components/AuthCard";
import { SignIn, SignInState } from "../lib/auth-actions";
// Reuse your existing GoBack component here if you have one
// import GoBack from '@/components/GoBack';

const LoginPage: React.FC = () => {
  const initialState: SignInState = { message: null, errors: {} };
  const [state, formAction, pending] = useActionState(SignIn, initialState);
  return (
    <div className="min-h-screen bg-[#f7f8fd] text-[#647196] font-sans">
      <div className="container mx-auto px-6 py-12 md:py-24">
        {/* 'Go Back' link inspired by the image top left */}
        <div className="mb-14">{/* <GoBack /> */}</div>

        <div className="flex justify-center">
          <AuthCard title="Login">
            <form action={formAction} className="space-y-6">
              {state.message && (
                <div className="p-4 mb-4 text-sm text-white bg-[#d73737] rounded-md font-bold">
                  {state.message}
                </div>
              )}
              {/* Field 1: Email */}
              <div className="space-y-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-bold text-[#3a4374]"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full p-4 text-sm bg-[#f7f8fd] border-none rounded-md focus:ring-2 focus:ring-[#4661e6] focus:bg-white outline-none transition"
                  required
                />
                {state.errors?.email && (
                  <p className="text-red-500 text-xs">
                    {state.errors.email[0]}
                  </p>
                )}
              </div>

              {/* Field 2: Password */}
              <div className="space-y-3">
                <label
                  htmlFor="password"
                  className="block text-sm font-bold text-[#3a4374]"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full p-4 text-sm bg-[#f7f8fd] border-none rounded-md focus:ring-2 focus:ring-[#4661e6] focus:bg-white outline-none transition"
                  required
                />
                {state.errors?.password && (
                  <p className="text-red-500 text-xs">
                    {state.errors.password[0]}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-12">
                <Link
                  href="/forgot-password"
                  className="text-xs text-[#647196] hover:underline"
                >
                  Forgot password?
                </Link>
                <button
                  type="submit"
                  className="px-6 py-3 text-sm font-bold text-[#f2f4fe] bg-linear-to-r from-[#ad1fea] via-[#d73737] to-[#f49f3f] rounded-md hover:opacity-90 transition w-full sm:w-auto"
                >
                  {pending ? "Signing in" : "Sign in"}
                </button>
              </div>
            </form>

            <div className="mt-12 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-bold text-[#4661e6] hover:underline"
              >
                Sign up
              </Link>
            </div>
          </AuthCard>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
