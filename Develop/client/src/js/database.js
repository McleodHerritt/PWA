import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

export const putDb = async (content) => {
  const db = await openDB("jate", 1);
  const transaction = db.transaction("jate", "readwrite");
  const store = transaction.objectStore("jate");
  const addRequest = store.add({ content });
  const result = await addRequest;
  console.log("Data saved to the database", result);
};
// export const putDb = async (content) => console.error("putDb not implemented");

export const getDb = async (key = Date.now()) => {
  const db = await openDB("jate", 1);
  const transaction = db.transaction("jate", "readonly");
  const store = transaction.objectStore("jate");
  const getRequest = store.get(key);
  const result = await getRequest;
  console.log("Data retrieved from the database", result);
  return result?.content;
};
// export const getDb = async () => console.error("getDb not implemented");

initdb();
