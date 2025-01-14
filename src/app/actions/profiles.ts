'use server';

import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Zod schemas for validation
const profileCreateSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    birthDate: z.string().refine((date) => !isNaN(Date.parse(date)), "Invalid date format"), // Validates YYYY-MM-DD
    photoUrl: z.string().url("Invalid URL").optional(),
    description: z.string().optional(),
    createdById: z.number().int("Invalid user ID"),
});

const profileUpdateSchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    birthDate: z.string().optional().refine((date) => date === undefined || !isNaN(Date.parse(date)), "Invalid date format"),
    photoUrl: z.string().url("Invalid URL").optional(),
    description: z.string().optional(),
});

// Graceful validation error handler
function handleValidationError(error: z.ZodError) {
    return {
        success: false,
        errors: error.errors.map((err) => ({
            path: err.path,
            message: err.message,
        })),
    };
}

// Fetch all profiles
export async function getProfiles() {
    try {
        return {
            success: true,
            data: await prisma.profile.findMany({
                include: {
                    createdBy: true, // Fetch related data
                },
            }),
        };
    } catch (error) {
        console.error("Error fetching profiles:", error);
        return { success: false, message: "Failed to fetch profiles" };
    }
}

// Create a new profile
export async function createProfile(data: {
    firstName: string;
    lastName: string;
    birthDate: string;
    photoUrl?: string;
    description?: string;
    createdById: number;
}) {
    try {
        // Validate input data
        const validData = profileCreateSchema.parse(data);

        const profile = await prisma.profile.create({
            data: {
                ...validData,
                birthDate: new Date(validData.birthDate), // Convert string to Date
            },
        });

        return { success: true, data: profile };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return handleValidationError(error);
        }
        console.error("Error creating profile:", error);
        return { success: false, message: "Failed to create profile" };
    }
}

// Update an existing profile
export async function updateProfile(
    id: number,
    data: Partial<{
        firstName: string;
        lastName: string;
        birthDate: string;
        photoUrl?: string;
        description?: string;
    }>
) {
    try {
        // Validate input data
        const validData = profileUpdateSchema.parse(data);

        const profile = await prisma.profile.update({
            where: { id },
            data: {
                ...validData,
                birthDate: validData.birthDate ? new Date(validData.birthDate) : undefined, // Convert if exists
            },
        });

        return { success: true, data: profile };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return handleValidationError(error);
        }
        console.error("Error updating profile:", error);
        return { success: false, message: "Failed to update profile" };
    }
}

// Delete a profile
export async function deleteProfile(id: number) {
    try {
        await prisma.profile.delete({
            where: { id },
        });
        return { success: true, message: "Profile deleted successfully" };
    } catch (error) {
        console.error("Error deleting profile:", error);
        return { success: false, message: "Failed to delete profile" };
    }
}
