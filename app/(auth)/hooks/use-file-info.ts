import { getFileDocById } from "@/firebase/db/files";
import { useEffect, useState } from "react";

interface UseFileInfoProps {
  fileId: string;
}
export type FileInfo = Awaited<ReturnType<typeof getFileDocById>>;

export const useFileInfo = ({ fileId }: UseFileInfoProps) => {
  const [isFetching, setIsFetching] = useState(true);
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);

  useEffect(() => {
    const fetchFileInfo = async () => {
      try {
        const data = await getFileDocById(fileId);
        setFileInfo(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchFileInfo();
  }, [fileId]);

  return { fileInfo, isFetching };
};
