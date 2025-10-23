'use client';

import { mockUsers } from "@/app/data/users";
import { FaUser, FaUserTie } from "react-icons/fa";

export default function Page() {
  return (
    <main className="p-6 max-w-6xl mx-auto space-y-10">
      <section>
        <h1 className="text-2xl font-bold text-gray-800 flex gap-3"><FaUserTie/> อาจารย์</h1>
        <hr className="mt-2 mb-4 border-gray-300" />

        <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow border border-gray-200">
          <div className="bg-gray-300 w-16 h-16 rounded-full flex items-center justify-center text-white text-lg font-bold">
            NN
          </div>
          <div>
            <p className="text-lg font-medium">Mr. Nattapong Nakaom</p>
          </div>
        </div>
      </section>

      <section>
        <h1 className="text-2xl font-bold text-gray-800 flex gap-3"><FaUser/> นักศึกษา</h1>
        <hr className="mt-2 mb-4 border-gray-300" />

        <div className="grid grid-cols-1  gap-4">
          {mockUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-4 bg-white p-4 rounded-lg shadow border border-gray-200 hover:bg-gray-50 transition"
            >
              <div className="bg-blue-400 w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-sm">
         
              </div>
              <div>
                <p className="font-medium text-gray-800">{user.name}</p>
           
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
