import { NextResponse, NextRequest } from "next/server";
import { authenticate } from "@/utils/auth";
import { db } from "@/utils/firebase-client";
import { getDoc, doc, arrayUnion, updateDoc } from "firebase/firestore";

type props = {
  params: { tripid: string };
};
export const POST = async (req: NextRequest, { params }: props) => {
  const res = NextResponse;

  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return res.json({ message: "No token provided." }, { status: 401 });
    }
    const decodedToken = await authenticate(token);

    const docRef = doc(db, "trips", params.tripid);

    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
      return res.json({ message: "Trip does not exist" }, { status: 404 });
    }

    const docData = snapshot.data();
    const updatedDays = [...(docData.days || []), { events: [] }];

    if (docData.userId !== decodedToken.uid) {
      return res.json({ message: "Insufficient Permissions" }, { status: 403 });
    }

    await updateDoc(docRef, {
      days: updatedDays,
    });

    return res.json({ message: "OK" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
