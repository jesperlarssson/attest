
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import Table from "@/components/Table";
import { exampleDataArray } from "@/lib/dummy-backend";



export default function Home() {

  
  return (
    <ProtectedRoute>
<Navbar />

    <main className="flex min-h-screen w-full flex-col container mx-auto mt-16">
     {/* <List /> */}
     <Table data={exampleDataArray} />

    </main>
    {/* <div className='absolute left-0 bottom-0 p-4 opacity-60'>
        <span className='font-semibold text-gray-600 text-sm'>
        Provided by: 
        </span>
        <Image width={200} height={50} alt='Meridion' src={"/images/meridion.png"} />
      </div> */}
      <Footer />
    </ProtectedRoute>
  )
}
