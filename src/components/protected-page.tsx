"use client";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/utils/firebase";
import Fault from "@/utils/error";
import { useEffect, useState } from "react";

type props = {
  children: React.ReactNode;
};

const ProtectedPage = ({ children }: props) => {
  const [user, setUser] = useState<null | object>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      throw new Fault(500, "Auth Error", "Contact Devs");
    }
    const authentication = getAuth();

    const unsubscribe = onAuthStateChanged(authentication, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <>Loading</>;
  if (!user)
    throw new Fault(
      403,
      "Forbidden Access",
      "You need to login to view content."
    );
  return <div>{children}</div>;
};

export default ProtectedPage;
