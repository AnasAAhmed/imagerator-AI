
// import ClientImageSection from '@/components/shared/ClientImageSection'
import SmartLink from '@/components/shared/SmartLink'
// import { Collection } from '@/components/shared/Collection'
import { navLinks } from '@/constants'
import { Loader, Loader2 } from "lucide-react";
import { getAllImages } from '@/lib/actions/image.actions'
import Image from 'next/image'
import React, { Suspense } from 'react'
import { Collection } from '@/components/shared/Collection'
import { IImage } from '@/lib/database/models/image.model'
import { Search } from '@/components/shared/Search'

// export const dynamic = 'force-static';

const Home = async (props: SearchParamProps) => {
  const searchParams = await props.searchParams;

  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || "";

  // const images = await getAllImages ({page,searchQuery});


  return (
    <>
      <section className="home">
        <h1 className="home-heading">
          Unleash Your Creative Vision With Imaginify
        </h1>
        <ul className="flex-center w-full gap-20">
          {navLinks.slice(1, 5).map((link) => (
            <SmartLink
              key={link.route}
              href={link.route}
              prefetch
              className='flex-center flex-col gap-2'
            >
              <li className="flex-center w-fit rounded-full bg-white p-4">
                <Image src={link.icon} alt='link-icon' height={24} width={24} />
              </li>
              <p className="p-14-medium text-center text-white">{link.label}</p>
            </SmartLink>
          ))}
        </ul>
      </section>
      <section className="sm:mt-12">
        <div className="collection-heading">
          <h2 className="h2-bold text-dark-600">Recent Edits</h2>
         <Suspense fallback={<Loader size={'3rem'} className='animate-spin' />}>
            <Search />
          </Suspense>
        </div>
        <Suspense fallback={<div className="collection-empty"><Loader2 size={'4rem'} className="animate-spin" /></div>}>
          {/* <ClientImageSection /> */}
          <AllImages page={page} searchQuery={searchQuery} />
        </Suspense>
      </section>
    </>
  )
}

type AllImagesType = {
  page: number;
  searchQuery: string
}
type ImagesType = {
  images: IImage[];
  totalPages: number;
} | undefined
async function AllImages({ page, searchQuery }: AllImagesType) {
  const data: ImagesType = await getAllImages({ page, searchQuery });

  return (
    <Collection
      hasSearch
      images={data?.images || []}
      totalPages={data?.totalPages || 0}
      page={page || 1}
    />
  )
}
export default Home
