"use client";

import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { getClassroom } from "@/app/utils/classroom";
import MyModal from "@/app/components/Modal";

interface Classroom {
  class_id: number;
  class_name: string;
  description: string;
  class_color: string;
}


export default function Page() {

  const [classroom, setClassroom] = useState<Classroom[]>([]);
  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  // }

  const fetchClassroom = async () => {
    try {
      const classroom = await getClassroom();
      setClassroom(classroom);
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchClassroom();
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
        {classroom.map((c) => (
          <div key={c.class_id} className="bg-white border border-gray-300 rounded-lg hover:shadow-lg duration-300 transition-all">
            <div className={` h-28 p-5 relative `}>
              <h1 className="text-2xl">{c.class_name}</h1>
              <h2>{c.description}</h2>
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
