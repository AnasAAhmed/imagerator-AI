"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useProgressStore } from '@/lib/useProgressBar';
import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

export const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const start = useProgressStore((state) => state.start);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = ""
      if (query) {
        newUrl = formUrlQuery({
          searchParams: searchParams.toString(),
          key: "query",
          value: query,
        });

        router.push(newUrl, { scroll: false });
      } else {
        newUrl = removeKeysFromQuery({
          searchParams: searchParams.toString(),
          keysToRemove: ["query"],
        });

        router.push(newUrl, { scroll: false });
      }
      if (newUrl !== window.location.search) {
        start(); // show progress bar before SSR fetch
        router.push(newUrl, { scroll: false });
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [router, searchParams, query]);

  return (
    <div className="search">
      <Image
        src="/assets/icons/search.svg"
        alt="search"
        width={24}
        height={24}
      />

      <Input
        className="search-field"
        placeholder="Search"
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};