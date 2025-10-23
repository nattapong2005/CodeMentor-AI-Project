'use client'


export default function Page() {

    return (
        <section className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">สร้างงานใหม่</h1>

            <form className="space-y-6 bg-white p-6 rounded shadow border border-gray-200">
                <div>
                    <label className="block text-sm font-medium text-gray-700">ชื่อเรื่อง</label>
                    <input
                        type="text"
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-100 focus:border-blue-500"
                        placeholder="กรอกชื่อของงาน"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">คำอธิบาย</label>
                    <textarea

                        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-100 focus:border-blue-500"
                        rows={4}
                        placeholder="อธิบายรายละเอียดของงาน"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">คะแนน</label>
                        <input
                            type="text"
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-100 focus:border-blue-500"
                            placeholder="กรอกคะแนน"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">ประเภทการตรวจ</label>
                        <select name="" className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-100 focus:border-blue-500">
                            <option value="">Hint เท่านั้น</option>
                            <option value="">อธิบายแนวคิด</option>
                            <option value="">เฉลยโค้ดทั้งหมด</option>
                            <option value="">ตรวจเองด้วยมือ</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">วันกำหนดส่ง</label>
                    <input
                        type="date"
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-100 focus:border-blue-500"
                    />
                </div>

                <div className="text-right">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-primary text-white rounded-md hover:bg-secondary cursor-pointer transition"
                    >
                        สร้างงาน
                    </button>
                </div>
            </form>
        </section>
    );
}
