
import prisma from "../../../prisma/index.js";

export async function POST(request) {
  const jsonbody = await request.json();
  const { title, description, uploads, userEmail} = jsonbody;
  const feedbackDoc = await prisma.feedback.create({
    data: {
      title,
      description,
      uploads,
      userEmail,
    },
  });
  return Response.json(feedbackDoc);
}

export async function GET(request){
  const url = new URL(request.url);
  if(url.searchParams.get('feedbackId')){
    const feedback = await prisma.feedback.findUnique({
      where:{
        id: url.searchParams.get('feedbackId'),
      }
    });
    return Response.json(feedback);
  }
  else{
  const feedbacks = (await prisma.feedback.findMany({
    orderBy: {
      createdAt: "desc",
    },
  }));
  return Response.json(feedbacks);
}
}

