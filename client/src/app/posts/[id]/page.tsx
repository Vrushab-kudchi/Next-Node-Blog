import React from 'react';
import { getSinglePost, getRelatedCategory } from '@/components/API';
import parse from 'html-react-parser';
import Link from 'next/link';
import ClientNavbar from '@/components/ClientNavbar';
import Footer from '@/components/footer';

export async function generateMetadata({ params }: any) {
  const data: any = await getSinglePost(params.id);
  const post = data.data[0];
  return {
    title: post.meta_title,
    description: post.meta_description,
  };
}

export default async function SinglePost({ params }: any) {
  const data: any = await getSinglePost(params.id);
  const post = data.data[0];

  const relate: any = await getRelatedCategory(post.category_id);
  const related = relate.data

  // Parse HTML content with Tailwind classes
  const parsedContent = parse(post.content);

  return (
    <>
    <ClientNavbar />
    <div className="container mx-auto p-6 ">
      <h1 className="bg-[#E56617] mt-5 rounded-full p-5 w-4/12 md:w-1/12 text-[#ffffff] font-extrabold text-center">{post.category_name ? post.category_name : "Unknown"}</h1>
      <h1 className='md:text-5xl text-4xl mt-10 underline text-[#2C2C2C] decoration-[#E56617]'>{post.title}</h1>
      <h2 className="mt-10 text-2xl text-[#2C2C2C]">{post.subtitle}</h2>
      <img src={post.image} alt={post.title} className=' mt-10 rounded-lg border-2 border-[#2C2C2C]'/>
      <div className='leading-10 mt-3'>{parsedContent}</div>

      <h1 className='text-4xl mt-11 underline decoration-[#E56617]'>Related Posts</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-6'>
          {related.map((item: any) => (
            <div key={item.post_id} className='flex flex-col  rounded-xl p-4 '>
                <Link href={`/posts/${item.post_id}`}>
                  <img src={item.image} width={100} height={100} alt='Post Image' className='w-full mb-2 rounded-lg' />
                  <h1 className='font-bold text-4xl'>{item.title.slice(0,30)}...</h1>
                  <p className=''>{item.subtitle.slice(0,50)} ...<span className='text-[#E56617] hover:text-red-900'> Read More</span></p>
                  <p className=' mt-2'>Published Date: {item.published_date}</p>
                </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
      </>
  );
}