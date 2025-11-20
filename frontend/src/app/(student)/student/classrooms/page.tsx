"use client";

import { getMyEnrollment } from "@/app/services/enrollment";
import { getMe } from "@/app/services/user";
import { Enrollment } from "@/app/types/enrollment";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function Page() {

  const [enrollment, setEnrollment] = useState<Enrollment[]>([]);
  const [me, setMe] = useState<any>();
  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  // }

  const fetchEnrollment = async () => {
    try {
      const myEnrollment = await getMyEnrollment();
      setEnrollment(myEnrollment.enrollments);
    } catch (err) {
      console.error(err)
    }
  }
  const fetchMe = async () => {
    try {
      const me = await getMe();
      setMe(me);
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchEnrollment();
    fetchMe();
  }, [])

  return (
    <>
      <div className="flex justify-between items-start sm:item-center mb-2 mt-2">
        <div>
          <h1 className="text-2xl">ชั้นเรียนของคุณ</h1>
          <h2>ยินดีต้อนรับ, {me?.name} {me?.lastname}</h2>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {enrollment.map((e) => (
          <Link key={e.enrollment_id} href={`/student/classrooms/${e.classroom.class_id}`}>
            <div className="bg-white border border-gray-300 rounded-lg hover:shadow-lg duration-300 transition-all">
              <div className={` h-28 p-5 relative `}>
                <h1 className="text-2xl">{e.classroom.class_name}</h1>
                <h2>{e.classroom.description}</h2>
              </div>
              <div className="flex justify-end p-5">
                <p className="text-lg">9999 คน</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}