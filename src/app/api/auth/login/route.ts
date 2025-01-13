import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        // Získanie údajov z requestu
        const body = await req.json();
        const { email, password } = body;

        // Nájsť používateľa podľa emailu
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        // Overenie hesla
        const isPasswordValid = await verifyPassword(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        // Vytvorenie JWT tokenov
        const accessToken = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.ACCESS_TOKEN_SECRET!,
            { expiresIn: "15m" } // Platnosť 15 minút
        );

        const refreshToken = jwt.sign(
            { userId: user.id },
            process.env.REFRESH_TOKEN_SECRET!,
            { expiresIn: "7d" } // Platnosť 7 dní
        );

        // Nastavenie cookies
        const response = NextResponse.json({ message: "Login successful" });
        response.cookies.set("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Použitie len cez HTTPS v produkcii
            sameSite: "strict", // Zabraňuje CSRF útokom
            maxAge: 60 * 15, // 15 minút
            path: "/",
        });

        response.cookies.set("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7, // 7 dní
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}
