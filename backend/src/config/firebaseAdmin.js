import { initializeApp, cert } from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";

import fs from "fs";

const serviceAccount = JSON.parse(
  fs.readFileSync(
    new URL("../../serviceAccountKey.json", import.meta.url),
    "utf8"
  )
);

const firebaseApp = initializeApp({
  credential: cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

export const database = getDatabase(firebaseApp);

export default firebaseApp;