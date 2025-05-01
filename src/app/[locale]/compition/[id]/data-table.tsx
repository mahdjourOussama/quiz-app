"use client";
import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { TCompitionsID, TParticipant } from "@/utils/types";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { calculatePosition, generateUniqueCode } from "@/utils/helper";
import { useParams } from "next/navigation";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  selectStudent: (student: TData) => void;
  setData: React.Dispatch<React.SetStateAction<TData[]>>;
}
type TInputs = {
  oral_score: number;
  written_score: number;
  score: number;
  code: number;
};
export function DataTable<TData, TValue>({
  columns,
  data,
  selectStudent,
  setData,
}: DataTableProps<TData, TValue>) {
  const t = useTranslations();

  const id = useParams().id;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),

    state: {
      sorting,
    },
  });
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<TParticipant | null>(null);

  const form = useForm<TInputs>({
    defaultValues: {
      oral_score: selected?.oral_score || 0,
      written_score: selected?.written_score || 0,
      score: selected?.score || 0,
      code: selected?.code,
    },
  });
  const onSubmit: SubmitHandler<TInputs> = (data) => {
    console.log(data);
    setData((prev) => {
      const newData = [...prev];
      const index = prev.findIndex(
        (item) => (item as TParticipant).id === selected?.id
      );
      if (index !== -1) {
        newData[index] = {
          ...newData[index],
          oral_score: data.oral_score,
          written_score: data.written_score,
          score: data.score,
          code: data.code,
        };
      }

      return calculatePosition(newData as TParticipant[]) as TData[];
    });
    setOpen(false);
  };
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "oral_score" || name === "written_score") {
        const oral = Number(value.oral_score || 0);
        const written = Number(value.written_score || 0);
        form.setValue("score", (oral + written) / 2);
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);
  useEffect(() => {
    if (selected) {
      form.setValue("oral_score", selected.oral_score || 0);
      form.setValue("written_score", selected.written_score || 0);
      form.setValue("score", selected.score || 0);
      form.setValue("code", selected.code || 0);
    }
  }, [selected, form]);
  return (
    <div className='w-full '>
      <div className='rounded-md border bg-white dark:bg-slate-900 shadow-md'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, idx) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => {
                    selectStudent(row.original);
                    setSelected(row.original as TParticipant);
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className='px-4 py-2'>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center md:justify-end justify-center gap-4 space-x-2 py-4'>
        <Button
          variant='outline'
          size='lg'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {t("back")}
        </Button>
        <Button
          variant='outline'
          size='lg'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {t("next")}
        </Button>
        <Button
          variant='outline'
          size='lg'
          onClick={() => {
            if (!selected || selected.code) return;
            const code = generateUniqueCode(id as TCompitionsID);
            const newData = [...data];
            const index = data.findIndex(
              (item) => (item as TParticipant).id === selected.id
            );
            if (index !== -1) {
              newData[index] = {
                ...newData[index],
                code: code,
              };
            }
            console.log(code);
            setData(newData as TData[]);
          }}
          disabled={!selected || selected.code !== undefined}
        >
          {t("encrypt")}
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant='outline' disabled={!selected}>
              {t("edit")}
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:w-full p-8'>
            <DialogHeader>
              <DialogTitle className='flex justify-center items-center gap-4'>
                <span>{t("edit_score_description")}</span>
                <span>{selected?.code}</span>
              </DialogTitle>
              <DialogDescription className='flex justify-center items-center gap-4'>
                {t("edit_score_description")}
              </DialogDescription>
            </DialogHeader>
            <FormProvider {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='grid gap-4'
              >
                <FormField
                  control={form.control}
                  name='code'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("code")}</FormLabel>
                      <FormControl>
                        <Input
                          id='code'
                          type='number'
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        {t("ecrypt_description")}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='oral_score'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("oral_score")}</FormLabel>
                      <FormControl>
                        <Input
                          id='oral_score'
                          type='number'
                          max={20}
                          min={0}
                          step={0.25}
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        {t("oral_score_description")}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='written_score'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("written_score")}</FormLabel>
                      <FormControl>
                        <Input
                          id='written_score'
                          type='number'
                          max={20}
                          step={0.25}
                          min={0}
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        {t("written_score_description")}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='score'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("total_score")}</FormLabel>
                      <FormControl>
                        <Input
                          id='score'
                          type='number'
                          max={20}
                          min={0}
                          {...field}
                          disabled
                        />
                      </FormControl>
                      <FormDescription>
                        {t("score_description")}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type='submit'>{t("save")}</Button>
              </form>
            </FormProvider>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
