import { auth, db } from "@/utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { NextResponse } from "next/server";
export const POST = async (req: Request) => {
  const res = NextResponse;
  if (!auth || !db) {
    return res.json({ message: "Firebase Error" }, { status: 500 });
  }

  const { username, email, password } = await req.json();
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Store user data in Firestore
    await setDoc(doc(db, "users", user.uid), {
      username,
      email,
      uid: user.uid,
    });

    return res.json({ message: "OK" }, { status: 200 });
  } catch (err) {
    return res.json(
      {
        message: `Internal Server Error: ${err}`,
      },
      { status: 500 }
    );
  }
};
