import { NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/auth";

export async function GET(req: Request) {
    try {
        // Načítanie accessToken z cookies
        const token = req.headers.get("cookie")?.split("; ").find((c) => c.startsWith("accessToken="))?.split("=")[1];

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Overenie platnosti tokenu
        const payload = verifyAccessToken(token);

        if (!payload) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Vrátenie emailu používateľa
        return NextResponse.json({ email: payload.email });
    } catch (error) {
        console.error("Auth error:", error);
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
}
