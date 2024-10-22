import { storage } from "@/firebase.config";
import {
  ref,
  StorageError,
  uploadBytesResumable,
  StorageErrorCode,
  getDownloadURL,
  getBlob,
} from "firebase/storage";

/**
 * Uploads a file to Firebase storage if the file size is within the allowed limit.
 *
 * @param {File} file - The file object to be uploaded.
 * @param {string} fileId - A unique identifier for the file, used to store it in Firebase.
 * @throws {StorageError} If the file size exceeds the maximum limit.
 * @returns {UploadTask} The upload task that allows monitoring the progress of the upload.
 */
export const createFile = (file: File, fileId: string) => {
  // Check if the file size is too large.
  if (file.size > MAX_FILE_SIZE) {
    throw new StorageError(StorageErrorCode.CANCELED, "File size is too large");
  }

  const metaData = {
    contentType: file.type,
  };
  const fileRef = ref(storage, `files/${fileId}`);
  return uploadBytesResumable(fileRef, file, metaData);
};

export const ONE_MB = 1024 * 1024;
// The maximum file size allowed for uploads is 4MB.
export const MAX_FILE_SIZE = 4 * ONE_MB;

// Get the download URL for a file.
export const getFileDownloadUrl = async (fileId: string) => {
  const fileRef = ref(storage, `files/${fileId}`);
  return await getDownloadURL(fileRef);
};

/**
 * Download a file from the storage bucket in the browser using blob.
 * @param fileId - The ID of the file to download.
 * @param fileName - The name of the file to download.
 * @returns A promise that resolves when the download is complete.
 */
export const download = async ({
  fileId,
  fileName,
}: {
  fileId: string;
  fileName: string;
}) => {
  const fileRef = ref(storage, `files/${fileId}`);
  const blob = await getBlob(fileRef);

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;
  link.click();
};
