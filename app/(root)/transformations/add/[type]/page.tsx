import Header from '@/components/shared/Header'
import TransformationForm from '@/components/shared/TransformationForm';
import SignInRedirect from '@/components/SignInRedirect';
import { transformationTypes } from '@/constants'
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server';
import React from 'react'

const AddTransformationType = async (props: SearchParamProps) => {
  const params = await props.params;

  const {
    type
  } = params;

  const { userId } = await auth();
  if (!userId) {
    return (
      <SignInRedirect redirectTo={`/transformations/add/${type}`} />
    );
  }
  const transformation = transformationTypes[type];
  let message = ''
  let user: User | null = null;
  try {
    user = await getUserById(userId);
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
