"use client";
import { useParams } from "next/navigation";
import React from "react";
import Table from "@/components/table";
import { students } from "@/utils/data";
import Navbar from "@/components/navbar";
export default function Home() {
  const id = useParams().id;
  return (
    <main className='flex flex-col justify-center items-center h-full w-full px-6'>
      <Navbar />
      <div className='flex justify-between items-center '>
        <button className=' bg-blue-300'></button>
        <h1>Compition {id}</h1>
      </div>
      <Table data={students} />
    </main>
  );
}
