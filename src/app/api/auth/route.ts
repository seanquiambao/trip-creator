import admin from "firebase-admin";
import { NextRequest, NextResponse } from "next/server";

// Initialize Firebase Admin SDK once

export const POST = async (req: NextRequest) => {
  const res = NextResponse;

  try {
    const { token } = await req.json();
    if (!token) {
      return res.json({ message: "No token provided." }, { status: 401 });
    }
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log("DECODED:", decodedToken);
    return res.json(
      { items: { uid: decodedToken.uid, email: decodedToken.email } },
      { status: 200 }
    );
  } catch (err) {
    return res.json({ message: "Invalid Token" }, { status: 401 });
  }
};
