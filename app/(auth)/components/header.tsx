"use client";
import Image from "next/image";
import Link from "next/link";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarLinks } from "./sidebar";
import { ThemeModeDropDown } from "@/components/theme-mode-dropdown";
import { useState } from "react";

export const Header = () => {
  return (
    <header className="h-16 w-full border-b flex items-center px-2 md:px-0 justify-between">
      <Logo />
      <div className="flex space-x-2 w-full px-2 justify-end">
        <MobileMenu />
        <ThemeModeDropDown />
      </div>
    </header>
  );
};

const Logo = () => {
  return (
    <Link href="/" className="md:hidden">
      <Image src="/zapdrive.png" alt="Logo" width={100} height={100} />
    </Link>
  );
};

const MobileMenu = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <div className="md:hidden">
      <Drawer
        direction="left"
        open={isDrawerOpen}
        onOpenChange={(open) => setIsDrawerOpen(open)}
      >
        <DrawerTrigger asChild>
          <Button variant="outline" size="icon">
            <MenuIcon className="text-primary" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-screen top-0 right-auto left-0 mt-0 w-4/5 max-w-md rounded-none">
          <ScrollArea className="h-screen">
            <DrawerHeader>
              <DrawerTitle>
                <Logo />
              </DrawerTitle>
            </DrawerHeader>
            <SidebarLinks onLinkClick={() => setIsDrawerOpen(false)} />
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
