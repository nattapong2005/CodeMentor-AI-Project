// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import cookie from 'cookie';

const EXPRESS_LOGIN_URL = "http://localhost:9999/api/auth/login";

export async function POST(req: NextRequest) {
  try {
    // ตรวจสอบว่า request body มีข้อมูลหรือไม่
    const requestBody = await req.json();
    if (!requestBody) {
      return NextResponse.json({ message: 'Request body is empty' }, { status: 400 });
    }

    // ส่งข้อมูลไปยัง Express Server
    const expressRes = await fetch(EXPRESS_LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody), // ใช้ requestBody ที่ได้รับจาก req.json()
    });

    // รับข้อมูลจาก Express
    const data = await expressRes.json();

    // ถ้า Express login ไม่สำเร็จ (เช่น 401, 400)
    if (!expressRes.ok) {
      return NextResponse.json(data, { status: expressRes.status });
    }

    // หาก Express Login สำเร็จ
    const { token, user_id, role } = data;

    if (!token) {
      return NextResponse.json({ message: 'Express ไม่ได้ส่ง Token กลับมา' }, { status: 500 });
    }

    // สร้าง Cookie สำหรับการเก็บ token
    const serializedCookie = cookie.serialize('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60, // 1 ชั่วโมง
    });

    // ตั้งค่า Cookie ใน header
    const response = NextResponse.json({
      message: 'เข้าสู่ระบบสำเร็จ',
      user_id,
      role,
    });

    // ตั้งค่า Cookie
    response.headers.set('Set-Cookie', serializedCookie);

    return response;

  } catch (err) {
    console.error('PROXY ERROR:', err);
    return NextResponse.json({ message: 'เกิดข้อผิดพลาดใน Proxy' }, { status: 500 });
  }
}
