"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoClose, IoDocument, IoHomeOutline } from "react-icons/io5";
import { FaBars, FaBook, FaUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useRouter } from "next/navigation";
import { logout } from "@/app/services/auth";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const navItems = [
    { icon: <IoHomeOutline />, title: "หน้าแรก", url: "/student/classrooms" },
    { icon: <FaBook />, title: "งานของฉัน", url: "/student/assignments" },
    { icon: <FaUser />, title: "บุคคล", url: "/student/user" },
    { icon: <IoDocument />, title: "งานของชั้นเรียน", url: "/teacher/assignment" },
    { icon: <MdLogout />, title: "ออกจากระบบ", action: handleLogout },
  ];


  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setIsOpen]);

  return (
    <div
      className={`bg-white text-slate-800 transition-all duration-300 ease-in-out border-r border-slate-200 flex flex-col ${isOpen ? "w-64" : "w-20"
        }`}
    >
      {/* Header and Toggle Button */}
      <div className="flex items-center h-16 px-4 border-b border-slate-200">
        <h1
          className={`font-bold text-lg text-blue-600 overflow-hidden transition-opacity duration-200 whitespace-nowrap ${isOpen ? "opacity-100" : "opacity-0"
            }`}
        >
          CodeMentor AI
        </h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg ml-auto text-slate-600 hover:bg-slate-100"
          aria-label="Toggle Sidebar"
        >
          {isOpen ? <IoClose className="text-2xl" /> : <FaBars className="text-2xl" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-4 flex-1">
        {navItems.map((item) => {
          const isActive = item.url ? pathname === item.url : false;

          const linkClasses = `
                        flex items-center p-4 h-14
                        text-slate-600 hover:bg-slate-100 
                        transition-colors duration-200 rounded-lg
                        ${isActive ? "bg-blue-100 text-blue-700 font-semibold" : ""}
                    `;

          const content = (
            <>
              <span className={`flex-shrink-0 w-8 flex justify-center text-2xl ${isActive ? "text-blue-600" : "text-slate-500"}`}>
                {item.icon}
              </span>
              <span
                className={`whitespace-nowrap overflow-hidden transition-all duration-300 ml-3 ${isOpen ? "opacity-100" : "opacity-0 w-0"}`}
              >
                {item.title}
              </span>
            </>
          );

          return (
            <div key={item.title} className="px-2 mb-2">
              {item.url ? (
                <Link href={item.url} className={linkClasses}>
                  {content}
                </Link>
              ) : (
                <button onClick={item.action} className={`w-full ${linkClasses}`}>
                  {content}
                </button>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;