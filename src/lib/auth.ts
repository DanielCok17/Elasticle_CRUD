import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

// Hashovanie hesla
export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
}

// Overenie hesla
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
}

// Generovanie Access Tokenu
export function generateAccessToken(userId: number): string {
    return jwt.sign({ userId }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

// Generovanie Refresh Tokenu
export function generateRefreshToken(userId: number): string {
    return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}

// Overenie Access Tokenu
export function verifyAccessToken(token: string): unknown {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
}
