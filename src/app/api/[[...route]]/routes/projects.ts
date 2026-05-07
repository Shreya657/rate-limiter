// Example: routes/projects.ts
// routes/projects.ts
import { Hono } from 'hono';
import { subHours, startOfHour } from 'date-fns';
import { prisma } from '../../../../../utils/prisma';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

const projects = new Hono();

projects.get('/', async (c) => {
 const session = await auth.api.getSession({ headers: await headers() }); // Get session from NextAuth/Clerk/etc.
  
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



export default projects;