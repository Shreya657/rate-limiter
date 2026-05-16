
import { Hono } from 'hono';
import { prisma } from '../../../../../utils/prisma';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { generateApiKey } from '../../../../../utils/generateKey';

const projects = new Hono();

projects.get('/', async (c) => {
 const session = await auth.api.getSession({ headers: await headers() }); 
  
  if (!session?.user?.id) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const allProjects = await prisma.project.findMany({
    where: { userId: session.user.id },
    select: { id: true, name: true }
  });

  return c.json(allProjects);
});

projects.get('/:id', async (c) => {
 const session = await auth.api.getSession({ headers: await headers() }); 
 const projectId = c.req.param('id');
  
  if (!session?.user?.id) {
    return c.json({ error: "Unauthorized" }, 401);
  }
 if (!projectId) {
    return c.json({ error: "Project ID is required" }, 400);
 }

  const project = await prisma.project.findUnique({
    where: { id: projectId, userId: session.user.id },
    select: { id: true, name: true }
  });

  if (!project) {
    return c.json({ error: "Project not found" }, 404);
  }

  return c.json(project);
});

projects.post('/:projectId/keys/:keyId/rotate',async(c)=>{
   const session = await auth.api.getSession({ headers: await headers() }); 
  const{projectId,keyId}=c.req.param();
  if(!session?.user?.id){
        return c.json({ error: "Unauthorized" }, 401);

  }

  const existingKey = await prisma.apiKey.findFirst({
    where: { 
      id: keyId, 
      projectId: projectId,
      project: { userId: session?.user?.id } 
    }
  });

  if (!existingKey) {
    return c.json({ error: "API key not found" }, 404);
  }
    const { rawKey, hashedKey } = generateApiKey();

    await prisma.apiKey.update({
    where: { id: keyId },
    data: { key: hashedKey }
  });
  return c.json({ 
    message: "Key rotated successfully", 
    newKey: rawKey 
  });

})

projects.patch('/:id/whiteList',async(c)=>{
  const projectId=c.req.param('id');
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  const {origins}=await c.req.json();
  const updatedProject = await prisma.project.update({
    where: { 
      id: projectId,
      userId: session.user.id 
    },
    data: { allowedOrigins: origins }
  });
  return c.json({ success: true, origins: updatedProject.allowedOrigins });
})



export default projects;