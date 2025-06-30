import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import Header from "@/components/shared/Header";
import TransformationForm from "@/components/shared/TransformationForm";
import { transformationTypes } from "@/constants";
import { getUserById } from "@/lib/actions/user.actions";
import { getImagebyId } from "@/lib/actions/image.actions";

const Page = async (props: SearchParamProps) => {
  const params = await props.params;

  const {
    id
  } = params;

  const { userId } = await auth.protect();

  let message = ''
  let user: User | null = null;
  try {
    user = await getUserById(userId);
  } catch (error) {
    message = (error as Error).message;
  }
  if (message || !user) return <div>{message}</div>;

  const image = await getImagebyId(id);

  const transformation =
    transformationTypes[image.transformationType as TransformationTypeKey];

  return (
    <>
      <Header title={transformation.title} subTitle={transformation.subTitle} />

      <section className="mt-10">
        <TransformationForm
          action="Update"
          userId={user._id}
          type={image.transformationType as TransformationTypeKey}
          creditBalance={user.creditBalance}
          config={image.config}
          data={image}
        />
      </section>
    </>
  );
};

export default Page;