import Prisma from "../../../../prisma/index.js";

export async function POST(request) {
  const jsonbody = await request.json();
  const { title, description } = jsonbody;
  await Prisma.feedback.create({
    data: {
      title,
      description,
    },
  });
  return Response.json({
    data: {
      title,
      description,
    },
  });
}
