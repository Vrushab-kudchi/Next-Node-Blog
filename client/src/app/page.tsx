import { getTrendingPost } from '@/components/API';
import Link from 'next/link';
import ClientNavbar from '@/components/ClientNavbar';
import Footer from '@/components/footer';

export default async function Home() {
  const data: any = await getTrendingPost();
  const trendingPost: any = data.data;

  if (!trendingPost || trendingPost.length === 0) {
    return (
      <div className="container mx-auto">
        <h1 className="text-4xl my-6 font-bold my-12">No Trending Posts</h1>
      </div>
    );
  }

  // Rest of your code when trendingPost is not empty

  return (
    <>
      <ClientNavbar />
      <div className="container mx-auto p-5">
        <h1 className="my-10 text-4xl text-[#E56617] font-bold">Trending Blogs</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {trendingPost.map((item: any) => (
            <div key={item.post_id} className='flex flex-col bg-[#2C2C2C] rounded-xl p-4 text-[#ffffff]'>
              <Link href={`/posts/${item.post_id}`}>
                <img src={item.image} width={100} height={100} alt='Post Image' className='w-full mb-2 rounded-lg' />
                <h1 className='font-bold text-4xl'>{item.title.slice(0, 30)}...</h1>
                <p className=''>{item.subtitle.slice(0, 50)} ...<span className='text-[#E56617] hover:text-red-900'> Read More</span></p>
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
