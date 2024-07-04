import "server-only";

import admin from "firebase-admin";
import {
  FIREBASE_PRIVATE_KEY,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
} from "@/config";

export function createAdminApp() {
  const privateKey = FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n");

  const params = {
    projectId: FIREBASE_PROJECT_ID,
    clientEmail: FIREBASE_CLIENT_EMAIL,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    privateKey: FIREBASE_PRIVATE_KEY,
  };

  if (admin.apps.length > 0) {
    return admin.app();
  }

  const cert = admin.credential.cert({
    projectId: params.projectId,
    clientEmail: params.clientEmail,
    privateKey,
  });

  return admin.initializeApp({
    credential: cert,
    projectId: params.projectId,
    storageBucket: params.storageBucket,
  });
}
