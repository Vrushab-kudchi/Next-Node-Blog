"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/navbar';
import { deletetrending, getdashboardTrending } from '@/components/API';

export default function ShowTrending() {
  const [trendingData, setTrendingData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: any = await getdashboardTrending();
        setTrendingData(data.data);
      } catch (error) {
        console.error('Error fetching trending data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handleDelete = async (trendingId: number) => {
    try {
      const result = await deletetrending(trendingId);
      // Handle result if needed
    } catch (error) {
      console.error('Error deleting trending item:', error);
    }
  };

  return (
    <>
      <Navbar name="Show" />
      <div className="container mx-auto w-[550px] mt-12 text-center flex justify-center items-center text-[#FFF6E0] bg-[#272829] rounded-lg">
        <table className="table-auto ">
          <thead>
            <tr className="space-x-5">
              <th className="w-1/4 p-4 ">Trending Id</th>
              <th className="w-1/4 p-4">Title</th>
              <th className="w-1/2 p-4">Action</th>
            </tr>
          </thead>
          <tbody className="flex-rows justify-center items-center">
            {trendingData.map((item: any) => (
              <tr key={item.category_id} className="">
                <td className="p-3">{item.trending_id}</td>
                <td>{item.title}</td>
                <td className="flex items-center justify-center space-x-6 p-16">
                  <button className="items-center ">
                    <Image src="/icons/pencil.svg" width={30} height={30} alt="Edit" className="hover:animate-pulse" />
                  </button>
                  <button onClick={() => handleDelete(item.trending_id)}>
                    <Image src="/icons/bin.svg" width={30} height={30} alt="Delete" className="hover:animate-pulse" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
