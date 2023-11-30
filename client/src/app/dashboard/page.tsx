
import Navbar from "@/components/navbar"
import { verify } from "@/components/API"
import { useRouter } from "next/navigation";
export default async function Dashboard() {
  // const router = useRouter();
  // const response: any = await verify();
  // if (response.status == 401 || response.error)
  // {
  //   router.push('/')
  // }
  // console.log(response)
  return (
    <div>
      <Navbar/>
      <h1>This is DashBoard</h1>
    </div>
  )
}
