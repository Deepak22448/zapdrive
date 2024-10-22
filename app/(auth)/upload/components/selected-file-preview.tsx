import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { bytesToMB } from "@/lib/utils";
import { XIcon } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

interface SelectedFilePreviewProps {
  file: File;
  resetFile: () => void;
  progress: number;
}

export const SelectedFilePreview: FC<SelectedFilePreviewProps> = ({
  file,
  resetFile,
  progress,
}) => {
  const { name, type, size } = useFilePreview({ file });
  return (
    <div className="flex justify-between md:max-w-lg w-full border p-2 rounded-md gap-x-2">
      <figure className="flex grow  space-x-4">
        <Image src="/file.png" width={60} height={60} alt="file preview" />
        <figcaption className="flex flex-col truncate space-y-1 w-full">
          <span className="truncate"> {name} </span>
          <div className="space-x-2">
            <span className="text-muted-foreground"> {size} MB </span>
            <span className="text-muted-foreground"> {type}</span>
          </div>
          <Progress value={progress} className="w-full" />
        </figcaption>
      </figure>
      <Button variant="destructive" size="icon" onClick={resetFile}>
        <XIcon />
      </Button>
    </div>
  );
};

/**
 * Custom hook to extract and format details about a file for preview purposes.
 *
 * @param {Pick<SelectedFilePreviewProps, "file">} params - Object containing the file.
 * @returns {object} An object with details required for file to preview.
 */
const useFilePreview = ({
  file: { name, type, size },
}: Pick<SelectedFilePreviewProps, "file">) => {
  return {
    name,
    type,
    size: bytesToMB(size),
  };
};
