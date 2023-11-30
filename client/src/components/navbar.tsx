"use client"
import Image from "next/image";
import Link from "next/link";
import Cookies from 'js-cookie';
import {destroy} from '@/components/API'
import { useState } from "react";

export default function Navbar(props: any) {
  const [isMenuVisible, setMenuVisibility] = useState(false);

  const toggleMenu = () => {
    setMenuVisibility(!isMenuVisible);
  };

  const Signout =async () => {
  Cookies.remove('jwt');
  window.location.reload();
}



  return (
    <div className="p-3">
      <nav className="p-6 border-2 border-gray-400 bg-[#2c2c2c] rounded-3xl flex items-center space-x-3 justify-between">
        <Link href={'/dashboard'}><Image
          src="https://picsum.photos/200"
          width={100}
          height={100}
          alt="Logo"
          className="rounded-full border-2 border-gray-100 hover:border-4"
        /></Link>
        <div className="flex items-center space-x-7">
          <ul className="text-[#FFFFFF] space-x-7 text-center hidden md:flex">
            <Link href={"/dashboard/category"}>
              <li className="hover:text-[#E56617]">Category</li>
            </Link>
            <Link href={"/dashboard/posts"}>
              <li className="hover:text-[#E56617]">Posts</li>
            </Link>
            <Link href={"/dashboard/trending"}>
              <li className="hover:text-[#E56617]">Trending</li>
            </Link>
          </ul>
          <button className="px-5 py-3 bg-blue-500 text-[#FFF6E0] rounded-lg hover:bg-blue-900 hidden md:inline" onClick={Signout}>
            Sign Out
          </button>
          <button className="md:hidden" onClick={toggleMenu}>
            <Image src={"/icons/menu.png"} width={40} height={20} alt="LOGO" />
          </button>
        </div>
      </nav>
      <div className={`flex items-center space-y-4 flex-col p-7 rounded-3xl bg-[#2f2f2f] text-center ${isMenuVisible ? "" : "hidden"}`} id="Menu">
        <ul className="text-[#FFFFFF] space-x-7 text-center">
          <Link href={"/dashboard/category"}>
            <li className="hover:text-[#E56617]">Category</li>
          </Link>
          <Link href={"/dashboard/posts"}>
            <li className="hover:text-[#E56617]">Posts</li>
          </Link>
          <Link href={"/dashboard/trending"}>
            <li className="hover:text-[#E56617]">Trending</li>
          </Link>
        </ul>
        <div>
        <button className="px-5 py-3 bg-blue-500 text-[#FFF6E0] rounded-lg hover:bg-blue-900" onClick={Signout}>
          Sign Out
        </button>
        </div>
      </div>
    </div>
  );
}
