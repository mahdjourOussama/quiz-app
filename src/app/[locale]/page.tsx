"use client";
import { compitions } from "@/utils/data";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
export default function Home() {
  const router = useRouter();
  const t = useTranslations();
  return (
    <main className='flex h-full  flex-col items-center justify-center '>
      <div className='flex  h-full w-full  items-center justify-evenly p-12 md:gap-20 gap-4  flex-wrap '>
        {compitions.map((compition, index) => (
          <Card
            className='w-full md:w-1/4 h-fit cursor-pointer text-center relative flex flex-col justify-between dark:bg-slate-600'
            key={index}
            onClick={() => {
              router.push(compition.link);
            }}
          >
            {/* <CardHeader>
              <CardTitle>{t(compition.title)}</CardTitle>
            </CardHeader> */}
            <CardContent className='flex flex-col items-center justify-center relative flex-grow '>
              <AspectRatio ratio={1 / 1} className='w-full h-full'>
                <Image
                  src={compition.logo}
                  alt={compition.title}
                  fill
                  sizes='100%'
                  quality={100}
                  className='rounded-sm h-full object-contain'
                />
              </AspectRatio>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
