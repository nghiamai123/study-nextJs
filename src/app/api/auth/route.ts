import type { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const user = await request.json();
    const now = new Date();
    const expiresInOneDay = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const padZero = (number: number): string => (number < 10 ? '0' : '') + number;

    const formatDate = (date: Date): string => {
        const year = date.getUTCFullYear();
        const month = padZero(date.getUTCMonth() + 1);
        const day = padZero(date.getUTCDate());
        const hours = padZero(date.getUTCHours());
        const minutes = padZero(date.getUTCMinutes());
        const seconds = padZero(date.getUTCSeconds());

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} GMT`;
    };

    const expiresString = formatDate(expiresInOneDay);

    const cookie = `user=${JSON.stringify(user)}; expires=${expiresString}; path=/`;

    return new Response(expiresString, {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Set-Cookie': cookie
        }
    });
}
