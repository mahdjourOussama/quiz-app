"use client";
import Image from "next/image";

import { ThemeSwitch } from "@/components/ThemeSwitch";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ChevronLeft, ChevronRight, MenuIcon, RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname, useParams, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { clearLocalStorage } from "@/utils/helper";
export function Navbar() {
  const t = useTranslations();
  const { locale, id } = useParams();
  const path = usePathname();
  const router = useRouter();
  return (
    <div className=' w-full flex h-16 items-center justify-between p-4'>
      <Image
        src='/images/palastine-2.svg'
        alt='logo'
        width={70}
        height={40}
        onClick={() => router.replace("/" + locale)}
      />

      <h1 className='text-4xl font-bold'>
        {typeof id === "string" ? t(id) : t("title")}
      </h1>
      <div className=' gap-4 items-center  hidden md:flex '>
        <ThemeSwitch />
        <LanguageSwitch />
        <Button
          size='icon'
          variant='outline'
          onClick={() => clearLocalStorage()}
          className='flex items-center gap-2'
        >
          <RotateCcw />
        </Button>
        {path !== `/${locale}` && (
          <Button
            variant='ghost'
            size='lg'
            onClick={() => router.back()}
            className='flex items-center gap-2'
          >
            <span className='text-xl'>{t("back")}</span>
            {locale === "ar" ? (
              <ChevronLeft className='h-6 w-6' />
            ) : (
              <ChevronRight className='h-6 w-6' />
            )}
          </Button>
        )}
      </div>
      <div className='md:hidden flex items-center gap-4'>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MenuIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <div className='flex justify-center items-center gap-4 w-full'>
                <ThemeSwitch />
                <LanguageSwitch />
              </div>
            </DropdownMenuItem>
            {path !== `/${locale}` && (
              <DropdownMenuItem>
                <Button
                  variant='ghost'
                  size='lg'
                  onClick={() => router.back()}
                  className='flex items-center gap-2 w-full'
                >
                  <span className='text-xl w-full text-center'>
                    {t("back")}
                  </span>
                </Button>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
