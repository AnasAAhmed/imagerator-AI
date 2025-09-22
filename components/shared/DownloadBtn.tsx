'use client'
import Image from 'next/image'
import React from 'react'

const DownloadBtn = ({ imgUrl, title = '', isTransformed = false }: { imgUrl: string, title?: string, isTransformed?: boolean }) => {
    const imageDownloader = async () => {
        if (!imgUrl) return;

        try {
            const res = await fetch(imgUrl, { mode: "cors" });
            const blob = await res.blob();
            const mime = blob.type;
            const ext = mime.split("/")[1] || "jpg";
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `${isTransformed ? title + " transformed-image" : title + ' uploaded Image'}.${ext}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(link.href);
        } catch (err) {
            console.error("Download failed", err);
        }
    };
    return (
        <button
            title={`${isTransformed?'Transformed':'Uploaded'} Image Download`}
            className="download-btn"
            onClick={imageDownloader}>
            <Image
                src={"/assets/icons/download.svg"}
                alt="download"
                width={24}
                height={24}
                className="pb-[6px]"
            />
        </button>
    )
}

export default DownloadBtn
