import { getServerSession } from "next-auth";
import prisma from "../../../prisma/index.js";
import {authOptions} from '../../utils/auth.js'
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
  

  export async function PUT(req) {
    try {
      // Parse the JSON body from the request
      const jsonbody = await req.json();
  
      // Extract relevant data from the JSON body
      const { text, uploads, feedbackId, id } = jsonbody;
      const  session = await getServerSession(authOptions)
      const userEmail = session.user.email;
      const comment = await prisma.comment.update({
        where:{
          id: id
        },
        data:{
          text: text,
          uploads: uploads,
          feedbackId,
          userEmail,
        }

      })
      return Response.json(comment);
    } catch (error) {
      // Handle errors
      console.error("Error in PUT request:", error);
      return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
  

  export async function DELETE(req) {
    try {
      // Parse the JSON body from the request
      const jsonbody = await req.json();
      const {id} = jsonbody;
      await prisma.comment.delete({
        where: {
          id: id,
        },
      });
  
      return Response.json({ success: true });
    } catch (error) {
      // Handle errors
      console.error("Error in DELETE request:", error);
      return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }