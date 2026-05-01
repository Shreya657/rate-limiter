"use server"

import { auth } from "@/lib/auth";
import { prisma } from "../../../utils/prisma";
import { generateApiKey } from "../../../utils/generateKey";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

// create new api key for a proj
export async function createNewKey(projectId: string, keyName: string) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session)
         throw new Error("Unauthorized");

    const project = await prisma.project.findUnique({
        where: { id: projectId, userId: session.user.id }
    });
    if (!project) 
        throw new Error("Project not found");

    const { rawKey, hashedKey } = generateApiKey();

    await prisma.apiKey.create({
        data: {
            key: hashedKey,
            name: keyName || "New API Key",
            projectId: projectId,
        }
    });

    revalidatePath(`/dashboard/projects/${projectId}`);
    return { success: true, rawKey }; 
}

// toggle status of a key (active/inactive)
export async function toggleKeyStatus(projectId: string, keyId: string, currentState: boolean) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) 
        throw new Error("Unauthorized");

    await prisma.apiKey.update({
        where: { 
            id: keyId,
            project: { userId: session.user.id } 
        },
        data: { isActive: !currentState }
    });

    revalidatePath(`/dashboard/projects/${projectId}`);
    return { success: true };
}

// dlt a key
export async function deleteKey(projectId: string, keyId: string) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) 
        throw new Error("Unauthorized");

    await prisma.apiKey.delete({
        where: { 
            id: keyId,
            project: { userId: session.user.id } 
        }
    });

    revalidatePath(`/dashboard/projects/${projectId}`);
    return { success: true };
}