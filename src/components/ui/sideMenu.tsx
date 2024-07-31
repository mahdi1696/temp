"use client";

import React, { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/primitives/button";
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerTrigger,
} from "@/components/primitives/drawer";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {};

export default function SideMenu({}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Drawer
        direction="right"
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
        }}
        onClose={() => setIsOpen(false)}
      >
        <DrawerTrigger asChild>
          <Menu
            className="hover:cursor-pointer"
            size={24}
            onClick={() => setIsOpen(true)}
          />
        </DrawerTrigger>

        <DrawerOverlay className="fixed inset-0 bg-black/40" />
        <DrawerContent className="bg-background py-1 gap-1 flex flex-col rounded-l-[10px] h-full w-[400px] max-w-[70%] mt-24 fixed bottom-0 right-0">
          {/*  <div className=" flex flex-col gap-1 h-full"> */}
          <Link href="/">
            <Button
              variant="ghost"
              className={`w-full ${
                pathname === "/" ? "bg-blue-500 text-white" : ""
              }`}
              onClick={handleLinkClick}
            >
              صفحه اول
            </Button>
          </Link>

          <Link href="/tables/company">
            <Button
              variant="ghost"
              className={`w-full ${
                pathname === "/tables/company" ? "bg-blue-500 text-white" : ""
              }`}
              onClick={handleLinkClick}
            >
              مدیریت اوراق
            </Button>
          </Link>
          <Link href="/addInstrument">
            <Button
              variant="ghost"
              className={`w-full ${
                pathname.startsWith("/addInstrument")
                  ? "bg-blue-500 text-white"
                  : ""
              }`}
              onClick={handleLinkClick}
            >
              اضافه کردن اوراق
            </Button>
          </Link>
          <Link href="/portfolio/parse">
            <Button
              variant="ghost"
              className={`w-full ${
                pathname.startsWith("/portfolio/parse")
                  ? "bg-blue-500 text-white"
                  : ""
              }`}
              onClick={handleLinkClick}
            >
              تجزیه پرتفوی
            </Button>
          </Link>
          <Link href="/updateReports">
            <Button
              variant="ghost"
              className={`w-full ${
                pathname.startsWith("/updateReports")
                  ? "bg-blue-500 text-white"
                  : ""
              }`}
              onClick={handleLinkClick}
            >
              بروز رسانی اطلاعیه
            </Button>
          </Link>
          <Link href="/syncPriceInfo">
            <Button
              variant="ghost"
              className={`w-full ${
                pathname.startsWith("/syncPriceInfo")
                  ? "bg-blue-500 text-white"
                  : ""
              }`}
              onClick={handleLinkClick}
            >
              بروز رسانی اطلاعات قیمتی
            </Button>
          </Link>
          <Link href="/syncNav">
            <Button
              variant="ghost"
              className={`w-full ${
                pathname.startsWith("/syncNav") ? "bg-blue-500 text-white" : ""
              }`}
              onClick={handleLinkClick}
            >
              بروز رسانی اطلاعات NAV
            </Button>
          </Link>
          <Link href="/jobManager">
            <Button
              variant="ghost"
              className={`w-full ${
                pathname.startsWith("/jobManager")
                  ? "bg-blue-500 text-white"
                  : ""
              }`}
              onClick={handleLinkClick}
            >
              مدیریت سرویس ها
            </Button>
          </Link>
          <Link href="/holiday">
            <Button
              variant="ghost"
              className={`w-full ${
                pathname.startsWith("/holiday") ? "bg-blue-500 text-white" : ""
              }`}
              onClick={handleLinkClick}
            >
              مدیریت روزهای تعطیل
            </Button>
          </Link>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
