"use client";

import { useState, useEffect, useRef } from 'react';
import { FaBookAtlas } from 'react-icons/fa6';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Link from 'next/link';
import { getAssignment } from '@/app/services/assignment';

interface Assignment {
    assignment_id: number;
    title: string;
    description: string;
    create_at: string;
}

export default function Page() {
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const [assignment, setAssignment] = useState<Assignment[]>([]);

    const toggleMenu = (id: number) => {
        setOpenMenuId(openMenuId === id ? null : id);
    };

    const handleEdit = (id: number) => {
        // console.log('Edit assignment with id:', id);
        alert('ID: ' + id);
        setOpenMenuId(null);
    };

    const handleDelete = (id: number) => {
        // console.log('Delete assignment with id:', id);
        alert('ID: ' + id);
        setOpenMenuId(null);
    };

    const fetchUser = async () => {
        try {
            const assignment = await getAssignment();
            setAssignment(assignment);
        } catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <section className="max-w-6xl mx-auto px-6 py-8">
            <div className="flex justify-between mb-5 items-center">
                <h1 className="text-3xl font-bold text-gray-800  flex gap-3 items-center">
                    <FaBookAtlas /> งานของชั้นเรียน
                </h1>
                <Link href={`/teacher/assignment/create`} ><button className='bg-primary text-white px-5 rounded-lg py-1 cursor-pointer'>สร้าง</button></Link>
            </div>
            <ul className="divide-y divide-gray-200">
                {assignment.map((work) => (
                    <li
                        key={work.assignment_id}
                        className="py-4 px-4 hover:bg-gray-50 transition duration-150 cursor-pointer relative border-b border-b-gray-300"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <Link href={`/teacher/submission`}>
                                    <h2 className="text-xl font-semibold text-gray-700 hover:underline">
                                        {work.title}
                                    </h2>
                                </Link>
                            </div>
                            <div className="flex gap-2 items-center">
                                <p className="text-sm text-gray-500 mt-1">สร้างเมื่อ: {work.create_at}</p>
                                <div className="relative" ref={openMenuId === work.assignment_id ? menuRef : null}>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // ป้องกัน event bubble ไปยัง <li>
                                            toggleMenu(work.assignment_id);
                                        }}
                                        className="p-1 text-gray-500 hover:text-gray-700"
                                    >
                                        <BsThreeDotsVertical size={20} />
                                    </button>

                                    {openMenuId === work.assignment_id && (
                                        <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded-md shadow-md z-10">
                                            <button
                                                onClick={() => handleEdit(work.assignment_id)}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                แก้ไข
                                            </button>
                                            <button
                                                onClick={() => handleDelete(work.assignment_id)}
                                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                            >
                                                ลบ
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}