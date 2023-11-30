"use client"
import { useFormik } from 'formik';
import Navbar from '@/components/navbar';
import * as yup from 'yup';
import { getCategory, addPosts } from '@/components/API';
import { useEffect, useState } from 'react';
import { fileToBase64 } from '@/components/filetoBase64';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Posts = () => {
    const router = useRouter();
    const [categories, setCategories]: any = useState([]);
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


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: any = await getCategory();
        setCategories(data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, []);

  const formik: any = useFormik({
    initialValues: {
      title: '',
      subtitle: '',
      category_id: '',
      content: '',
      meta_title: '',
      meta_description: '',
      },
      validationSchema: yup.object().shape({
          title: yup.string().required("Title is Missing"),
          subtitle: yup.string().required("Subtitle is Missing"),
          category_id: yup.number().required("Category  is Missing"),
          content: yup.string().required("Content is Missing"),
          meta_title: yup.string().required("Meta title is Missing"),
          meta_description: yup.string().required("Meta description is Missing"),

    }),
    onSubmit: async (values: any) => {
        values = { ...values, image: file }
    if (!file) {
    console.error("Image is required");
    return;
  }
        await addPosts(values);
        router.push('/dashboard/posts/show')
        
    },
  });

  return (
    <>
      <Navbar />
            <Link href={'/dashboard/posts/show'}><button className="ml-6 px-5 py-3 bg-[#2c2c2c] text-[#FFFFFF] rounded-full hover:bg-slate-400 active:bg-slate-300">
                Show All
            </button></Link>
          <div className='container mx-auto my-16 pb-12'>
                 <div>
                    <label htmlFor="category_image" className="flex justify-center mb-10">
                      <Image src={file ? file : '/icons/AddImage.png'} width={250} height={100} alt="Category_image" />
                    </label>
                <input type="file" id="category_image" className="hidden" onChange={fileHandler} required={true} />
                </div>
        <form onSubmit={formik.handleSubmit} className='grid-cols-1 px-5'>
          <div className='mb-6'>
            <label className='text-2xl block mb-2'>Title:</label>
            <input
              type='text'
              name='title'
              value={formik.values.title}
              onChange={formik.handleChange}
              className='border-2 border-gray-300 pl-4 py-3 rounded-md focus:outline-none w-full'
            />
        {formik.touched.title && formik.errors.title ? (
        <p className='text-red-600 text-lg font-bold'>{formik.errors.title}</p>
        ) : null}

          </div>

          <div className='mb-6'>
            <label className='text-2xl block mb-2'>Subtitle:</label>
            <input
              type='text'
              name='subtitle'
              value={formik.values.subtitle}
              onChange={formik.handleChange}
              className='border-2 border-gray-300 pl-4 py-3 rounded-md focus:outline-none w-full'
            />
             {formik.touched.subtitle && formik.errors.subtitle ? (
            <p className='text-red-600 text-lg font-bold'>{formik.errors.subtitle}</p>
            ) : null}          
          </div>

          <div className='mb-6'>
            <label className='text-2xl block mb-2'>Category:</label>
            <select
              name='category_id'
              value={formik.values.category_id}
              onChange={formik.handleChange}
              className='border-2 border-gray-300 pl-4 py-3 rounded-md focus:outline-none w-full'
            >
              <option value=''>Select Category</option>
              {categories.map((category: any) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.category_name}
                </option>
              ))}
            </select>
            {formik.touched.category_id && formik.errors.category_id ? (
            <p className='text-red-600 text-lg font-bold'>{formik.errors.category_id}</p>
            ) : null}           
          </div>

         <div className='mb-6 col-span-2'>
            <label className='text-2xl block mb-2'>Content:</label>
            <textarea
              name='content'
              value={formik.values.content}
              onChange={formik.handleChange}
              className='border-2 border-gray-300 pl-4 py-3 rounded-md focus:outline-none w-full'
            />
            {formik.touched.content && formik.errors.content ? (
            <p className='text-red-600 text-lg font-bold'>{formik.errors.content}</p>
            ) : null}          
          </div>

          <div className='mb-6'>
            <label className='text-2xl block mb-2'>Meta Title:</label>
            <input
              type='text'
              name='meta_title'
              value={formik.values.meta_title}
              onChange={formik.handleChange}
              className='border-2 border-gray-300 pl-4 py-3 rounded-md focus:outline-none w-full'
            />
            {formik.touched.meta_title && formik.errors.meta_title ? (
            <p className='text-red-600 text-lg font-bold'>{formik.errors.meta_title}</p>
            ) : null}           
          </div>

          <div className='mb-6'>
            <label className='text-2xl block mb-2'>Meta Description:</label>
            <textarea
              name='meta_description'
              value={formik.values.meta_description}
              onChange={formik.handleChange}
              className='border-2 border-gray-300 pl-4 py-3 rounded-md focus:outline-none w-full'
            />
            {formik.touched.meta_description && formik.errors.meta_description ? (
            <p className='text-red-600 text-lg font-bold'>{formik.errors.meta_description}</p>
            ) : null}           
          </div>
          <div className='col-span-2'>
            <button
              type='submit'
              className='bg-blue-500 text-white px-10 py-3 rounded-full hover:bg-blue-600 focus:outline-none'
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Posts;
