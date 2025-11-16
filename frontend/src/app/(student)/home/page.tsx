"use client";

import { getAssignment } from "@/app/services/assignment";
import { getMyEnrollment } from "@/app/services/enrollment";
import { getMe } from "@/app/services/user";
import { Assignment } from "@/app/types/assignment";
import { User } from "@/app/types/user";
import { useEffect, useState } from "react";
import { FaBook } from "react-icons/fa";
import { IoMegaphone } from "react-icons/io5";

export default function Page() {

  const [assignment, setAssignment] = useState<Assignment[]>([]);
  const [enrollment, setEnrollment] = useState<User>();
  const [me, setMe] = useState<Me>()

  const fetchAssignment = async () => {
    try {
      const assignment = await getAssignment();
      setAssignment(assignment);
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

  const fetchEnrollment = async () => {
    try {
      const enrollment = await getMyEnrollment();
      setEnrollment(enrollment);
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchAssignment();
    fetchEnrollment();
    fetchMe();
  }, [])

  return (
    <>
      <div className="bg-primary p-5 rounded-2xl">
        <div className="flex flex-wrap gap-2 justify-between items-center">
          <div>
            <h1 className="text-white text-xl sm:text-2xl">สวัสดีคุณ, {me?.name} {me?.lastname}</h1>
            <p className="text-gray-300 text-lg sm:text-xl mt-1">{enrollment?.enrollments?.[0]?.classroom?.class_name}</p>
            {/* <p className="text-gray-300 text-lg sm:text-xl mt-1">ปวช.1 เทคโนโลยีสารสนเทศ</p> */}
          </div>
          <div>
            <button className="bg-white text-primary rounded-xl  px-5 py-1.5">ออกจากระบบ</button>
          </div>
        </div>
      </div>
      <div className="mt-5 ms-2 mb-3">
        {/* <h2 className="text-2xl font-bold ">งานที่ได้รับมอบหมาย</h2> */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-5 items-start">
        <div className="order-2 md:order-1 flex flex-col gap-5">
          {assignment.map((work) => (
            <div
              key={work.assignment_id}
              className=" bg-white p-5 rounded-xl border border-gray-300 cursor-pointer hover:shadow-md duration-300 transition-all"
            >
              <div className="flex items-center gap-5">
                <div className="p-4 bg-gray-200 rounded-full">
                  <FaBook className="text-2xl" />
                </div>
                <div>
                  <h2 className="text-blue-900 text-sm sm:text-lg font-bold mb-2">
                    {me?.name} {me?.lastname} โพสต์งานใหม่: {work.title}
                  </h2>
                  <p className="text-gray-500 text-sm">โพสต์เมื่อ: {work.create_at}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="order-1 md:order-2 bg-white rounded-xl border border-gray-300">
          <div className="flex items-center">
            <IoMegaphone className="text-xl ms-2" />
            <h2 className="p-3 font-bold text-lg">ประกาศทั่วไป</h2>
          </div>
          <div className="px-3 mb-2 flex flex-col space-y-2">
            {
              assignment.map((a) => (
                <div key={a.assignment_id} className="bg-white border border-gray-300 p-2 rounded-lg">
                  <p>{a.title}</p>
                  <p className="text-xs">{a.create_at}</p>
                </div>
              ))
            }
          </div>

        </div>
      </div>
    </>
  );
}
