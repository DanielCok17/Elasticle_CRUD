import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

interface JwtPayload {
    userId: number;
    email: string;
}

export async function GET(req: Request) {
    try {
        const token = req.headers.get("cookie")
            ?.split("; ")
            .find((c) => c.startsWith("accessToken="))
            ?.split("=")[1];


        if (!token) {
            return NextResponse.json(
                { error: "Unauthorizedsss" },
                {
                    status: 401,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET, OPTIONS",
                        "Access-Control-Allow-Headers": "Authorization, Content-Type",
                    },
                }
            );
        }

        const payload = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET!
        ) as JwtPayload;

        return NextResponse.json(
            { email: payload.email, userId: payload.userId },
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, OPTIONS",
                    "Access-Control-Allow-Headers": "Authorization, Content-Type",
                },
            }
        );
    } catch (error) {
        console.error("Auth error:", error);

        return NextResponse.json(
            { error: "Unauthorized" },
            {
                status: 401,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, OPTIONS",
                    "Access-Control-Allow-Headers": "Authorization, Content-Type",
                },
            }
        );
    }
}
