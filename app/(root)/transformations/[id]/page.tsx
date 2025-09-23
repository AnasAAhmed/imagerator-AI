import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getImageSize } from "@/lib/utils";
import Header from "@/components/shared/Header";
import TransFormedImage from "@/components/shared/TransFormedImage";
import { getCachedImageById } from "@/lib/actions/image.actions";
import { DeleteConfirmation } from "@/components/shared/DeleteConfirmation";
import { auth } from "@clerk/nextjs/server";
import SmartLink from "@/components/shared/SmartLink";
import { IImage } from "@/lib/database/models/image.model";
import { notFound } from "next/navigation";
import DownloadBtn from "@/components/shared/DownloadBtn";

export async function generateMetadata(props: SearchParamProps) {
  const params = await props.params;
  const { id } = params;
  try {

    const image: IImage & { author: User } = await getCachedImageById(id);

    const authorName = `${image.author.firstName} ${image.author.lastName}`;

    const description = `Edited with Imaginify by ${authorName}. 
  Details: ${image.prompt ? "prompt: " + image.prompt + ", " : ""} 
  transformationType: ${image.transformationType}. 
  | Imaginify - AI-powered image editing`;

    return {
      title: `${image.title} | Edited by ${authorName} with`,
      description,
      openGraph: {
        title: `${image.title} | Edited by ${authorName} with Imaginify`,
        description,
        site_name: process.env.SERVER_URL,
        url: process.env.SERVER_URL + '/transformations/' + id + '?title=' + image.title.replaceAll(" ", "+"),
        images: [
          {
            url: image.secureURL || "/assets/images/hero.png",
            width: image.width || 1200,
            height: image.height || 630,
            alt: `${image.title} Edited by ${authorName} - Imaginify`,
          },
        ],
      },
      twitter: {
        title: `${image.title} | Edited by ${authorName} with Imaginify`,
        description,
        images: [
          {
            url: image.secureURL || "/assets/images/hero.png",
            width: image.width || 1200,
            height: image.height || 630,
            alt: `${image.title} Edited by ${authorName} - Imaginify`,
          },
        ],
      },
    };
  } catch (error) {
    console.log(error);

    return {
      title: (error as Error).message + " 404 Not Found | Imaginify",
      description: (error as Error).message + "404 Page not found | Imaginify",
      openGraph: {
        title: (error as Error).message + ` 404 Not Found | Imaginify`,
        description: (error as Error).message + " 404 Page not found | Imaginify",
      },
      twitter: {
        title: (error as Error).message + ` 404 Not Found | Imaginify`,
        description: (error as Error).message + " 404 Page not found | Imaginify",
      },
    };
  }
}

const ImageDetails = async (props: SearchParamProps) => {
  const { userId } = await auth();

  const params = await props.params;

  const {
    id
  } = params;

  const image: IImage & { author: User } | null = await getCachedImageById(id);

  if (!image) return notFound();

  return (
    <>
      <Header title={image.title} subTitle="" />

      <section className="mt-5 flex flex-wrap gap-4">
        <div className="p-14-medium md:p-16-medium flex gap-2">
          <p className="text-dark-600">Transformation type:</p>
          <p className=" capitalize text-purple-400">
            {image.transformationType}
          </p>
        </div>

        {image.prompt && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="p-14-medium md:p-16-medium flex gap-2 ">
              <p className="text-dark-600">Prompt:</p>
              <p className=" capitalize text-purple-400">{image.prompt}</p>
            </div>
          </>
        )}

        {image.color && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="p-14-medium md:p-16-medium flex gap-2">
              <p className="text-dark-600">Color:</p>
              <p className=" capitalize text-purple-400">{image.color}</p>
            </div>
          </>
        )}

        {image.aspectRatio && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="p-14-medium md:p-16-medium flex gap-2">
              <p className="text-dark-600">Aspect Ratio:</p>
              <p className=" capitalize text-purple-400">{image.aspectRatio}</p>
            </div>
          </>
        )}
      </section>

      <section className="mt-10 border-t border-dark-400/15">
        <div className="transformation-grid">
          {/* MEDIA UPLOADER */}
          <div className="flex flex-col gap-4">
            <div className="flex-between">
              <h3 className="h3-bold text-dark-600">Original</h3>

              <DownloadBtn imgUrl={image.secureURL} title={image.title} />
            </div>

            <Image
              width={getImageSize(image.transformationType, image, "width")}
              height={getImageSize(image.transformationType, image, "height")}
              src={image.secureURL}
              alt={image.title}
              className="transformation-original_image"
            />
          </div>

          {/* TRANSFORMED IMAGE */}
          <TransFormedImage
            image={image}
            type={image.transformationType}
            title={image.title}
            isTransforming={false}
            transformationConfig={image.config!}
            hasDownload={true}
          />
        </div>

        {userId === image.author.clerkId && (
          <div className="mt-4 space-y-4">
            <Button asChild type="button" className="submit-button capitalize">
              <SmartLink prefetch href={`/ transformations / ${image._id}/update`
              }>
                Update Image
              </SmartLink >
            </Button >

            <DeleteConfirmation imageId={image._id} publicId={image.publicId} />
          </div >
        )
        }
      </section >
    </>
  );
};

export default ImageDetails;