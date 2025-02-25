import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "@/utils/auth";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Trip } from "@/types/trip";
import { db } from "@/utils/firebase-client";
import { authAdmin } from "@/utils/firebase-admin";
export const GET = async (req: NextRequest) => {
  const res = NextResponse;

  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return res.json({ message: "No token provided." }, { status: 401 });
    }
    const decodedToken = await authenticate(token);

    const q = query(
      collection(db, "trips"),
      where("userId", "==", decodedToken.uid)
    );
    console.log("query before");
    const querySnapshot = await getDocs(q);
    console.log("query after");

    const tripsData = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        date: data.date?.toDate(),
        userId: data.userId,
      } as Trip;
    });

    return res.json({ message: "OK", items: tripsData }, { status: 200 });
    // logic to use user information for firebase queries
  } catch (err) {
    return res.json({ message: `${err}` }, { status: 500 });
  }
};

export const DELETE = async (req: NextRequest) => {
  const res = NextResponse;
  const body = await req.json();
  const { id } = body;

  try {
    await deleteDoc(doc(db, "trips", id));
    return res.json({ message: "OK" }, { status: 200 });
  } catch (err) {
    return res.json({ message: "Contact Developers" }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  const res = NextResponse;
  const body = await req.json();
  try {
    const docRef = await addDoc(collection(db, "trips"), body);

    return res.json(
      { message: "OK", items: { docRefId: docRef.id } },
      { status: 200 }
    );
  } catch (err) {
    return res.json({ message: `${err}` }, { status: 500 });
  }
};
