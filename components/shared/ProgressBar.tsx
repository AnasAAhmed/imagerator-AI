'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useProgressStore } from '@/lib/useProgressBar';

export default function ProgressBar() {
  const searchParams = useSearchParams();
  const progress = useProgressStore((s) => s.progress);
  const complete = useProgressStore((s) => s.complete);
  const loading = useProgressStore((s) => s.loading);
  useEffect(() => {
    if (loading) return complete();
  }, [searchParams]);

  return (
    <div className="fixed top-0 left-0 z-[9999] h-[3px] w-full bg-transparent">
      <div
        className="h-full bg-blue-500 transition-all duration-200 ease-linear"
        style={{
          width: `${progress}%`,
          opacity: loading ? 1 : 0,
        }}
      >
        <div className="absolute top-0 left-[-50%] h-full w-[50%] bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shine" />


      </div>
    </div>
    // <div
    //   style={{
    //     opacity: loading ? 1 : 0,
    //     display: loading ? 'flex' : 'none',
    //     backgroundColor: "rgba(0, 0, 0, 0.116)"
    //   }}
    //   className="fixed inset-0 z-[9999] flex items-center bg-swhite transition-opacity justify-center bg-whiste text-black rounsded-full"
    // >
    //   {/* <Loader /> */}
    //   <Image src={'/Ghost.gif'} width={150} height={90} alt='Loader gif'/>
    // </div>


  );
}
