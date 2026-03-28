"use client";

import Link from "next/link";
import {
  createFeedback,
  CreateFeedbackState,
} from "@/app/lib/feedback-actions";
import { ChevronLeft } from "lucide-react";
import { useActionState } from "react";

export default function Page() {
  const initialState: CreateFeedbackState = { message: null, errors: {} };
  const [state, formAction, pending] = useActionState(
    createFeedback,
    initialState,
  );

  return (
    <div className="min-h-screen bg-[#F7F8FD] py-12 px-6 md:py-24">
      <div className="max-w-135 mx-auto">
        {/* Go Back Link */}
        <Link
          href="/"
          className="flex items-center gap-1 text-[#647196] font-bold text-sm mb-16 hover:underline"
        >
          <span className="text-[#4661E6]">
            <ChevronLeft className="h-3 w-3" />
          </span>{" "}
          Go Back
        </Link>

        <div className="relative bg-white rounded-lg p-10 pt-12 shadow-sm">
          {/* Plus Icon Badge */}
          <div className="absolute -top-7 left-10 w-14 h-14 rounded-full bg-linear-to-br from-[#AD1FEA] via-[#D73737] to-[#F49F3F] flex items-center justify-center text-white text-3xl font-bold">
            +
          </div>

          <h1 className="text-[#3A4374] text-2xl font-bold mb-10">
            Create New Feedback
          </h1>

          <form action={formAction} className="space-y-6">
            {state.message && (
              <div className="p-4 mb-4 text-sm text-white bg-[#d73737] rounded-md font-bold">
                {state.message}
              </div>
            )}
            {/* Title Section */}
            <div className="space-y-1">
              <label
                htmlFor="title"
                className="block text-[#3A4374] text-sm font-bold"
              >
                Feedback Title
              </label>
              <p className="text-[#647196] text-sm mb-4">
                Add a short, descriptive headline
              </p>
              <input
                type="text"
                id="title"
                name="title"
                required
                className="w-full bg-[#F7F8FD] border-none rounded-md p-4 text-[#3A4374] focus:ring-1 focus:ring-[#4661E6] outline-none"
              />
              {state.errors?.title && (
                <p className="text-red-500 text-xs">{state.errors.title[0]}</p>
              )}
            </div>

            {/* Category Section */}
            <div className="space-y-1">
              <label
                htmlFor="category"
                className="block text-[#3A4374] text-sm font-bold"
              >
                Category
              </label>
              <p className="text-[#647196] text-sm mb-4">
                Choose a category for your feedback
              </p>
              <select
                id="category"
                name="category"
                className="w-full bg-[#F7F8FD] border-none rounded-md p-4 text-[#3A4374] focus:ring-1 focus:ring-[#4661E6] outline-none appearance-none cursor-pointer"
              >
                <option value="Feature">Feature</option>
                <option value="UI">UI</option>
                <option value="UX">UX</option>
                <option value="Enhancement">Enhancement</option>
                <option value="Bug">Bug</option>
              </select>
              {state.errors?.category && (
                <p className="text-red-500 text-xs">
                  {state.errors.category[0]}
                </p>
              )}
            </div>

            {/* Detail Section */}
            <div className="space-y-1">
              <label
                htmlFor="detail"
                className="block text-[#3A4374] text-sm font-bold"
              >
                Feedback Detail
              </label>
              <p className="text-[#647196] text-sm mb-4">
                Include any specific comments on what should be improved, added,
                etc.
              </p>
              <textarea
                id="detail"
                name="detail"
                required
                rows={4}
                className="w-full bg-[#F7F8FD] border-none rounded-md p-4 text-[#3A4374] focus:ring-1 focus:ring-[#4661E6] outline-none resize-none"
              />
              {state.errors?.detail && (
                <p className="text-red-500 text-xs">{state.errors.detail[0]}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col-reverse md:flex-row items-center justify-end gap-4 pt-4">
              <Link
                href="/"
                className="w-full md:w-auto text-center px-6 py-3 bg-[#3A4374] text-[#F2F4FE] font-bold text-sm rounded-lg hover:opacity-90 transition"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-3 bg-[#AD1FEA] text-[#F2F4FE] font-bold text-sm rounded-lg hover:opacity-90 transition"
              >
                Add Feedback
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
