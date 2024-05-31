import { dictionary } from "@/utils/dictionary";
import Image from "next/image";

export default function Navbar() {
  return (
    <div className=' w-full flex h-16 items-center justify-between p-4'>
      <Image src='/logo.png' alt='logo' width={50} height={50} />
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
