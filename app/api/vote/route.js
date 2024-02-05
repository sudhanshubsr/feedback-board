import { getServerSession } from "next-auth";
import prisma from "../../../prisma/index.js";
import { authOptions } from "../../utils/auth.js";
import { canWeaccessthisBoard } from "../../utils/boardApiFunctions.js";





function errorHandler(error) {
  console.error(error);
  throw new Error("An error occurred while processing your request.");
}

async function getVoteCount(feedbackId){
  const voteCount = await prisma.vote.count({
    where:{
      feedbackId
    }
  })
  await prisma.feedback.update({
    where:{
      id: feedbackId
    },
    data:{
      voteCount: voteCount
    }
  })
}

export async function POST(request) {
  try {
    const jsonBody = await request.json();
    const { feedbackId } = jsonBody;
    const session = await getServerSession(authOptions);
    const { email: userEmail } = session.user;

    const feedbackDoc = await prisma.feedback.findUnique({
      where: {
        id: feedbackId,
      },
    });
    const boardDoc = await prisma.board.findFirst({
      where: {
        slug: feedbackDoc.boardName
      }
    })
    if (!canWeaccessthisBoard(boardDoc, userEmail)) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    //check if user has already voted
    const vote = await prisma.vote.findFirst({
      where: {
        feedbackId,
        userEmail,
      },
    });
    if (vote) {
        // implement delete vote here if necessary
      await prisma.vote.delete({
        where:{
          id: vote.id
        }
      })
      await getVoteCount(feedbackId);
      return Response.json({
        error: "You have already voted for this feedback",
      });
    } else {
      const voteDoc = await prisma.vote.create({
        data: {
          feedbackId,
          userEmail,
        },
      });

      await prisma.notification.create({
        data: {
          destinationUserEmail: feedbackDoc.userEmail,
          sourceUserName: session.user.name,
          type: "vote",
          feedbackId: feedbackId,
        },
      });
      await getVoteCount(feedbackId);
      return Response.json(voteDoc);
    }
  } catch (error) {
    errorHandler(error);
  }
}

export async function GET(request){
  const url = new URL(request.url);
  if(url.searchParams.get('feedbackIds')){
    const feedbackIds = url.searchParams.get('feedbackIds').split(',');
    const voteDocs = await prisma.vote.findMany({
      where:{
        feedbackId: {
          in:
            feedbackIds
          
        }
      }
    })
    return Response.json(voteDocs) 
  }

  return Response.json([])
}