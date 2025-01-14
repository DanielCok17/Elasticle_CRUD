import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req: Request) {
    try {
        // Získanie tokenu z cookies
        const cookieHeader = req.headers.get('cookie');
        const token = cookieHeader
            ?.split('; ')
            .find((c) => c.startsWith('accessToken='))
            ?.split('=')[1];

        // Kontrola, či token existuje
        if (!token) {
            return NextResponse.redirect(new URL('/login', req.url)); // Presmerovanie, ak token chýba
        }

        // Overenie platnosti tokenu
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);

        // Ak je token platný, pokračovať ďalej
        return NextResponse.next();
    } catch (error: unknown) {
        // Ak token nie je platný alebo je iná chyba
        console.error(error);
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
    matcher: ['/protected/:path*'], // Chránené endpointy, ktoré začínajú /protected/
};
