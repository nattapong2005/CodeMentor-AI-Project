"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <>
      <section className="flex min-h-screen justify-center items-center">
        <div className="text-center">
          <h1 className="text-4xl mb-5">ไม่พบหน้าที่เรียกใช้</h1>
          <button onClick={() => router.back()}>ย้อนกลับ</button>
        </div>
      </section>
    </>
  );
}
