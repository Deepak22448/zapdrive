"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CloudUploadIcon, UploadCloudIcon } from "lucide-react";
import { useRef, useState } from "react";
import { SelectedFilePreview } from "./selected-file-preview";
import { useUploadFile } from "./hooks/use-upload-file";
import { MAX_FILE_SIZE } from "@/firebase/storage/files";

export const UploadForm = () => {
  const { handleFileChange, file, resetFile, fileInputRef } = useUploadForm();
  const { upload, progress, isUploading } = useUploadFile({
    file,
  });
  return (
    <div className="space-y-5 relative">
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-primary border-dashed rounded-lg cursor-pointer bg-primary/10 dark:hover:bg-secondary hover:border-primary/50 hover:bg-secondary"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <CloudUploadIcon className="size-9 text-primary" />
            <p className="mb-2 text-lg md:text-xl text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (Max Size: 4MB)
            </p>
          </div>
          <input
            ref={fileInputRef}
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>
      {file ? (
        <>
          <SelectedFilePreview
            file={file}
            resetFile={resetFile}
            progress={progress}
          />
          <Button
            className="w-full md:w-min"
            disabled={!file || isUploading}
            onClick={upload}
          >
            <UploadCloudIcon className="mr-1" />
            {isUploading ? `Uploading` : "Upload"}
          </Button>
        </>
      ) : null}
    </div>
  );
};

const useUploadForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Reset the selected file.
  const resetFile = () => {
    if (fileInputRef.current) fileInputRef.current.value = "";
    setFile(null);
  };

  // Handle the file change event and set the selected file in the state.
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.size > MAX_FILE_SIZE) {
      toast({
        title: "File size is too large",
        description: "Please upload a file less than 4MB",
        variant: "destructive",
      });
      return;
    }

    setFile(selectedFile);
  };

  return {
    file,
    fileInputRef,
    handleFileChange,
    resetFile,
  };
};
