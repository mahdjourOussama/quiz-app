"use client";
import Navbar from "@/components/navbar";
import { compitions } from "@/utils/data";
import { dictionary } from "@/utils/dictionary";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className='flex min-h-screen flex-col items-center justify-start gap-20'>
      <Navbar />
      <div className='flex gap-12 h-full w-full  items-center justify-around p-24'>
        <Image
          className='rounded-md'
          src='/images/cup2.png'
          alt='cup2'
          width={100}
          height={800}
        />
        {compitions.map((compition, index) => (
          <div
            key={index}
            className='flex flex-col items-center justify-center gap-4 rounded-md border-2 p-4 cursor-pointer hover:shadow-lg border-gray-300'
            onClick={() => {
              router.push(compition.link);
            }}
          >
            <Image
              src={compition.logo}
              alt={compition.title}
              width={200}
              height={100}
              className='rounded-sm'
            />
            <a
              href={compition.link}
              className='text-2xl font-bold text-black text-center'
            >
              {dictionary.compitions[compition.title]}
            </a>
          </div>
        ))}
        <Image
          className='rounded-md'
          src='/images/cup1.png'
          alt='cup1'
          width={100}
          height={800}
        />
      </div>
    </main>
  );
}
