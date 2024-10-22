import { createFileDoc } from "@/firebase/db/files";
import { createFile, getFileDownloadUrl } from "@/firebase/storage/files";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@clerk/nextjs";
import { StorageError, UploadTaskSnapshot } from "firebase/storage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface UseUploadFileProps {
  file?: File | null;
}

// Custom hook responsible for uploading a file.
export const useUploadFile = ({ file }: UseUploadFileProps) => {
  const [progress, setProgress] = useState(0);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useUser();

  // Reset the state when a new file is selected.
  useEffect(() => {
    const resetState = () => {
      setIsUploaded(false);
      setProgress(0);
      setIsUploading(false);
    };
    resetState();
  }, [file]);

  // Track the progress of the file upload.
  const trackProgress = (snapshot: UploadTaskSnapshot) => {
    setIsUploading(true);
    setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
  };
  // Show an error message when the file upload fails.
  const showUploadError = () => {
    toast({
      title: "Unable to upload file",
      variant: "destructive",
    });
  };
  // Show a success message when the file upload is complete
  const showUploadSuccess = () => {
    toast({
      title: "File uploaded",
      description: "Your file has been uploaded successfully",
      variant: "default",
    });
    setIsUploaded(true);
    setIsUploading(false);
  };
  // Show a default error message when an error occurs.
  const showDefaultError = () => {
    toast({
      title: "An error occurred",
      description: "Please try again later",
      variant: "destructive",
    });
  };
  // Upload the file to the storage bucket.
  const upload = async () => {
    if (!file || !user) return;

    const fileId = uuidv4();
    try {
      const uploadTask = createFile(file, fileId);
      uploadTask.on(
        "state_changed",
        trackProgress,
        showUploadError,
        async () => {
          if (!user.primaryEmailAddress) return;

          const downloadUrl = await getFileDownloadUrl(fileId);
          await createFileDoc(
            {
              file,
              fileUrl: downloadUrl,
              user: {
                email: user.primaryEmailAddress.emailAddress,
                name: user.fullName!,
              },
            },
            fileId
          );
          showUploadSuccess();
          router.push(`/upload/preview/${fileId}`);
        }
      );
    } catch (error) {
      if (error instanceof StorageError) {
        showUploadError();
      } else {
        showDefaultError();
      }
    }
  };

  return { progress, upload, isUploaded, isUploading };
};
