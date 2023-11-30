"use client"
import ClientNavbar from "@/components/ClientNavbar";
import Image from "next/image";
import { login } from "@/components/API"
import * as yup from 'yup';
import { Formik, useFormik } from "formik";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const formik: any = useFormik({
    initialValues: {
      username: "",
      password: ""
    }, validationSchema: yup.object().shape({
      username: yup.string().required("Username is Required"),
      password: yup.string().required("Password is Required")
    }),onSubmit:async values => {
       try {
    const response: any = await login(values);
    // console.log(response)
    if (response.status == 200) {
      router.push('/dashboard')
    } else {
      // Set an error message in the component state
      formik.setFieldError('general', 'Wrong username or password');
    }
  } catch (error: any) {
    console.error(error.message);
  }
    },
  })
  return (
    <>
      <ClientNavbar />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <Image
            className="mx-auto h-10 w-auto rounded-full"
            src="https://picsum.photos/200"
            width={120}
            height={120}
            alt="Your Company"
          /> */}
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <div>
              {formik.errors.general && (
                 <div className="text-red-500 font-bold text-center">Wrong username and password</div>
              )}
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="username"
                  autoComplete="username"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {formik.touched.username && formik.errors.username ?
                (<p className="text-red-500">{formik.errors.username}</p>): null}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  autoComplete="current-password"
                  className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {formik.touched.password&& formik.errors.password ?
                (<p className="text-red-500">{formik.errors.password}</p>): null}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              No New Account is Allowed
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
