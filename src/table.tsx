"use client";

import { TParticipant } from "@/utils/types";
import { dictionary } from "@/utils/dictionary";
type props = {
  data: TParticipant[];
};
export default function Table({ data }: props) {
  return data.length > 0 && data ? (
    <div className='flex w-full items-center justify-between p-4'>
      <table className='w-full'>
        <thead className='border'>
          {Object.keys(data[0]).map((key) => (
            <th key={key} className='border-x'>
              {dictionary.table[key]}
            </th>
          ))}
        </thead>
        <tbody className='border'>
          {data.map((item) => (
            <tr key={item.id} className='border-b'>
              {Object.values(item).map((value, index) => (
                <td key={index} className='text-center border-x'>
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <h1>no data</h1>
  );
}
