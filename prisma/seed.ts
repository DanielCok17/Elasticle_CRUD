import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding data...');

    // Vytvorenie používateľov
    const user1 = await prisma.user.create({
        data: {
            email: 'john.doe@example.com',
            password: 'hashedpassword123', // Tu použite hashované heslo, napr. bcrypt hash
            name: 'John Doe',
            isActive: true,
        },
    });

    const user2 = await prisma.user.create({
        data: {
            email: 'jane.doe@example.com',
            password: 'hashedpassword456', // Tu použite hashované heslo, napr. bcrypt hash
            name: 'Jane Doe',
            isActive: true,
        },
    });

    console.log('Users created:', { user1, user2 });

    // Vytvorenie profilov pre používateľov
    const profile1 = await prisma.profile.create({
        data: {
            firstName: 'John',
            lastName: 'Smith',
            birthDate: new Date('1990-01-01'),
            photoUrl: 'https://example.com/photo1.jpg',
            description: 'This is a profile description for John Smith.',
            createdById: user1.id, // Priradenie profilu k John Doe
        },
    });

    const profile2 = await prisma.profile.create({
        data: {
            firstName: 'Jane',
            lastName: 'Doe',
            birthDate: new Date('1985-05-20'),
            photoUrl: 'https://example.com/photo2.jpg',
            description: 'This is a profile description for Jane Doe.',
            createdById: user2.id, // Priradenie profilu k Jane Doe
        },
    });

    console.log('Profiles created:', { profile1, profile2 });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
