import { FaUser } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";

interface Teacher {
  id: number;
  name: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

const teachers: Teacher[] = [
  {
    id: 1,
    name: "Mr.Nattapong Nakaom",
  },
  {
    id: 2,
    name: "Mr.MarkHomePro Eiei",
  },
];

const users: User[] = [
  {
    id: 1,
    name: "สมชาย สหายพี",
    email: "somchai@gmail.com",
  },
  {
    id: 2,
    name: "สมปอง สยองกึ๋ม",
    email: "sompong@gmail.com",
  },

];

export default function Page() {
  return (
    <>
      <div>
        <h1 className="text-2xl">จัดการผู้ใช้งาน ปวช.1 เทคโนโลยีสารสนเทศ</h1>
        <h2 className="text-muted">จัดการนักเรียน นักศึกษาภายในชั้นเรียน</h2>
        <hr className="mt-2 mb-2 text-slate-300" />
      </div>
      <div className="mt-5">
        <h1 className="text-xl mt-2 m-2">อาจารย์</h1>
        {teachers.map((t) => (
          <div key={t.id} className="bg-white border border-gray-300 p-3 mb-2 hover:bg-slate-100">
            <div className="flex gap-3 items-center">
              <div className="bg-white border border-secondary text-secondary p-3 w-fit rounded-full">
                <FaUser />
              </div>
              <h2>{t.name}</h2>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <table className="w-full text-left bg-white border border-gray-300">
          <thead className="bg-secondary text-white">
            <tr>
              <th className="p-3 text-sm font-semibold">ชื่อ-สกุล</th>
              <th className="p-3 text-sm font-semibold hidden md:table-cell">อีเมล</th>
              <th className="p-3 text-sm font-semibold"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50">
                <td className="p-3 text-muted">
                  <div>
                    <div >{u.name}</div>
                    <div className="text-sm md:hidden">{u.email}</div>
                  </div>
                </td>
                <td className="p-3 text-muted hidden md:table-cell">{u.email}</td>
                <td className="p-4 text-right">
                  <button className="text-slate-500 hover:text-slate-700 p-2 rounded-full" aria-label="ตัวเลือก">
                    <HiDotsVertical />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
