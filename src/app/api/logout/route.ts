import { type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    const expiresString = 'Thu, 01 Jan 1970 00:00:00 GMT'; 

    const cookie = `isLogin=false; expires=${expiresString}; httpOnly; path=/`;

    return new Response(JSON.stringify({}), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Set-Cookie': cookie
        }
    });
}
