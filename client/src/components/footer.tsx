import Image from "next/image"
import { getTrendingPost, getposts } from '@/components/API'
import Link from "next/link";
export default async function Footer() {
  const data: any = await getTrendingPost();
  const trending = data.data.slice(0, 5);

  const PostData: any =await getposts();
  const posts = PostData.data.slice(0, 5);
  
  return (
    <>
    <div className="p-6 mt-8 bg-[#2c2c2c] items-center text-center mt-12 ">
        <div className="container mx-auto flex-rows lg:flex items-center md:space-x-32">
        <Image src='/Logo/logo-light.png' height={1} width={250} alt="Company Logo" className="items-center mb-7" />
        <div>
          <h1 className="text-[#FFFFFF] font-extrabold text-2xl mt-6">Trending</h1>
          <ul className="space-y-3 mt-4">
            {trending.map((item: any) => {
              return (
                <Link key={item.post_id} href={`/posts/${item.post_id}`}><li className="text-[#FFFFFF] font-bold underline decoration-[#E56617] hover:text-[#E56617]">{item.title}</li></Link>
                );
            })}
          </ul>
        </div>
        <div>
          <h1 className="text-[#FFFFFF] font-extrabold text-2xl mt-6">Latest Posts</h1>
          <ul className="space-y-3 mt-4">
            {posts.map((item: any) => {
              return (
                <Link key={item.post_id} href={`/posts/${item.post_id}`}><li className="text-[#FFFFFF] font-bold underline decoration-[#E56617] hover:text-[#E56617]">{item.title}</li></Link>
                );
            })}
          </ul>
        </div>  
      </div>
    </div>
       <div className="font-bold md:pb-8 text-[#E56617] text-center bg-[#2c2c2c] p-4">
        <a href="mailto:kudchivrushab@gmail.com" className="hover:text-white">Need a website or web application? Contact me for your project!</a>
        </div>

  </>
  )
}
