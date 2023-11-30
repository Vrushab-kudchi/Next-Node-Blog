import Image from "next/image"
import Link from "next/link"

export default function ClientNavbar() {
  return (
    <div className="h-24 p-5 bg-[#2c2c2c] flex items-center">
      <div className=" container mx-auto flex items-center justify-between">
        <Link href={'/'}><Image src='/Logo/logo-light.png' width={150} height={100} alt="Compnay Logo"/></Link>
        <ul className="md:space-x-6 space-x-4 flex items-center">
          <Link href={'/'}><li className="text-[#FFFFFF] font-bold hover:text-[#E56617]">Home</li></Link>
          <Link href={'/posts'}><li className="text-[#FFFFFF] font-bold hover:text-[#E56617]">Posts</li></Link>
          <Link href={'/login'}><button className="bg-[#E56617] px-5 py-3 rounded-full text-[#2c2c2c] font-bold hover:bg-[#9b572c] hover:text-[#FFFFFF]">Login</button></Link>
        </ul>
      </div>
    </div>
  )
}
