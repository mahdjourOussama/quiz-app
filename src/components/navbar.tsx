"use client";
import { dictionary } from "@/utils/dictionary";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  return (
    <div className=' w-full flex h-16 items-center justify-between p-4'>
      <Image
        src='/vercel.svg'
        alt='logo'
        width={100}
        height={100}
        onClick={() => router.back()}
      />
      <h1 className='text-4xl font-bold'>{dictionary.navbar.title}</h1>

      <h1 suppressHydrationWarning>
        {new Date().toLocaleDateString("ar", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </h1>
    </div>
  );
}
