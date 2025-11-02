"use client";

import React, { useState } from 'react';
import { login } from '@/app/services/auth';
import { useRouter } from "next/navigation";
const Login: React.FC = () => {

  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await login({ email, password });
      router.push('/home');
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
          <p className='text-lg text-gray-200'>ระบบที่ช่วยให้ผู้สอนติดตามความคืบหน้า และช่วยให้นักเรียนได้รับ Feedback ที่มีคุณภาพเพื่อพัฒนาทักษะได้อย่างตรงจุด </p>
        </div>
        <div className="flex-1 w-full max-w-lg bg-white shadow-2xl rounded-lg p-6 sm:p-10">
          <div className="text-center mb-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-2">
              ยินดีต้อนรับกลับ
            </h1>
            <p>กรอกข้อมูลเพื่อเข้าสู่ระบบ</p>
          </div>
          <form onSubmit={handleLogin}>
            <div>
              {error && (
                <p className="mt-2 mb-2 text-sm text-red-600 bg-red-50 border border-red-300 rounded-md px-3 py-2">
                  {error}
                </p>
              )}
            </div>

            <div className="mb-5">
              <label className="block mb-2 text-base font-medium text-primary">
                อีเมล
              </label>
              <input
                type="email"
                className="bg-gray-50 border border-gray-300 focus:border-primary transition-all duration-300 text-gray-900 text-sm rounded-lg block w-full p-3 focus:ring-primary/30 focus:outline-none focus:ring-1"
                placeholder="กรอกอีเมล"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-base font-medium text-primary">
                รหัสผ่าน
              </label>
              <input
                type="password"
                className="bg-gray-50 border border-gray-300 focus:border-primary transition-all duration-300 text-gray-900 text-sm rounded-lg block w-full p-3 focus:ring-primary/30 focus:outline-none focus:ring-1"
                placeholder="กรอกรหัสผ่าน"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors duration-200 cursor-pointer"
              >
                เข้าสู่ระบบ
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
