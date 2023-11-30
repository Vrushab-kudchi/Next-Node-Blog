"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/navbar';
import { useRouter } from 'next/navigation';
import { getDashboardCategory, deleteDashboardCategory } from '@/components/API';

interface Category {
  category_id: number;
  category_name: string;
  category_image: string;
}

export default function ShowCategory() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: any = await getDashboardCategory();
        setCategories(data.data);
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handleDelete = async (category_id: number) => {
    try {
      const result: any = await deleteDashboardCategory(category_id);
      if (result.status === 200) {
        // Update the state after successful deletion
        setCategories((prevCategories) => prevCategories.filter((category) => category.category_id !== category_id));
        console.log('Category deleted successfully');
      } else {
        console.error('Error deleting category:', result.data.error);
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div>
      <Navbar name="Show" />
      <div className="container mx-auto mb-24 mt-12 text-center flex justify-center items-center text-[#FFF6E0] bg-[#272829] rounded-lg overflow-x-auto">
        <table className="table-auto w-full lg:w-4/5 xl:w-3/4">
          <thead>
            <tr className="space-x-5">
              <th className="p-4">Category Id</th>
              <th className="p-4">Category Name</th>
              <th className="p-4">Category Image</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody className="flex-rows justify-center items-center">
            {categories.map((item: Category) => (
              <tr key={item.category_id} className="">
                <td className="p-3">{item.category_id}</td>
                <td className="p-3">{item.category_name}</td>
                <td>
                  <Image
                    src={item.category_image}
                    width={10}
                    height={10}
                    alt="Category_Images"
                    className="m-2 sm:m-4 md:m-6 lg:m-8 xl:m-10 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-full"
                  />
                </td>
                <td className="flex items-center justify-center space-x-6 p-4">
                  <button className="items-center">
                    <Image src="/icons/pencil.svg" width={30} height={30} alt="Edit" className="hover:animate-pulse" />
                  </button>
                  <button onClick={() => handleDelete(item.category_id)}>
                    <Image src="/icons/bin.svg" width={30} height={30} alt="Delete" className="hover:animate-pulse" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
