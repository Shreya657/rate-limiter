"use server"

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { prisma } from "../../../utils/prisma";
import { generateApiKey } from "../../../utils/generateKey";


//create a project and get a default api key
export async function createProject(formData: FormData) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session)
         throw new Error("Unauthorized");

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
 const limit = parseInt(formData.get("limit") as string) || 100;
    const window = parseInt(formData.get("window") as string) || 60;

    const project = await prisma.project.create({
        data: {
            name,
            description,
            userId: session.user.id,
            limit: limit ,
            window: window,
            
        }
    });

    // generate the first API Key
  const { rawKey, hashedKey } = generateApiKey(); //utilty fn
    
    await prisma.apiKey.create({
        data: {
            key: hashedKey,
            projectId: project.id,
            name: "Default Key"
        }
    });

    revalidatePath("/dashboard");
    return { success: true ,project, 
  rawKey};
}


//dlt any proj
export async function deleteProject(projectId: string) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) 
        throw new Error("Unauthorized");
    const userId=session.user.id;
     if(userId!=session.user.id){
        throw new Error("Unauthorized");
    }

    await prisma.project.delete({
        where: {
            id: projectId,
            userId: session.user.id, 
        },
    });

   

    revalidatePath("/dashboard");
    return { success: true };
}


//update the proj
export async function updateProject(projectId: string, formData: FormData) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session)
         throw new Error("Unauthorized");

     const userId=session.user.id;
     
     if(userId!=session.user.id){
        throw new Error("Unauthorized");
    }

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const limit = parseInt(formData.get("limit") as string);
    const window = parseInt(formData.get("window") as string);

    await prisma.project.update({
        where: {
            id: projectId,
            userId: session.user.id, 
        },
        data: {
            name,
            description,
            limit,
            window,
        }
    });

    revalidatePath(`/dashboard/${projectId}`);
    revalidatePath("/dashboard");
    return { success: true };
}