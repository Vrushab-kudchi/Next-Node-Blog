"use client"
import Navbar from "@/components/navbar";
import { getDashboardPosts, deleteSinglePost } from "@/components/API";
import Image from "next/image";
import { useRouter } from 'next/navigation'; // Corrected the import
import { useEffect, useState } from "react"; // Added useState import

export default function ShowPosts() { // Corrected the component name to start with an uppercase letter
  const router = useRouter();
  const [response, setResponse] = useState([]); // Use state to store the response
  console.log(response)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: any = await getDashboardPosts();
        setResponse(data.data); // Update the state with the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures that the effect runs once after the initial render

  const handleDelete = async (postId: string) => {
    try {
      await deleteSinglePost(postId);
      router.push('/posts');
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-12 bg-[#272829] rounded-lg mb-20 p-4 overflow-x-auto text-white">
        <table className="w-full table-auto">
              <tr className="space-x-5">
              <th className="p-4">Post Id</th>
              <th className="p-4">Title</th>
              <th className="p-4">Subtitle</th>
              <th className="p-4">Published Date</th>
              <th className="p-4">Action</th>
            </tr>
          <tbody className="text-white">
            {response.map((item: any) => (
              <tr key={item.post_id} className="border-b border-gray-600 text-center">
                <td className="p-4">{ item.post_id}</td>
              <td className="p-4">{item.title}</td>
              <td className="p-4">{item.subtitle}</td>
                <td className="p-4">{item.published_date}</td>
                <td className="p-2 sm:w-1/6 md:w-1/6 lg:w-1/6 xl:w-1/6">
                  <div className="flex items-center justify-center space-x-6">
                    {/* ... (your existing JSX for buttons) */}
                    <button
                      onClick={() => handleDelete(item.post_id)} // Pass the post ID to handleDelete
                      className="focus:outline-none"
                    >
                      <Image
                        src="/icons/bin.svg"
                        width={10}
                        height={10}
                        alt="Delete"
                        className="hover:animate-pulse"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
