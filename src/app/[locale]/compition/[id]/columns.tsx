"use client";

import { Button } from "@/components/ui/button";
import { TParticipant } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useTranslations } from "next-intl";

export const columns: ColumnDef<TParticipant>[] = [
  {
    accessorKey: "code",
    header: ({ column }) => {
      return (
        <Button
          className='flex w-full justify-start'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <TranslatedSpan column={"code"} />
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          className='flex w-full justify-start'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <TranslatedSpan column={"name"} />
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: "school",
    header: ({ column }) => {
      return (
        <Button
          className='flex w-full justify-start'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <TranslatedSpan column={"school"} />
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: "oral_score",
    header: ({ column }) => {
      return (
        <Button
          className='flex w-full justify-start'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <TranslatedSpan column={"oral_score"} />
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const placement = row.getValue("oral_score");
      return (
        <span className='w-full flex justify-center items-center'>
          {placement === null ? "-" : Number(placement)}
        </span>
      );
    },
  },
  {
    accessorKey: "written_score",
    header: ({ column }) => {
      return (
        <Button
          className='flex w-full justify-start'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <TranslatedSpan column={"written_score"} />
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const placement = row.getValue("written_score");
      return (
        <span className='w-full flex justify-center items-center'>
          {placement === null ? "-" : Number(placement)}
        </span>
      );
    },
  },
  {
    accessorKey: "score",
    header: ({ column }) => {
      return (
        <Button
          className='flex w-full justify-start'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <TranslatedSpan column={"total_score"} />
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const placement = row.getValue("score");
      return (
        <span className='w-full flex justify-center items-center'>
          {placement === null ? "-" : Number(placement)}
        </span>
      );
    },
  },
  {
    accessorKey: "placement",
    header: ({ column }) => {
      return (
        <Button
          className='flex w-full justify-start'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <TranslatedSpan column={"placement"} />
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const placement = row.getValue("placement");
      return (
        <span className='w-full flex justify-center items-center'>
          {placement === null ? "-" : Number(placement)}
        </span>
      );
    },
  },
];

export function TranslatedSpan({ column }: { column: string }) {
  const t = useTranslations();
  return <span>{t(column)}</span>;
}
