import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

const API_URL = 'http://localhost:9999/api';

interface User {
    user_id: string;
    role: string;
}

interface WithAuthProps {
    user: User;
}

export const withAuthSsr = <P extends {}>(
    gssp?: GetServerSideProps<P>
): GetServerSideProps<P & WithAuthProps> => {

    return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P & WithAuthProps>> => {

        const { req } = context;
        const { auth_token } = req.cookies;

        if (!auth_token) {
            return {
                redirect: {
                    destination: '/login',
                    permanent: false,
                },
            };
        }

        try {
            const response = await fetch(`${API_URL}/me`, {
                headers: {
                    // สำคัญมาก: ต้องส่ง cookie กลับไปให้ API
                    'Cookie': `auth_token=${auth_token}`
                }
            });

            if (!response.ok) {
                // 3. ถ้า API ตอบกลับว่า 401 (Token ไม่ถูก)
                throw new Error("Token ไม่ถูกต้อง");
            }

            const user: User = await response.json();

            // 4. (ทางเลือก) ถ้าหน้านั้นๆ มี getServerSideProps เดิมที่ต้องทำงาน
            let originalProps: GetServerSidePropsResult<P> = { props: {} as P };
            if (gssp) {
                originalProps = await gssp(context);
                if (!('props' in originalProps)) {
                    return originalProps; // กรณี return { redirect } หรือ { notFound }
                }
            }

            // 5. ถ้าสำเร็จ ส่ง props (user + props เดิม) ไปยัง Component
            return {
                props: {
                    ...originalProps.props,
                    user, // ส่งข้อมูล user ที่ได้จาก API ไปให้หน้า Page
                },
            };

        } catch (error) {
            console.error("Auth Error (SSR):", error);
            // 6. ถ้าเกิด Error (เช่น API ล่ม, Token หมดอายุ)
            // (แนะนำให้ลบ cookie ที่ client ด้วย แต่ทำใน SSR ไม่ได้โดยตรง)
            return {
                redirect: {
                    destination: '/auth/logout',
                    permanent: false,
                },
            };
        }
    };
};