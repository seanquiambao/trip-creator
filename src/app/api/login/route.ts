import { auth, db } from "@/utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { NextResponse } from "next/server";
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
    const user = userCredential.user;

    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      console.log("Err");
      return res.json({ message: "Incorrect email/password" }, { status: 400 });
    }

    return res.json({ message: "OK" }, { status: 200 });
  } catch (err: unknown) {
    const errorCode = extractErrorCode(err);
    if (errorCode === "auth/invalid-credential") {
      return res.json(
        { message: "Incorrect email/password " },
        { status: 401 }
      );
    }

    console.log("hello");
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
