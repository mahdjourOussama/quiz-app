"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { compitions } from "@/utils/data";
import Image from "next/image";
import { TParticipant } from "@/utils/types";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useTranslations } from "next-intl";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { saveData } from "@/utils/helper";

export default function Home() {
  const id = useParams().id;
  const compition = compitions.find((compition) => compition.id === id);
  const [data, setData] = useState<TParticipant[]>(
    compition?.participants || []
  );
  const t = useTranslations();
  const [selected, setSelected] = useState<TParticipant | null>(null);
  useEffect(() => {
    saveData(data, compition?.id || "");
  }, [data, compition?.id]);
  if (!compition) return null;
  return (
    <main className='flex h-full flex-col justify-center items-center w-full px-6'>
      <div className='md:grid grid-cols-[30%_70%] h-full w-full  items-center justify-center md:p-12 p-4 gap-12 flex flex-col'>
        <div className='w-full col-span-1 flex flex-col relative justify-center items-center'>
          <AspectRatio
            ratio={1 / 1}
            className='flex justify-center items-center'
          >
            <Image src={compition?.logo} alt='logo' fill />
          </AspectRatio>
          {selected ? (
            <div className='flex flex-col items-center justify-center '>
              <h1 className='text-2xl font-bold flex gap-4 justify-center items-center'>
                <span>{t("placement")}</span>
                <span>{selected.placement + 1}</span>
              </h1>
              <h1 className='text-2xl font-bold'>{selected.name}</h1>
              <h2 className='text-xl  flex gap-4 justify-center items-center'>
                <span>{t("total_score")}</span>
                <span>{selected.score}</span>
              </h2>
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center'>
              <h1 className='text-2xl font-bold'>{t(compition.title)}</h1>
            </div>
          )}
        </div>

        <DataTable
          setData={setData}
          columns={columns}
          data={data}
          selectStudent={(student: TParticipant) => setSelected(student)}
        />
      </div>
    </main>
  );
}
