import { prisma } from '@/lib/prisma';
import { registerSchema } from '@/lib/validation';
import { hashPassword } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        // Získanie údajov z requestu
        const body = await req.json();

        // Validácia údajov pomocou `zod`
        const data = registerSchema.parse(body);

        // Kontrola, či email už existuje
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email },
        });
        if (existingUser) {
            return new Response(
                JSON.stringify({ error: 'User with this email already exists' }),
                { status: 400 }
            );
        }

        // Hashovanie hesla
        const hashedPassword = await hashPassword(data.password);

        // Vytvorenie užívateľa
        const user = await prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
            },
        });

        return new Response(JSON.stringify({ message: 'User registered successfully', user }), {
            status: 201,
        });
    } catch (error) {
        // Zod validation error
        if (error instanceof Error) {
            return new Response(JSON.stringify({ error: error.message }), { status: 400 });
        }

        return new Response(JSON.stringify({ error: 'Something went wrong' }), { status: 500 });
    }
}
