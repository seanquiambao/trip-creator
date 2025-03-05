import { NextResponse, NextRequest } from "next/server";
import { authenticate } from "@/utils/auth";
import { db } from "@/utils/firebase-client";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { Day } from "@/types/trip";

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

    if (docData.userId !== decodedToken.uid) {
      return res.json({ message: "Insufficient Permissions" }, { status: 403 });
    }

    const updatedDays = [...(docData.days || []), { activities: [] }];
    await updateDoc(docRef, {
      days: updatedDays,
    });

    return res.json({ message: "OK" }, { status: 200 });
  } catch (err) {
    return res.json(
      { message: "Internal Server Error", dev: err },
      { status: 500 }
    );
  }
};

export const PUT = async (req: NextRequest, { params }: props) => {
  const res = NextResponse;

  const { selectedDay, activity } = await req.json();

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

    if (docData.userId !== decodedToken.uid) {
      return res.json({ message: "Insufficient Permissions" }, { status: 403 });
    }

    const newDays = docData.days.map((day: Day, index: number) => {
      if (index === selectedDay) {
        const old = day.activities;

        day.activities = [...old, activity];
        return day;
      }

      return day;
    });

    await updateDoc(docRef, {
      days: newDays,
    });

    return res.json({ message: "OK" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return res.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
