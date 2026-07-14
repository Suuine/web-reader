const DB_NAME = 'ReaderDB';
const DB_VERSION = 1;
const STORE_NAME = 'user_progress';

export interface UserProgress {
  username: string;
  readChapters: number[];
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'username' });
      }
    };
  });
}

export async function getUserProgress(username: string): Promise<UserProgress> {
  if (!username) return { username: '', readChapters: [] };
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(username);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        resolve(request.result || { username, readChapters: [] });
      };
    });
  } catch (error) {
    console.error('Failed to get user progress from IndexedDB:', error);
    return { username, readChapters: [] };
  }
}

export async function saveUserProgress(username: string, readChapters: number[]): Promise<void> {
  if (!username) return;
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put({ username, readChapters });
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  } catch (error) {
    console.error('Failed to save user progress to IndexedDB:', error);
  }
}
