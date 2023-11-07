
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import List from "@/components/List"


export default function Home() {
  return (
    <ProtectedRoute>
<Navbar />

    <main className="flex min-h-screen w-full flex-col container mx-auto mt-16">
     <List />
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
