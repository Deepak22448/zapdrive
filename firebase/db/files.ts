import { bytesToMB } from "@/lib/utils";
import {
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
  QueryConstraint,
} from "firebase/firestore";
import { createCollection } from "./utils";

interface CreateFileDocProps {
  file: File;
  fileUrl: string;
  user: {
    email: string;
    name: string;
  };
}

export interface FileDoc {
  name: string;
  type: string;
  size: string;
  url: string;
  userEmail: string;
  userName: string;
  password: string;
  id: string;
}

const filesCollection = createCollection<FileDoc>("files");
/**
 * Create a new document in the "files" collection.
 * @param {CreateFileDocProps} file - The file object.
 * @param {string} docId - The document ID.
 *
 */
export const createFileDoc = async (
  { file, fileUrl, user }: CreateFileDocProps,
  docId: string
) => {
  const { name, type, size } = file;

  return await setDoc(doc(filesCollection, docId), {
    name,
    type,
    size: bytesToMB(size),
    url: fileUrl,
    userEmail: user.email,
    userName: user.name,
    password: "",
    id: docId,
  });
};

/**
 * Get a document from files collection by its ID.
 * @param {string} docId - The document ID.
 * @returns {Promise<DocumentData>} The document data.
 */
export const getFileDocById = async (docId: string) => {
  const docRef = doc(filesCollection, docId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error("No such document!");
  }
};

/**
 * Update a document form files collection by its ID.
 * @param {string} docId - The document ID.
 * @param {Partial<FileDoc>} data - The data to update.
 */
export const updateFileDoc = async (docId: string, data: Partial<FileDoc>) => {
  const docRef = doc(filesCollection, docId);
  await updateDoc(docRef, data);
};

/**
 * Get all documents from files collection which belongs to the current loggedin user.
 * @returns {Promise<FileDoc[]>} The documents data.
 */
export const getAllUserFiles = async (
  userEmail: string,
  ...queryConstraints: QueryConstraint[]
) => {
  const q = query(
    filesCollection,
    where("userEmail", "==", userEmail),
    ...queryConstraints
  );
  const querySnapshot = await getDocs(q);
  const data: FileDoc[] = [];

  querySnapshot.forEach((doc) => {
    data.push(doc.data() as FileDoc);
  });

  return data;
};
