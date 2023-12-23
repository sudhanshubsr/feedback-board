
import prisma from "../../../prisma/index.js";

export async function POST(request) {
  const jsonbody = await request.json();
  const { title, description, uploads } = jsonbody;
  await prisma.feedback.create({
    data: {
      title,
      description,
      uploads,
    },
  });
  return Response.json({
    data: {
      title,
      description,
      uploads,
    },
  });
}

export async function GET(){
  const feedbacks = await prisma.feedback.findMany();
  return Response.json(feedbacks);
}

