'use client';

import { mockUsers, User } from '@/app/data/users';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';



export default function Page() {

  const [users] = useState<User[]>(mockUsers); 
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [code, setCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchCode = async (userId: number) => {
    setLoading(true);
    setError('');
    setCode('');

    try {
      const res = await fetch(`http://localhost:9999/test-file/${userId}.py`);
      if (!res.ok) throw new Error('Failed to fetch code');
      const data = await res.json();
      setCode(data.code);
    } catch (err) {
      console.error(err);
      setError('ไม่สามารถโหลดโค้ดได้');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    fetchCode(user.id);
  };

  const formatDate = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleString('th-TH', {
      dateStyle: 'short',
      timeStyle: 'short',
    });
  };

  return (
    <>
      {/* ส่วนหัวข้อ */}
      <section className="mb-5">
        <div className="bg-white w-full p-10 border border-gray-300">
          <h1 className="text-xl font-bold">เขียนโปรแกรมไพธอนบวกเลข 1-10</h1>
          <p className="text-gray-500 mt-1">
            ดึงไฟล์โค้ดจากเซิร์ฟเวอร์และแสดงด้านล่าง
          </p>
        </div>
      </section>

      {/* ส่วนแสดงผล */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* รายชื่อผู้ส่งงาน */}
        <div className="lg:col-span-1">
          <div className="w-full bg-white shadow p-5 rounded-md">
            <h2 className="text-lg font-semibold mb-3">
              งานที่ส่งแล้ว {users.length} คน
            </h2>

            <ul className="space-y-2">
              {users.map((user) => (
                <li
                  key={user.id}
                  onClick={() => handleSelectUser(user)}
                  className={`cursor-pointer p-3 rounded-md border flex flex-col hover:shadow transition ${selectedUser?.id === user.id
                    ? 'bg-blue-50 border-blue-400'
                    : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
                    }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{user.name}</span>
                    <span
                      className={`text-xs px-2 py-1 rounded ${user.status === 'ตรวจแล้ว'
                        ? 'bg-green-100 text-green-700 border border-green-300'
                        : 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                        }`}
                    >
                      {user.status}
                    </span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-500">
                      ส่งเมื่อ: {formatDate(user.submittedAt)}
                    </span>
                    <div className='text-xs text-gray-500'>{user.score}/100</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ส่วนแสดงโค้ด */}
        <div className="lg:col-span-2">
          <div className="w-full bg-white shadow p-5 rounded-md">
            <h2 className="text-lg font-semibold mb-3">
              โค้ดของ {selectedUser ? selectedUser.name : '—'}
            </h2>

            {loading && <p className="text-gray-500">⏳ กำลังโหลดโค้ด...</p>}

            {error && (
              <p className="text-red-600 bg-red-50 border border-red-300 p-3 rounded">
                {error}
              </p>
            )}

            {!loading && !error && code && (
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                showLineNumbers
              >
                {code}
              </SyntaxHighlighter>
            )}

            {code && (
              <>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3'>
                  <div>
                    <h2>ความคิดเห็นจาก Mr.Nattapong Nakaom</h2>
                    <input className="bg-white border border-gray-300 p-4 rounded-lg text-sm w-full" disabled placeholder="ดีมาก!" />
                  </div>
                  <div>
                    <h2>ความคิดเห็นจากปัญญาประดิษฐ์ ให้เพิ่ม toggle ว่าจะให้เห็นหรือไม่</h2>
                    <input className="bg-white border border-gray-300 p-4 rounded-lg text-sm w-full" disabled placeholder="ทำได้ดีมาก แต่ไม่ทำจะดีกว่า!" />
                  </div>
                </div>

                {selectedUser?.status === 'รอตรวจ' && (
                  <div className="flex mt-2 gap-3">
                    <input
                      type="text"
                      placeholder="กรอกคะแนน"
                      className="py-2 border rounded-lg border-gray-300 px-2"
                    />
                    <button className="px-5 bg-primary text-white cursor-pointer rounded-lg">บันทึก</button>
                  </div>
                )}
              </>
            )}

          </div>
        </div>
      </section>
    </>
  );
}
