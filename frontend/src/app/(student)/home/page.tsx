
import { assignments } from "@/app/data/assignment";
import { FaBook } from "react-icons/fa";
import { IoMegaphone } from "react-icons/io5";

const teacher: string = "Mr.Nattapong Nakaom";


interface announce {
  id: number;
  title: string;
  create_at: string;
}

const announce: announce[] = [
  {
    id: 1,
    title: "วันนี้เป็นวันเสาร์",
    create_at: "2023-05-01",
  },
  {
    id: 2,
    title: "ไม่มีเรียนจ้า",
    create_at: "2023-05-01",
  },
]

export default function Page() {
  return (
    <>
      <div className="bg-primary p-5 rounded-2xl">
        <div className="flex flex-wrap gap-2 justify-between items-center">
          <div>
            <h1 className="text-white text-xl sm:text-2xl">สวัสดีคุณ, {teacher}</h1>
            <p className="text-gray-300 text-lg sm:text-xl mt-1">20000-9999 การเขียนโปรแกรมไพธอนเบื้องต้น</p>
            <p className="text-gray-300 text-lg sm:text-xl mt-1">ปวช.1 เทคโนโลยีสารสนเทศ</p>
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
          {assignments.map((work) => (
            <div
              key=  {work.id}
              className=" bg-white p-5 rounded-xl border border-gray-300 cursor-pointer hover:shadow-md duration-300 transition-all"
            >
              <div className="flex items-center gap-5">
                <div className="p-4 bg-gray-200 rounded-full">
                  <FaBook className="text-2xl" />
                </div>
                <div>
                  <h2 className="text-blue-900 text-sm sm:text-lg font-bold mb-2">
                    {teacher} โพสต์งานใหม่: {work.title}
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
              announce.map((a) => (
                <div key={a.id} className="bg-white border border-gray-300 p-2 rounded-lg">
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
