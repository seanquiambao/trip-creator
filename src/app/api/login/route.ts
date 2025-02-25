import { auth, db } from "@/utils/firebase-client";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NextResponse } from "next/server";
import admin from "firebase-admin";
import { cookies } from "next/headers";

export const POST = async (req: Request) => {
  const res = NextResponse;
  if (!auth || !db) {
    return res.json({ message: "Firebase Error" }, { status: 500 });
  }

  const { email, password } = await req.json();
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = await userCredential.user.getIdToken(); // Get ID token
    await admin.auth().verifyIdToken(token);
    cookies().set("token", token, { httpOnly: true, secure: true, path: "/" });
    return res.json({ message: "OK" }, { status: 200 });
  } catch (err: unknown) {
    const errorCode = extractErrorCode(err);
    if (errorCode === "auth/invalid-credential") {
      return res.json(
        { message: "Incorrect email/password " },
        { status: 401 }
      );
    }

    return res.json(
      {
        message: `Internal Server Error: Contact Developers`,
      },
      { status: 500 }
    );
  }
};

function extractErrorCode(err: unknown): string | null {
  return typeof err === "object" && err !== null && "code" in err
    ? (err as { code: string }).code
    : null;
}
