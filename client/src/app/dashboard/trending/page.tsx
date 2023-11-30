"use client"
import Navbar from "@/components/navbar";
import { dashboardtrending } from '@/components/API';
import { useFormik} from "formik";
import * as yup from 'yup';
import { addTrending } from '@/components/API'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TrendingDashboard() {
  const router = useRouter();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      try {
        const response: any = await dashboardtrending();
        setData(response.data);
      } catch (error) {
        console.error("Error fetching trending posts:", error);
      }
    };

    fetchTrendingPosts();
  }, []);

  const formik = useFormik({
    initialValues: {
      post_id: '',
    },
    onSubmit: values => {
      addTrending(values)
      router.push('/dashboard/trending/show')
    },
  });

  return (
    <>
      <Navbar />
      <Link href={'/dashboard/trending/show'}><button className="ml-6 px-5 py-3 bg-[#2c2c2c] text-[#FFFFFF] rounded-full hover:bg-slate-400 active:bg-slate-300">
        Show All
      </button></Link>      
      <div className="container mx-auto mt-12">
        <h1 className="text-3xl ml-5">Add New Trending Posts</h1>
        <form className="space-x-24 p-5" onSubmit={formik.handleSubmit}>
          <select
            name="post_id"
            value={formik.values.post_id}
            className="px-14 py-4 mt-10"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option></option>
            {data.map((item: any) => (
              <option key={item.post_id} value={item.post_id}>
                {item.title}
              </option>
            ))}
          </select>
          {formik.touched.post_id && formik.errors.post_id ? (
            <div className="text-red-700">{formik.errors.post_id}</div>
          ) : null}
          <button
            type="submit"
            className="bg-[#2c2c2c] px-12 py-3 rounded-full text-white hover:bg-gray-500"
          >
            Add
          </button>
        </form>
      </div>
    </>
  );
}
