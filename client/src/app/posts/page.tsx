import Link from 'next/link';
import { getposts } from '@/components/API';
import ClientNavbar from '@/components/ClientNavbar';
import Footer from '@/components/footer';

export default async function Posts() {
  try {
    const response: any = await getposts();
    const data = response.data || [];

    // Check if data array is empty, throw an error if true
    if (data.length === 0) {
      throw new Error('No data found');
    }

    return (
      <>
        <ClientNavbar />
      <div className='container mx-auto p-10'>
        <h1 className='my-10 text-4xl text-[#E56617] font-bold'>Posts</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-6'>
          {data.map((item: any) => (
            <div key={item.post_id} className='flex flex-col bg-[#2C2C2C] rounded-xl p-4 text-[#ffffff]'>
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
  } catch (error: any) {
    console.error('An error occurred while fetching data:', error);
    return (
      <div className='container mx-auto p-10'>
        <p>{error.message || 'Error fetching data'}</p>
      </div>
    );
  }
}
