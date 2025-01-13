import { NextResponse } from "next/server";

export async function POST() {
    try {
        // Vytvorenie odpovede a vymazanie cookies
        const response = NextResponse.json({ message: "Logout successful" });
        response.cookies.set("accessToken", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 0, // Okamžité vymazanie
            path: "/",
        });
        response.cookies.set("refreshToken", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 0,
            path: "/",
        });
        return response;
    } catch (error) {
        console.error("Logout error:", error);
        return NextResponse.json({ error: "Logout failed" }, { status: 500 });
    }
}
