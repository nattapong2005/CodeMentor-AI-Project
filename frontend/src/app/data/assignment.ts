
export interface Assignment {
  id: number;
  title: string;
  create_at: string; 
}

export const assignments: Assignment[] = [
  {
    id: 1,
    title: "เขียนโปรแกรมไพธอนบวกเลข 1-10",
    create_at: "2023-05-01",
  },
  {
    id: 2,
    title: "เขียนโปรแกรมหาค่าเฉลี่ยของตัวเลขใน list",
    create_at: "2023-05-10",
  },
  {
    id: 3,
    title: "เขียนฟังก์ชันแปลงองศาเซลเซียสเป็นฟาเรนไฮต์",
    create_at: "2023-05-15",
  },

];
