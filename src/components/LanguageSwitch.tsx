"use client";

import * as React from "react";
import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

const locales = ["en", "ar", "fr"];
export function LanguageSwitch() {
  const t = useTranslations("language");
  const path = usePathname();
  return (
    <div className='flex w-fit items-center justify-center py-4    '>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' size='icon'>
            <Languages className='h-[1.2rem] w-[1.2rem]' />
            <span className='sr-only'>{t("action")}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='center'>
          {locales.map((locale) => (
            <DropdownMenuItem
              key={locale}
              className='flex items-center justify-between'
            >
              <Link href={path} locale={locale}>
                {t(locale)}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
