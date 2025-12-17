import type { Profile } from "../generated/client";
import { getPrisma } from "../prisma";

const prisma = getPrisma();


export const getProfileByUserid = async (userId: number): Promise<Profile> => {
    const profile = await prisma.profile.findUnique({
        where: { userId }
    });
    if (!profile) {
        throw new Error("Profile tidak ditemukan");
    }

    return profile
}





export const createProfile = async (
    userId: number,
    data: {gender: string, address: string, name: string, profile_picture_url: string }
): Promise<Profile> => {

    const existingProfile = await prisma.profile.findUnique({
        where: { userId }
    });

    if (existingProfile) {
        throw new Error("Profile sudah ada");
    }

    return await prisma.profile.create({
        data: {
            userId,
            gender: data.gender,
            address: data.address,
            name: data.name,
            profile_picture_url: data.profile_picture_url
        }
    })
}



export const updateProfile = async (
    userId: number,
    data:  {gender: string, address: string, name: string, profile_picture_url: string }
): Promise<Profile> => {

    const profile = await prisma.profile.findUnique({
        where: { userId }
    });

    if(!profile) {
        throw new Error("Profile tidak ditemukan");
    }
    
    return await prisma.profile.update({
        where: { userId },
        data
    })
}


export const deleteProfile = async (userId: number): Promise<Profile> => {
    const profile = await prisma.profile.findUnique({
        where: {userId}
    });

    if (!profile) {
        throw new Error("Profile tidak ditemukan");
    }

    return await prisma.profile.delete({
        where: { userId }
    })
}