import { getFileDocById } from "@/firebase/db/files";
import Image from "next/image";
import { FC } from "react";

export type FileInfoProps = Awaited<ReturnType<typeof getFileDocById>>;

export const FileInfo: FC<FileInfoProps> = ({ url, name }) => {
  return (
    <figure className="relative lg:w-2/5 self-stretch h-60 w-full lg:h-auto">
      <Image src={url} alt={name} fill className="object-contain" />
    </figure>
  );
};
