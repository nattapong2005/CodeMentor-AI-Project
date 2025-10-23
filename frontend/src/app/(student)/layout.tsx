'use client';
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const [isOpen, setIsOpen] = useState(true);
  return (
    <section className="flex min-h-screen">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}  />
        <div className="flex-grow p-5">
          {children}
        </div>
    </section>
  );
}