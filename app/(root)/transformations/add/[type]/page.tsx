import Header from '@/components/shared/Header'
import TransformationForm from '@/components/shared/TransformationForm';
import SignInRedirect from '@/components/SignInRedirect';
import { transformationTypes } from '@/constants'
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server';
import React from 'react'
import { currentUser } from "@clerk/nextjs/server";


export const dynamic = 'force-dynamic';

export async function generateMetadata(props: SearchParamProps) {
  const params = await props.params;
  const {
    type
  } = params;
  const transformation = transformationTypes[type];
  if (!transformation) {
    return {
      title: "404 Not Found | Imaginify",
      description: "404 Page not found | Imaginify",
      openGraph: {
        title: `404 Not Found  | Imaginify`,
        description: "404 Page not found | Imaginify"
      },
      twitter: {
        title: `404 Not Found  | Imaginify`,
        description: "404 Page not found | Imaginify"
      }
    };
  }
  return {
    title: transformation.title,
    description: transformation.subTitle + " | Imaginify",
    openGraph: {
      title: `${transformation.title} | Imaginify`,
      description: transformation.subTitle,
      site_name: process.env.SERVER_URL,
      url: process.env.SERVER_URL+'/transformations/add/'+transformation.type,
      images: [
        {
          url: transformation.image || '/assets/images/hero.png',
          width: 1200,
          height: 630,
          alt: "Imaginify - AI-powered image editing"
        }
      ],
    },
    twitter: {
      title: `${transformation.title} | Imaginify`,
      description: transformation.subTitle,
      images: [
        {
          url: transformation.image || '/assets/images/hero.png',
          width: 1200,
          height: 630,
          alt: "Imaginify - AI-powered image editing"
        }
      ],
    }
  };

}
const AddTransformationType = async (props: SearchParamProps) => {
  const userFromClerk = await currentUser();

  const params = await props.params;

  const {
    type
  } = params;
  if (!userFromClerk) {
    return (
      <SignInRedirect redirectTo={`/transformations/add/${type}`} />
    );
  }

  const transformation = transformationTypes[type];
  let message = ''
  let user: User | null = null;
  try {
    user = await getUserById(userFromClerk.id);
  } catch (error) {
    message = (error as Error).message;
  }
  if (message) return <div>{message}</div>;
  if (!user) return <div>Unauthorized</div>;
  return (
    <>
      <Header title={transformation.title}
        subTitle={transformation.subTitle}
      />
      <section className="mt-10">

        <TransformationForm
          action="Add"
          userId={user._id}
          type={transformation.type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        />
      </section>
    </>
  )
}

export default AddTransformationType
