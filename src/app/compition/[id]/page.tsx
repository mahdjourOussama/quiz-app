"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { compitions } from "@/utils/data";
import Image from "next/image";
import { dictionary } from "@/utils/dictionary";
import {
  calculatePosition,
  calculateTotalScore,
  clearData,
  randomize,
  saveData,
} from "@/utils/helper";
import { TParticipant } from "@/utils/types";
export default function Home() {
  const id = useParams().id;
  const compition = compitions.find((compition) => compition.id === id);
  const [data, setData] = useState<TParticipant[]>(
    compition?.participants || []
  );
  const router = useRouter();
  if (!compition) return null;
  function updateScore(
    score: number,
    item: TParticipant,
    subjectIndex?: number
  ): TParticipant[] {
    if (Number.isNaN(score)) score = 0;
    else if (score > 20) score = 20;
    else if (score < 0) score = 0;
    if (!item.subjects)
      return data.map((i) =>
        i.id === item.id
          ? {
              ...i,
              score: score,
            }
          : i
      );

    const newData =
      subjectIndex !== undefined
        ? data.map((i) =>
            i.id === item.id
              ? calculateTotalScore({
                  ...item,
                  subjects: item.subjects?.map((sub, i) =>
                    i === subjectIndex ? { ...sub, score: score } : sub
                  ),
                })
              : i
          )
        : data.map((i) =>
            i.id === item.id
              ? {
                  ...i,
                  score: score,
                }
              : i
          );
    return newData;
  }

  return (
    <main className='flex flex-col justify-center items-center h-full w-full px-6'>
      <div className=' w-full flex h-fit items-center justify-between p-4'>
        <Image
          src={compition?.logo}
          alt='logo'
          width={120}
          height={100}
          onClick={() => router.back()}
        />
        <h1 className='text-4xl font-bold'>
          {dictionary.compitions[compition.title]}
        </h1>
        <div className='flex gap-4'>
          <button
            className=' bg-blue-300 p-2 rounded-md '
            onClick={() => {
              setData(calculatePosition(data));
            }}
          >
            {dictionary.calculate_position}
          </button>
          <button
            className=' bg-blue-300 p-2 rounded-md '
            onClick={() => {
              saveData(data, compition.id);
            }}
          >
            {dictionary.save_data}
          </button>
          <button
            className=' bg-blue-300 p-2 rounded-md '
            onClick={() => {
              clearData(compition.id);
            }}
          >
            {dictionary.clear_data}
          </button>

          <button
            className=' bg-blue-300 p-2 rounded-md '
            onClick={() => {
              setData(
                data.map((i) => {
                  return { ...i, anonymized: true };
                })
              );
            }}
          >
            {dictionary.cript_names}
          </button>
          <button
            className=' bg-blue-300 p-2 rounded-md '
            onClick={() => {
              setData(
                data.map((i) => {
                  return { ...i, anonymized: false };
                })
              );
            }}
          >
            {dictionary.uncript_names}
          </button>
        </div>
      </div>

      {data.length > 0 && data ? (
        <div className='flex w-full flex-col items-center justify-between p-4 '>
          <table className='w-full'>
            <thead className='border border-black'>
              <tr>
                <th className='border-x border-black'>
                  {dictionary.table.name}
                </th>

                {data[0].subjects &&
                  data[0].subjects.map((subject, index) => (
                    <th key={index} className='border-x border-black'>
                      {dictionary.table[subject.name]}
                    </th>
                  ))}
                <th className='border-x border-black'>
                  {dictionary.table.score}
                </th>
                <th className='border-x border-black'>
                  {dictionary.table.placement}
                </th>
              </tr>
            </thead>
            <tbody className='border border-black'>
              {data.map((item) => (
                <tr key={item.id} className='border-b border-black'>
                  {item.anonymized ? (
                    <td className='text-center border-x border-black'>
                      {item.cripticName}
                    </td>
                  ) : (
                    <td
                      className='text-center border-x border-black'
                      onClick={() => {
                        const newData = data.map((i) =>
                          i.id === item.id ? randomize(i, compition.id) : i
                        );
                        setData(newData);
                        saveData(newData, compition.id);
                      }}
                    >
                      {item.name}
                    </td>
                  )}
                  {item.subjects &&
                    item.subjects.map((subject, index) => (
                      <td
                        key={index}
                        className='text-center border-x border-black'
                      >
                        <input
                          value={subject.score}
                          className='text-center w-fit '
                          type='number'
                          onChange={(e) => {
                            let score = parseFloat(e.target.value);
                            const newData = updateScore(score, item, index);
                            setData(newData);
                          }}
                        />
                      </td>
                    ))}
                  <td className='text-center border-x border-black'>
                    <input
                      type='number'
                      className='text-center '
                      value={item.score}
                      onChange={(e) => {
                        let score = parseFloat(e.target.value);
                        const newData = updateScore(score, item);
                        setData(newData);
                      }}
                    />
                  </td>
                  <td className='text-center border-x border-black'>
                    {item.placement}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h1>no data</h1>
      )}
    </main>
  );
}
