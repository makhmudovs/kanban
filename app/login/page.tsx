"use client";

import  { useActionState } from "react";
import Link from "next/link";
import { signin } from "@/app/lib/actions/auth";

export default function Page() {
  const [state, action, pending] = useActionState(signin, undefined);
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex items-center gap-3 px-6 py-8">
          <div className="flex items-end gap-1">
            <span className="block w-1.5 h-3 rounded-sm bg-[#635fc7]" />
            <span className="block w-1.5 h-5 rounded-sm bg-[#635fc7]" />
            <span className="block w-1.5 h-7 rounded-sm bg-[#635fc7]" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-black dark:text-white">
            kanban
          </span>
        </div>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action={action}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                />
              </div>
              {state?.errors?.email && <p className="text-red-500">{state.errors.email}</p>}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
               {state?.errors?.password && (
                <div>
                  <p className="text-red-500">Password must:</p>
                  <ul>
                    {state.errors.password.map((error) => (
                      <li className="text-red-500" key={error}>- {error}</li>
                    ))}
                  </ul>
                </div>
              )}
              <button
                type="submit"
                 disabled={pending}
                className="w-full text-white bg-indigo-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Login account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                {"Don't"} have an account?{" "}
                <Link
                  href="/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
