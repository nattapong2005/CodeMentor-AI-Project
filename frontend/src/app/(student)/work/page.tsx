"use client";

import { useState } from "react";
import { FaClipboardList } from "react-icons/fa";

const teacher: string = "Mr.Nattapong Nakaom";


export default function Page() {

    const [output, setOutput] = useState('');
    const handleClick = () => {
        setOutput("Running test is working..");
    }
    return (<>
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
                <div className="lg:col-span-2">
                    <div className="bg-white p-5 border border-gray-300">
                        <div className="flex items-start gap-3">
                            <div className="bg-secondary rounded-full text-white p-3">
                                <FaClipboardList className="w-5 h-5" />
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <h1 className="text-xl">เขียนโปรแกรมไพธอนบวกเลข 1-10</h1>
                                    <p className="text-muted">{teacher}</p>
                                    <p className="text-muted">ครบกำหนด 24 ต.ค 2568 8.30 น. 10 คะแนน</p>
                                </div>
                            </div>
                        </div>
                        <hr className="mt-2 mb-2 text-muted" />
                        <p>ให้นักเรียนเขียนโปรแกรมภาษา Python ที่สามารถคำนวณผลบวกของตัวเลข 1 ถึง 10 และแสดงผลลัพธ์ออกทางหน้าจอ โดยใช้ for loop</p>
                        <textarea
                            id="code-editor"
                            className="w-full h-72 p-4 font-mono text-sm bg-slate-900 text-white rounded-t-lg border border-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <button onClick={handleClick} className="bg-primary hover:bg-primary/80 text-white rounded-lg px-5 py-1.5 cursor-pointer">ทดสอบโค้ด</button>
                        <div className="mt-4">
                            <h4 className="font-semibold text-slate-700 mb-2">ผลลัพธ์</h4>
                            <pre className="bg-slate-900 text-white p-4 rounded-lg text-sm font-mono h-24 overflow-y-auto">
                                {output}
                            </pre>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1 space-y-5">
                    <div className="bg-white p-5 border border-gray-300">
                        <div className="flex justify-between">
                            <h2 className="text-lg font-bold">งานของคุณ</h2>
                            <p className="text-muted">มอบหมายแล้ว</p>
                        </div>
                        <hr className="mt-2 mb-2 text-muted" />
                        <div className="bg-white border border-gray-300">
                            <input className="block w-full p-2" type="file" />
                        </div>
                        <button className="bg-primary hover:bg-primary/80 w-full mt-3 mb-3 text-white rounded-md px-5 py-1.5 cursor-pointer">ส่งงาน</button>

                    </div>
                    <div className="bg-white p-5 border border-gray-300">
                        <h2 className="font-bold mb-2">คำแนะนำจากปัญญาประดิษฐ์</h2>
                        <input className="bg-white border border-gray-300 p-4 rounded-lg text-sm w-full" disabled placeholder="ทำได้ดีมาก แต่ไม่ทำจะดีกว่า!">

                        </input>
                    </div>
                </div>

            </div>
        </div>
    </>)

}