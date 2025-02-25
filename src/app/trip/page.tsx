"use client";
import TripCard from "@/components/trip/trip-card";
import AddCard from "@/components/trip/add-card";
import { TRIPS } from "@/data/trips";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Trip } from "@/types/trip";
import { db, auth } from "@/utils/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { User, onAuthStateChanged } from "firebase/auth";

const Page = () => {
  const [trips, setTrips] = useState<Trip[]>(TRIPS);
  const [trip, setTrip] = useState<Trip>({
    id: "",
    title: "",
    date: new Date(),
  });
  const [popup, setPopup] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchTrips(currentUser.uid);
        console.log("User is authenticated:", currentUser);
      } else {
        setUser(null);
        console.log("User is not authenticated");
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchTrips = async (userId: string) => {
    const q = query(collection(db, "trips"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    const tripsData = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        date: data.date?.toDate(),
        userId: data.userId,
      } as Trip;
    });

    setTrips(tripsData.filter((trip) => trip.title !== undefined));
  };

  const handleAdd = async () => {
    console.log(user?.uid);
    console.log("Entered handleAdd");
    if (user) {
      console.log("Entered if");
      const newTrip = { title: trip.title, date: trip.date, userId: user.uid };
      const docRef = await addDoc(collection(db, "trips"), newTrip);
      setTrips((prev) => [
        ...prev,
        { id: docRef.id, ...newTrip } as unknown as Trip,
      ]);
      setTrip({ id: "", title: "", date: new Date() });
    }
  };

  const handleDelete = (id: string) => {
    const filteredTrips = trips.filter((item) => item.id !== id);
    setTrips(filteredTrips);
  };
  return (
    <div className="flex flex-col w-full p-6 gap-y-2">
      <div className="text-4xl font-bold">My Trips</div>
      <div className="grid grid-cols-3 gap-2">
        {trips.map((trip, index) => (
          <TripCard
            key={index}
            id={trip.id}
            title={trip.title}
            date={trip.date}
            handleDelete={handleDelete}
          />
        ))}
        <AddCard popup={popup} setPopup={setPopup} />
      </div>
      <AlertDialog open={popup} data-testid="add-trip-title">
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Add a Trip</AlertDialogTitle>
          </AlertDialogHeader>
          <Input
            placeholder="title"
            onChange={(e) =>
              setTrip((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <AlertDialogCancel onClick={() => setPopup(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              handleAdd();
              setPopup(false);
            }}
          >
            Add
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Page;
