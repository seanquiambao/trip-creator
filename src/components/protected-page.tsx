"use client";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/utils/firebase";
import Fault from "@/utils/error";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type props = {
  children: React.ReactNode;
};

const ProtectedPage = ({ children }: props) => {
  const router = useRouter();
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
  if (!user) {
    router.push("/");
  }
  return <div>{children}</div>;
};

export default ProtectedPage;
