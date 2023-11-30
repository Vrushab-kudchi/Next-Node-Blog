"use client"
import Navbar from "@/components/navbar"
import Link from "next/link"
import Image from "next/image"
import { useFormik } from "formik"
import * as yup from 'yup'
import { postCategory } from '@/components/API'
import { useState } from "react"
import { fileToBase64 } from "@/components/filetoBase64"
import { redirect } from "next/dist/server/api-utils"
import { useRouter } from 'next/navigation'
export default function Category() {
   const router = useRouter()
   const [file, setFile] = useState(null);

  const fileHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const selectedFile = event.target.files?.[0];

  if (selectedFile) {
    try {
      const base64Data: any = await fileToBase64(selectedFile);
      setFile(base64Data);
    } catch (error) {
      console.error("Error converting to base64:", error);
    }
  }
};


    const formik = useFormik({
        initialValues: {
            category_name: '',
        },
        validationSchema: yup.object().shape({
            category_name: yup.string().required('Category name is required').min(5, "Too Small like Your pp")
        }),
        onSubmit: async (values: {category_name: string}) => {
          try {
             const combinedValue: {
              category_image: string;
              category_name: string;
            } = { ...values, category_image: file || '' };
            const response: any = await postCategory(combinedValue);
              router.push('/dashboard/category/show');
                } catch (error) {
                // Handle the error
                console.error('Error posting category:', error);
            }
        },
    });

    return (
        <>
        <Navbar name="Category" />
            {/* Main Input Field */}
            <Link href={'/dashboard/category/show'}><button className="ml-6 px-5 py-3 bg-[#2c2c2c] text-[#FFFFFF] rounded-full hover:bg-slate-400 active:bg-slate-300">
                Show All
            </button></Link>
            <div className="container mx-auto mt-20 ">
                <div>
                    <label htmlFor="category_image" className="flex justify-center">
                        <Image src={file? file : '/icons/AddImage.png'} width={250} height={100} alt="Category_image" />
                    </label>
                <input type="file" id="category_image" className="hidden" onChange={fileHandler} />
                </div>

                <form onSubmit={formik.handleSubmit} encType="multipart/form-data" className="mt-10 container mx-auto rounded-lg p-5 md:flex space-y-4 space-x-5 items-center">
                    <h1 className="text-2xl ml-5">Category</h1>
                    <input
                        type="text"
                        className="flex-grow rounded-full bg-transparent border-2 border-slate-200 py-2 px-4 focus:border-none focus:outline-none text-slate-800 text-2xl"
                        name="category_name"
                        value={formik.values.category_name}
                        onChange={formik.handleChange}
                    />
                     {formik.touched.category_name && formik.errors.category_name ?
                        (
                            <div className="text-red-500 font-bold">{ formik.errors.category_name}</div>
                    ): null}
                    <button type="submit" className="bg-slate-600 p-4 text-white rounded-full hover:bg-slate-800 active:bg-slate-950">Add Category</button>
                </form>
            </div>
        </>
    )
}
