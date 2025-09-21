import Image from "next/image";
import SmartLink from "@/components/shared/SmartLink";
// import { CldImage } from "next-cloudinary";

import { transformationTypes } from "@/constants";
import { IImage } from "@/lib/database/models/image.model";


import { Search } from "./Search";
import { Loader, Loader2 } from "lucide-react";
import { Suspense } from "react";
import PaginationControls from "./PaginationControls";

export const Collection = ({
  hasSearch = false,
  images,
  totalPages = 1,
  page,
  isLoading = false
}: {
  images: IImage[];
  totalPages?: number;
  page: number;
  hasSearch?: boolean;
  isLoading?: boolean;
}) => {
  
  return (
    <>
      

      {isLoading ? <div className="collection-empty"><Loader2 size={'4rem'} className="animate-spin" /></div> : images.length > 0 ? (
        <ul className="collection-list">
          {images.map((image) => (
            <Card image={image} key={image._id} />
          ))}
        </ul>
      ) : (
        <div className="collection-empty">
          <p className="p-20-semibold">Empty List</p>
        </div>
      )}

      {totalPages > 1 && (
        <PaginationControls totalPages={totalPages} page={page}/>
      )}
    </>
  );
};

const Card = ({ image }: { image: IImage }) => {
  return (
    <li>
      <SmartLink href={`/transformations/${image._id}`} className="collection-card">
        {/* <CldImage
          src={image.publicId}
          alt={image.title}
          width={image.width}
          height={image.height}
          {...image.config}
          loading="lazy"
          className="h-52 w-full rounded-[10px] object-cover"
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
        /> */}
        <Image
          src={image.secureURL}
          alt={image.title}
          width={image.width}
          height={image.height}
          {...image.config}
          loading="lazy"
          className="h-52 w-full rounded-[10px] object-cover"
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
        />
        <div className="flex-between">
          <p className="p-20-semibold mr-3 line-clamp-1 text-dark-600">
            {image.title}
          </p>
          <Image
            src={`/assets/icons/${transformationTypes[
              image.transformationType as TransformationTypeKey
            ].icon
              }`}
            alt={image.title}
            width={24}
            height={24}
          />
        </div>
      </SmartLink>
    </li>
  );
};