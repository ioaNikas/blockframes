import { functions } from './internals/firebase';
import * as backup from './backup';
import { Material } from './data/types';

///////////////////////////////////
// DOCUMENT ON-CHANGES FUNCTIONS //
///////////////////////////////////

export function onDocumentDelete(docPath: string, fn: Function) {
  return functions.firestore
  .document(docPath)
  .onDelete(backup.skipWhenRestoring(fn))
}

export function onDocumentUpdate(docPath: string, fn: Function) {
  return functions.firestore
  .document(docPath)
  .onUpdate(backup.skipWhenRestoring(fn));
}

export function onDocumentCreate(docPath: string, fn: Function) {
  return functions.firestore
  .document(docPath)
  .onCreate(backup.skipWhenRestoring(fn));
}

////////////////////
// MISC FUNCTIONS //
////////////////////

/**
 * Checks properties of two material to tell if they are the same or not.
 */
export function isTheSame(matA: Material, matB: Material): boolean {
  const getProperties = ({value, description, category}: Material) => ({ value, description, category });
  return JSON.stringify(getProperties(matA)) === JSON.stringify(getProperties(matB));
}
