import React from "react";
import { IoCloseSharp } from "react-icons/io5";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const MyModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50" onClick={onClose}>
      <div className="relative w-full max-w-lg p-10 bg-white rounded-lg shadow-lg animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer">
          <IoCloseSharp />
        </button>
        {children}
      </div>
    </div>
  );
};

export default MyModal;
