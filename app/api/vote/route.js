import { getServerSession } from "next-auth";
import prisma from "../../../prisma/index.js";
import { authOptions } from "../auth/[...nextauth]/route";

// Error handling middleware
function errorHandler(error) {
  console.error(error);
  throw new Error("An error occurred while processing your request.");
}

export async function POST(request) {
  try {
    const jsonBody = await request.json();
    const { feedbackId } = jsonBody;
    const session = await getServerSession(authOptions);
    const { email: userEmail } = session.user;
    // console.log("userEmail", userEmail)
    // console.log(session)

    //check if user has already voted
    const vote = await prisma.vote.findFirst({
      where: {
        feedbackId,
        userEmail,
      },
    });
    if (vote) {
        // implement delete vote here if necessary
        
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
      return Response.json(voteDoc);
    }
  } catch (error) {
    errorHandler(error);
  }
}
