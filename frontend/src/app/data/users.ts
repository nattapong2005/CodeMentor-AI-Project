export interface User {
  id: number;
  name: string;
  submittedAt: string; 
  score: number;
  status: 'ตรวจแล้ว' | 'รอตรวจ'; 
}

export const mockUsers: User[] = [
  {
    id: 1,
    name: 'นายธนกฤต ศรีสมบัติ',
    submittedAt: '2025-10-17T14:32:00Z',
    score: 60,
    status: 'ตรวจแล้ว',
  },
  {
    id: 2,
    name: 'นางสาวพิมพ์ชนก ภู่วิทยา',
    submittedAt: '2025-10-17T15:20:00Z',
    score: 0,
    status: 'รอตรวจ',
  },
  {
    id: 3,
    name: 'นายกิตติศักดิ์ วัฒนาพานิช',
    submittedAt: '2025-10-16T19:00:00Z',
    score: 25,
    status: 'ตรวจแล้ว',
  },
  {
    id: 4,
    name: 'นางสาวณัฐชยา ปัญญาธรรม',
    submittedAt: '2025-10-18T09:12:00Z',
    score: 0,
    status: 'รอตรวจ',
  },
  {
    id: 5,
    name: 'นายอภิวัฒน์ จงรักษ์',
    submittedAt: '2025-10-17T21:45:00Z',
    score: 0,
    status: 'รอตรวจ',
  },
];
