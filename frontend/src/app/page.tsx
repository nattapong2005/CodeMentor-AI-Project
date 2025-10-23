import type { NextPage } from 'next';
import React from 'react';

// ไอคอนสำหรับปุ่ม Social Media (SVG)
const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.804 9.196C34.976 5.822 29.866 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
    <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039L38.804 9.196C34.976 5.822 29.866 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path>
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path>
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.012 36.49 44 30.861 44 24c0-1.341-.138-2.65-.389-3.917z"></path>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V21.878A10.003 10.003 0 0022 12z"></path>
  </svg>
);


const LoginPage: NextPage = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      
      {/* ส่วนด้านซ้าย (Branding) */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-500 to-blue-700 text-white p-12 flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold">AI Code Grader</h1>
          <p className="mt-2 text-indigo-200">
            ฟีดแบ็กแม่นยำ พัฒนาทักษะตรงจุด
          </p>
        </div>
        <div>
          <h2 className="text-5xl font-bold leading-tight">Hey, Hello!</h2>
          <p className="mt-4 text-lg text-indigo-200 max-w-md">
            ระบบที่ช่วยให้ผู้สอนติดตามความคืบหน้า และช่วยให้นักเรียนได้รับ Feedback ที่มีคุณภาพเพื่อพัฒนาทักษะได้อย่างตรงจุด
          </p>
        </div>
        <div className="text-sm text-indigo-300">
          © {new Date().getFullYear()} AI Code Grader. All Rights Reserved.
        </div>
      </div>

      {/* ส่วนด้านขวา (ฟอร์ม Login) */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          
          <div className="bg-white p-8 rounded-2xl shadow-lg w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
            <p className="text-gray-500 mb-8">กรุณากรอกข้อมูลเพื่อเข้าสู่ระบบ</p>

            <form action="#" method="POST" className="space-y-6">
              {/* ช่องกรอก Username */}
              <div>
                <label htmlFor="username" className="sr-only">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                />
              </div>

              {/* ช่องกรอก Password */}
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                />
              </div>
              
              <div className="text-right">
                <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                  Forgot Password?
                </a>
              </div>

              {/* ปุ่ม Login */}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 transition"
                >
                  Login
                </button>
              </div>
            </form>

            {/* เส้นคั่น OR */}
            <div className="my-6 flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-sm text-gray-500">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* ปุ่ม Social Login */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="w-full flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition">
                <GoogleIcon />
                <span>Google</span>
              </button>
              <button className="w-full flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition">
                <FacebookIcon />
                <span>Facebook</span>
              </button>
            </div>
            
          </div>
          
          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
              Sign Up
            </a>
          </p>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
