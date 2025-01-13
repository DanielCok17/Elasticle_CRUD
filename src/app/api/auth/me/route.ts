import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

interface JwtPayload {
    userId: number;
    email: string;
}

export async function GET(req: Request) {
    try {
        const token = req.headers.get("Authorization")?.split("Bearer ")[1];

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const payload = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET!
        ) as JwtPayload;

        // Return the user's email
        return NextResponse.json({ email: payload.email });
    } catch (error) {
        console.error("Auth error:", error);
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
}
