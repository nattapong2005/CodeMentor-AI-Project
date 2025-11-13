"use client";

import { useEffect, useState } from "react";
import { getEnrollmentById } from "../utils/enrollment";

interface Enrollment {
  class_id: number;
  class_name: string;
  description: string;
  class_color: string;
}


export default function Page() {

  const [enrollment, setEnrollment] = useState<Enrollment[]>([]);
  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  // }

  const fetchEnrollment = async () => {
    try {
      const myEnrollment = await getEnrollmentById();
      setEnrollment(myEnrollment);
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchEnrollment();
  }, [])

  return (
    <>
      <div className="flex justify-between items-start sm:item-center mb-2 mt-2">
        <div>
          <h1 className="text-2xl">ชั้นเรียนของคุณ</h1>
          <h2>ยินดีต้อนรับ, Mr.Nattapong Nakaom</h2>
        </div>
       
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {enrollment.map((e) => (
          <div key={e.class_id} className="bg-white border border-gray-300 rounded-lg hover:shadow-lg duration-300 transition-all">
            <div className={` h-28 p-5 relative `}>
              <h1 className="text-2xl">{e.class_name}</h1>
              <h2>{e.description}</h2>
            </div>
            <div className="flex justify-end p-5">
              <p className="text-lg">9999 คน</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
