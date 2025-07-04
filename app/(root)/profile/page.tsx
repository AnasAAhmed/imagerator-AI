import { auth, clerkClient } from "@clerk/nextjs/server";
import Image from "next/image";
import { Collection } from "@/components/shared/Collection";
import Header from "@/components/shared/Header";
import { getUserImages } from "@/lib/actions/image.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { Suspense } from "react";
import { Loader } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'My Profile',
  description: 'In this page you can check your credits status and manipulation you have done' + " | Imaginify",
}

const Profile = async (props: SearchParamProps) => {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page) || 1;
  const { userId } = await auth.protect();

  let message = ''
  let user: User | null = null;
  try {
    user = await getUserById(userId);
  } catch (error) {
    message = (error as Error).message;
  }
  if (message) return <div>{message}</div>;
  if (!user) return <div>Unauthorized</div>;
  const images = await getUserImages({ page, userId: user._id });

  return (
    <>
      <Header title="Profile" />

      <section className="profile">
        <div className="profile-balance">
          <p className="p-14-medium md:p-16-medium">CREDITS AVAILABLE</p>
          <div className="mt-4 flex items-center gap-4">
            <Image
              src="/assets/icons/coins.svg"
              alt="coins"
              width={50}
              height={50}
              className="size-9 md:size-12"
            />
            <h2 className="h2-bold text-dark-600">{user.creditBalance}</h2>
          </div>
        </div>

        <div className="profile-image-manipulation">
          <p className="p-14-medium md:p-16-medium">IMAGE MANIPULATION DONE</p>
          <div className="mt-4 flex items-center gap-4">
            <Image
              src="/assets/icons/photo.svg"
              alt="coins"
              width={50}
              height={50}
              className="size-9 md:size-12"
            />
            <h2 className="h2-bold text-dark-600">{images?.data.length}</h2>
          </div>
        </div>
      </section>

      <section className="mt-8 md:mt-14">
        <Suspense fallback={<Loader size={'3rem'} className='animate-spin' />}>
          <Collection
            images={images?.data}
            totalPages={images?.totalPages}
            page={page}
          />
        </Suspense>
      </section>
    </>
  );
};

export default Profile;