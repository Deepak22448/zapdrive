import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts the file size from bytes to megabytes (MB).
 *
 * @param {number} bytes - The size of the file in bytes.
 * @returns {string} The size of the file in megabytes, rounded to 2 decimal places.
 */
export const bytesToMB = (bytes: number) => {
  const ONE_MB = 1024 * 1024;
  return (bytes / ONE_MB).toFixed(2);
};

// returns a random string of 6 characters
export const generateRandomString = () => {
  return (Math.random() + 1).toString(36).substring(7);
};
