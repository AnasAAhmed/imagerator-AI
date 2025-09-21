"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { debounce, formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { Loader } from "lucide-react";

export const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [ss, setSs] = useState(false);
  const handleSearch = useCallback(
    debounce((value: string) => {
      let newUrl = "";

      if (value) {
        newUrl = formUrlQuery({
          searchParams: searchParams.toString(),
          key: "query",
          value,
        });
        if (newUrl !== window.location.search) {
          setSs(true);
          router.push(newUrl, { scroll: false });
        }
      } else {
        newUrl = removeKeysFromQuery({
          searchParams: searchParams.toString(),
          keysToRemove: ["query"],
        });

        // router.push(newUrl, { scroll: false });
        if (newUrl !== window.location.search) {
          setSs(true);
          router.push(newUrl, { scroll: false });
        }
      }
    }, 300),
    [router, searchParams]
  );
  useEffect(() => {
    setSs(false);
  }, [searchParams]);
  // useEffect(() => {
  //   const delayDebounceFn = setTimeout(() => {
  //     let newUrl = ""
  //     if (query) {
  //       newUrl = formUrlQuery({
  //         searchParams: searchParams.toString(),
  //         key: "query",
  //         value: query,
  //       });

  //       router.push(newUrl, { scroll: false });
  //       if (newUrl !== window.location.search) {
  //         start(); // show progress bar before SSR fetch
  //         router.push(newUrl, { scroll: false });
  //       }
  //     } else {
  //       newUrl = removeKeysFromQuery({
  //         searchParams: searchParams.toString(),
  //         keysToRemove: ["query"],
  //       });

  //       router.push(newUrl, { scroll: false });
  //     }
  //   }, 300);

  //   return () => clearTimeout(delayDebounceFn);
  // }, [router, searchParams, query]);

  return (
    <div className="search">
      {ss ? <Loader size={'1.5rem'} className="animate-spin self-center" /> :
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={24}
          height={24}
        />
      }

      <Input
        className="search-field"
        placeholder="Search"
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};