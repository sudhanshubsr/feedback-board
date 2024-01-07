
import prisma from "../../../prisma/index.js";

export async function POST(request) {
  const jsonbody = await request.json();
  const { title, description, uploads, userEmail} = jsonbody;
  await prisma.feedback.create({
    data: {
      title,
      description,
      uploads,
      userEmail,
    },
  });
  return Response.json({
    data: {
      title,
      description,
      uploads,
      userEmail,
    },
  });
}

export async function GET(){
  const feedbacks = (await prisma.feedback.findMany({
    orderBy: {
      createdAt: "desc",
    },
  }));
  return Response.json(feedbacks);
}

