import prisma from "../../../prisma/index.js";
export async function POST(req){
    const jsonbody = await req.json();
    const {text, userEmail, feedbackId, uploads} = jsonbody;

    await prisma.comment.create({
        data:{
            text,
            userEmail,
            feedbackId,
            uploads
        }
    })
    return Response.json({
        data:{
            text,
            userEmail,
            feedbackId,
            uploads
        }
    })
}

export async function GET(req) {
    try {
      const url = new URL(req.url);
      const feedbackId = url.searchParams.get("feedbackId");
      
      const commentsByFeedbackId = await prisma.comment.findMany({
        where: {
          feedbackId: feedbackId,
        },
        include: {
          user: {
            select: {
              name: true,
              email: true,
              image: true,
            },
          },
        },
      });
  
      return Response.json(commentsByFeedbackId);
    } catch (error) {
      console.error("Error fetching comments:", error);
      return Response.json({ error: "Internal Server Error" }, { status: 500 });
    } 
  }
  