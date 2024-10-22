"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useRef, useState } from "react";
import { FileDoc, getAllUserFiles } from "@/firebase/db/files";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

const FilesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-4">
      <div className="flex gap-x-1 md:gap-x-3">
        <Input
          className="grow"
          placeholder="Enter file to search..."
          ref={searchInputRef}
        />
        <Button
          onClick={() => {
            setSearchTerm(searchInputRef.current?.value || "");
          }}
        >
          <SearchIcon className="size-4 hidden md:block mr-1" />
          Search
        </Button>
      </div>
      <FilesTable searchTerm={searchTerm} />
    </div>
  );
};

export default FilesPage;

function FilesTable({ searchTerm }: { searchTerm: string }) {
  const [files, setFiles] = useState<FileDoc[]>([]);
  const [isFetchingFiles, setIsFetchingFiles] = useState(true);
  const [searchResultFiles, setSearchResultFiles] = useState<FileDoc[]>([]);
  const { user } = useUser();

  useEffect(() => {
    if (!user || !user.primaryEmailAddress) return;

    getAllUserFiles(user.primaryEmailAddress.emailAddress).then((data) => {
      setIsFetchingFiles(false);
      setFiles(data);
    });
  }, [user]);

  useEffect(() => {
    if (!searchTerm) {
      setSearchResultFiles(files);
      return;
    }

    const filteredFiles = files.filter((file) =>
      file.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResultFiles(filteredFiles);
  }, [searchTerm, files]);

  return (
    <Table>
      <TableCaption>A list of all your files.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>FileName</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="text-right">Preveiw</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          // Show loading spinner if fetching files
          isFetchingFiles &&
            Array.from({ length: 3 }).map((_, index) => (
              <TableRow key={index}>
                {Array.from({ length: 4 }).map((_, index) => (
                  <TableCell key={index}>
                    <Skeleton className="h-10 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
        }
        {!isFetchingFiles &&
          searchResultFiles.map((file) => (
            <TableRow key={file.id}>
              <TableCell className="font-medium">{file.name}</TableCell>
              <TableCell>{file.size}MB</TableCell>
              <TableCell>{file.type}</TableCell>
              <TableCell className="text-right">
                <Link
                  href={`${process.env.NEXT_PUBLIC_BASE_URL}/upload/preview/${file.id}`}
                  className={buttonVariants({ variant: "link" })}
                >
                  View
                </Link>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">
            {files.length} files present
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
