
import { getServerSession } from "next-auth";
import prisma from "../../../prisma/index.js";
import { authOptions } from '../../utils/auth.js'

export async function POST(request) {
  const jsonbody = await request.json();
  const { title, description, uploads} = jsonbody;
  const session =await getServerSession(authOptions)
  const userEmail = session.user.email;
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

export async function PUT(request){
  const jsonbody = await request.json();
  const {feedbackId, title, description, uploads, userEmail} = jsonbody;
  const updatedFeedbackDoc = await prisma.feedback.update({
    where:{
      id: feedbackId,
    },
    data:{
      title,
      description,
      uploads,
      userEmail,
    }

  })
  return Response.json(updatedFeedbackDoc);
}


