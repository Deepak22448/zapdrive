import { db } from "@/firebase.config";
import {
  collection,
  CollectionReference,
  DocumentData,
} from "firebase/firestore";

/**
 * Use this function to create a new collection reference insted of using the collection function from "firebase/firestore".
 * Create a new collection reference.
 * @param {string} collectionName - The collection name.
 * @returns {CollectionReference} The collection reference.
 */
export const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(db, collectionName) as CollectionReference<T>;
};
