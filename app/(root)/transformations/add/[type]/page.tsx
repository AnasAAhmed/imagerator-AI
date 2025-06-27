import Header from '@/components/shared/Header'
import TransformationForm from '@/components/shared/TransformationForm';
import { transformationTypes } from '@/constants'
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server';
import React from 'react'

const AddTransformationType = async (props: SearchParamProps) => {
  const params = await props.params;

  const {
    type
  } = params;

  const { userId } = await auth.protect();
  const transformation = transformationTypes[type];

  const user = await getUserById(userId);
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
