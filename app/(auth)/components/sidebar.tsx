"use client";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { FC, PropsWithChildren } from "react";
import { usePathname } from "next/navigation";
import { FileIcon, LogOutIcon, UploadIcon } from "lucide-react";
import { useClerk } from "@clerk/nextjs";

const SIDEBAR_LINKS = [
  { name: "upload", icon: UploadIcon, path: "/upload" },
  {
    name: "files",
    icon: FileIcon,
    path: "/files",
  },
];

export const Sidebar = () => {
  return (
    <aside className="hidden md:flex md:w-64 fixed h-screen flex-col inset-y-0 border-r">
      <div className="h-16 border-b flex justify-center items-center">
        <Link href="/">
          <Image src="/zapdrive.png" alt="Logo" width={150} height={125} />
        </Link>
      </div>
      <nav>
        <SidebarLinks />
      </nav>
    </aside>
  );
};

export const SidebarLinks = ({ onLinkClick }: { onLinkClick?: () => void }) => {
  const { signOut } = useClerk();

  return (
    <ul className="divide-y">
      {SIDEBAR_LINKS.map(({ name, icon: Icon, path }) => (
        <SidebarLink path={path} key={path} onClick={onLinkClick}>
          <li className="flex">
            <Icon />
            <span className="ml-4">{name}</span>
          </li>
        </SidebarLink>
      ))}
      <SidebarLink
        path="#"
        className="bg-destructive flex hover:bg-destructive/80"
        onClick={() => signOut({ redirectUrl: "/" })}
      >
        <LogOutIcon />
        <span className="ml-4">Logout</span>
      </SidebarLink>
    </ul>
  );
};

interface SidebarLinkProps extends PropsWithChildren {
  path: string;
  className?: string;
  onClick?: () => void;
}
export const SidebarLink: FC<SidebarLinkProps> = ({
  path,
  children,
  className,
  onClick,
}) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(path);

  return (
    <Link
      href={path}
      onClick={onClick}
      className={cn(
        "block px-2 py-3 hover:bg-secondary transition-[background-color] ease-out capitalize",
        { "bg-secondary text-primary": isActive },
        className
      )}
    >
      {children}
    </Link>
  );
};
