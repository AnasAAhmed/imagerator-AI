"use client";
import React, { useState } from "react";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import { dataUrl, getImageSize, debounce } from "@/lib/utils";
import DownloadBtn from "./DownloadBtn";

const TransFormedImage = ({
    image,
    type,
    title,
    isTransforming,
    transformationConfig,
    setIsTransforming,
    hasDownload = false,
}: TransformedImageProps) => {
    const [imgUrl, setImgUrl] = useState<string>("");



    return (
        <div className="flex flex-col gap-4">
            <div className="flex-between">
                <h3 className="h3-bold text-dark-600">Transformed</h3>

                {imgUrl && hasDownload && (
                    <DownloadBtn imgUrl={imgUrl} title={title} isTransformed />
                )}
            </div>

            {image?.publicId && transformationConfig ? (
                <div className="relative">
                    <CldImage
                        width={getImageSize(type, image, "width")}
                        height={getImageSize(type, image, "height")}
                        src={image?.publicId}
                        alt={title || "transformed"}
                        sizes="(max-width: 767px) 100vw, 50vw"
                        placeholder={dataUrl as PlaceholderValue}
                        className="transformed-image"
                        {...transformationConfig}
                        onLoad={(e) => {
                            setImgUrl((e.target as HTMLImageElement).src); // ✅ store exact URL
                            setIsTransforming?.(false);
                        }}
                        onError={() =>
                            debounce(() => setIsTransforming?.(false), 8000)()
                        }
                    />

                    {isTransforming && (
                        <div className="transforming-loader">
                            <Image
                                src={"/assets/icons/spinner.svg"}
                                width={50}
                                height={50}
                                alt="spinner"
                            />
                            <p className="text-white/80">Please wait...</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="transformed-placeholder">Transformed image</div>
            )}
        </div>
    );
};

export default TransFormedImage;
