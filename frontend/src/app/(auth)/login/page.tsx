"use client";

import React, { useState } from 'react';
import { login } from '@/app/services/auth';
import { useRouter } from "next/navigation";
import { MdEmail } from 'react-icons/md';
import { TbLockPassword } from 'react-icons/tb';
import { IoIosAlert } from 'react-icons/io';
const Login: React.FC = () => {

  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) return setError('กรุณากรอกอีเมล');
    if (!password) return setError('กรุณากรอกรหัสผ่าน');

    try {
      const data = await login({ email, password });

      if (data.role === "TEACHER") {
        router.push('/teacher/home');
      } else if (data.role === "STUDENT") {
        router.push('/home');
      } else if (data.role === "ADMIN") {
        router.push('/admin/dashboard');
      }
      
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-blue-700 flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-6xl">
        <div className="hidden md:block flex-1 text-center md:text-left text-white">
          <h1 className='text-5xl font-bold mb-5'>CodeMentor AI</h1>
          <h1 className="text-3xl lg:text-4xl font-bold mb-5">
            สวัสดี, นักศึกษาทุกคน
          </h1>
          <p className='text-lg max-w-md text-gray-200'>ระบบที่ช่วยให้ผู้สอนติดตามความคืบหน้า และช่วยให้นักเรียนได้รับ Feedback ที่มีคุณภาพเพื่อพัฒนาทักษะได้อย่างตรงจุด </p>
        </div>
        <div className="flex-1 w-full max-w-lg bg-white shadow-2xl rounded-lg p-6 sm:p-10">
          <div className="text-center mb-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-2">
              ยินดีต้อนรับกลับ
            </h1>
            <p>กรอกข้อมูลเพื่อเข้าสู่ระบบ</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="flex items-start gap-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3 animate-shake">
                {/* <i className="fas fa-exclamation-circle text-lg flex-shrink-0 mt-0.5"></i> */}
                <IoIosAlert className="text-lg mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-base font-semibold text-gray-700 flex gap-2 items-center">
                <MdEmail /> อีเมล
              </label>
              <div>
                <input
                  type="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-xl block w-full pl-3 py-3.5 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none"
                  placeholder="example@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex gap-2 items-center text-base font-semibold text-gray-700">
                <TbLockPassword /> รหัสผ่าน
              </label>
              <div>
                <input
                  type="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-xl block w-full pl-3 py-3.5 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="cursor-pointer w-full py-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <i className="fas fa-sign-in-alt mr-2"></i>เข้าสู่ระบบ
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
