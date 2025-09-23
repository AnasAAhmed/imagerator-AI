'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useProgressStore } from '@/lib/useProgressBar';
import Image from 'next/image';

export default function ProgressBar() {
  const searchParams = useSearchParams();
  const progress = useProgressStore((s) => s.progress);
  const complete = useProgressStore((s) => s.complete);
  const loading = useProgressStore((s) => s.loading);
  useEffect(() => {
    const timer = setTimeout(() => {
      complete();
    }, 150); // adjust as you like
    return () => clearTimeout(timer);
  }, [searchParams]);


  return (
    // <div className="fixed top-0 left-0 z-[9999] h-[3px] w-full bg-transparent">
    //   <div
    //     className="h-full bg-blue-500 transition-all duration-200 ease-linear"
    //     style={{
    //       width: `${progress}%`,
    //       opacity: loading ? 1 : 0,
    //     }}
    //   >
    //     <div className="absolute top-0 left-[-50%] h-full w-[50%] bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shine" />


    //   </div>
    // </div>
    <div
      style={{
        opacity: loading ? 1 : 0,
        pointerEvents: loading ? "auto" : "none",
      }}
      className="fixed inset-0 z-[9999] flex items-center duration-500 bg-white/90  transition-opacity justify-center"
    >
      {/* <Loader /> */}
      <div className="loader"></div>
    </div>


  );
}
