
"use client";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";

export function withAuth<P>(WrappedComponent: React.ComponentType<P>) {
  return function ProtectedRoute(props: P) {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        redirect("/login");
      } else {
        setLoading(false);
      }
    }, [router]);

    if (loading) return <p>Loading...</p>;
    return <WrappedComponent {...props} />;
  };
}
