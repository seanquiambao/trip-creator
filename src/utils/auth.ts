// utils/auth-server.ts
import { authAdmin } from "./firebase-admin";

// Initialize Firebase Admin SDK once

export const authenticate = async (token: string) => {
  try {
    const decodedToken = await authAdmin.verifyIdToken(token);
    return { uid: decodedToken.uid, email: decodedToken.email };
  } catch (err) {
    throw new Error("Invalid Token");
  }
};
