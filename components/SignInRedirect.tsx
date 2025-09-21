'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SignInRedirect({ redirectTo }: { redirectTo?: string }) {
  const router = useRouter();

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     router.push(`/sign-in?redirect_url=${encodeURIComponent(redirectTo||'/')}`);
  //   }, 5000); // auto-redirect after 5 seconds

  //   return () => clearTimeout(timeout);
  // }, [redirectTo, router]);

  return (
    <div className="min-h-screen flex flex-col items-center mt-10 md:mt-20 lg:mt-32 bg-white text-black px-6">
      <h1 className="text-2xl font-semibold mb-4">Hold on! You need to sign in</h1>
      <p className="text-center text-gray-700 max-w-md mb-8">
        To access this content, please sign in. You’ll be redirected shortly, or you can use the buttons below to navigate.
      </p>
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() =>
            router.push(`/sign-in?redirect_url=${encodeURIComponent(redirectTo||'/')}`)
          }
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Login Now
        </button>
        <button
          onClick={() => router.push('/')}
          className="px-6 py-2 border border-black text-black rounded-lg hover:bg-gray-100 transition"
        >
          Go to Home
        </button>
        <button
          onClick={() => router.back()}
          className="px-6 py-2 border border-black text-black rounded-lg hover:bg-gray-100 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
