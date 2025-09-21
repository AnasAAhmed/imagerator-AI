'use client'
import { Pagination, PaginationContent, PaginationNext, PaginationPrevious } from '../ui/pagination'
import { Button } from '../ui/button'
import { useSearchParams, useRouter } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";

const PaginationControls = ({page,totalPages}:{page:number;totalPages:number}) => {
    const router = useRouter();
      const searchParams = useSearchParams();
    
      // PAGINATION HANDLER
      const onPageChange = (action: string) => {
        const pageValue = action === "next" ? Number(page) + 1 : Number(page) - 1;
    
        const newUrl = formUrlQuery({
          searchParams: searchParams.toString(),
          key: "page",
          value: pageValue,
        });
    
        router.push(newUrl, { scroll: false });
      };
  return (
   <Pagination className="mt-10">
          <PaginationContent className="flex w-full">
            <Button
              disabled={Number(page) <= 1}
              className="collection-btn"
              onClick={() => onPageChange("prev")}
            >
              <PaginationPrevious className="hover:bg-transparent hover:text-white" />
            </Button>

            <p className="flex-center p-16-medium w-fit flex-1">
              {page} / {totalPages}
            </p>

            <Button
              className="button w-32 bg-purple-gradient bg-cover text-white"
              onClick={() => onPageChange("next")}
              disabled={Number(page) >= totalPages}
            >
              <PaginationNext className="hover:bg-transparent hover:text-white" />
            </Button>
          </PaginationContent>
        </Pagination>
  )
}

export default PaginationControls
