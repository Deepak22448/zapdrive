"use client";
import Image from "next/image";
import { Button, buttonVariants } from "./ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Link from "next/link";
import { ScrollArea } from "./ui/scroll-area";
import { HomeIcon, LogOutIcon, MenuIcon, UploadIcon } from "lucide-react";
import { ThemeModeDropDown } from "./theme-mode-dropdown";
import { useClerk, useUser } from "@clerk/nextjs";
import { SidebarLink } from "@/app/(auth)/components/sidebar";

const SIDEBAR_LINKS = [
  {
    name: "Home",
    icon: HomeIcon,
    path: "/",
  },
  { name: "upload", icon: UploadIcon, path: "/upload" },
];

export const Header = () => {
  return (
    <header className="h-16 container mx-auto px-2 md:px-0 flex justify-between items-center border-b">
      <div className="flex gap-x-2 items-center">
        <Logo />
        <Links />
      </div>
      <div className="flex items-center space-x-2">
        <ThemeModeDropDown />
        <MobileMenu />
      </div>
    </header>
  );
};

const Logo = () => {
  return (
    <Link href="/">
      <Image src="/zapdrive.png" alt="Logo" width={100} height={100} />
    </Link>
  );
};

const Links = () => {
  return (
    <nav className="hidden md:block">
      <Link
        href="/"
        className={`${buttonVariants({
          variant: "link",
          className: "p-0",
        })} p-0`}
      >
        Home
      </Link>
      <Link
        href="/upload"
        className={`${buttonVariants({
          variant: "link",
          className: "p-0",
        })} p-0`}
      >
        Upload
      </Link>
    </nav>
  );
};

export function MobileMenu() {
  const { signOut } = useClerk();
  const { user } = useUser();
  return (
    <div className="md:hidden">
      <Drawer direction="left">
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
            <div className=" pb-0 flex flex-col divide-y">
              {SIDEBAR_LINKS.map(({ name, icon: Icon, path }) => (
                <SidebarLink path={path} key={path}>
                  <li className="flex">
                    <Icon />
                    <span className="ml-4">{name}</span>
                  </li>
                </SidebarLink>
              ))}
              {user && (
                <SidebarLink
                  path="#"
                  className="bg-destructive flex hover:bg-destructive/80"
                  onClick={() => signOut({ redirectUrl: "/" })}
                >
                  <LogOutIcon />
                  <span className="ml-4">Logout</span>
                </SidebarLink>
              )}
            </div>
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
