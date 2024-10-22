import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-secondary h-28">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 h-full">
        <div className="sm:flex sm:items-center sm:justify-between h-full">
          <div className="flex justify-center sm:justify-start">
            <Link href="/">
              <Image src="/zapdrive.png" alt="Logo" width={100} height={100} />
            </Link>
          </div>
          <p className="mt-4 text-center text-sm lg:mt-0 lg:text-right">
            Copyright &copy; 2022. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
