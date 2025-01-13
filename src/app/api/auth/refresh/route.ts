export const runtime = "nodejs";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { refreshToken } = body;

        if (!refreshToken) {
            return new Response(
                JSON.stringify({ error: "Refresh token missing" }),
                { status: 400 }
            );
        }

        // Verify the refresh token
        let decoded: JwtPayload;
        try {
            decoded = jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET!
            ) as JwtPayload;
        } catch (err: unknown) {
            console.error(err);
            return new Response(
                JSON.stringify({ error: "Invalid refresh token" }),
                { status: 401 }
            );
        }

        // Generate a new access token
        const accessToken = jwt.sign(
            { userId: decoded.userId },
            process.env.ACCESS_TOKEN_SECRET!,
            { expiresIn: "15m" }
        );

        return new Response(
            JSON.stringify({ accessToken }),
            { status: 200 }
        );
    } catch {
        return new Response(
            JSON.stringify({ error: "Internal server error" }),
            { status: 500 }
        );
    }
}
