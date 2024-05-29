"use client";
import Navbar from "@/components/navbar";
import { compitions } from "@/utils/data";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className='flex min-h-screen pt-24 flex-col items-center justify-center'>
      <Navbar />
      <div className='flex gap-12 h-full w-full  items-center justify-around p-24'>
        {compitions.map((compition, index) => (
          <div
            key={index}
            className='flex flex-col items-center justify-center gap-4 rounded-md border-2 p-4 cursor-pointer hover:shadow-lg border-blue-200'
            onClick={() => {
              router.push(compition.link);
            }}
          >
            <Image
              src={compition.logo}
              alt='logo'
              width={300}
              height={300}
              className='rounded-sm'
            />
            <a
              href={compition.link}
              className='text-2xl font-bold text-blue-500'
            >
              {compition.title}
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
