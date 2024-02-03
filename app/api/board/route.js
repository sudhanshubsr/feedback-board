import { getServerSession } from "next-auth";
import prisma from "../../../prisma/index.js";
import { authOptions } from "../../utils/auth.js";


export async function GET(req) {
  const url = new URL(req.url);
  const session = await getServerSession(authOptions);
  const adminEmail = session.user.email;
  try {
    if(url.searchParams.get('slug')){
      const board = await prisma.board.findUnique({
        where: {
          slug: url.searchParams.get('slug')
        }
      })
      return Response.json(board);
    }
    else{
      const boards = await prisma.board.findMany({
        where: {
          adminEmail: adminEmail,
        },
      });
      return Response.json(boards);
    }
  } catch (error) {
    console.error("Error fetching boards:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  const adminEmail = session.user.email;
  const { boardName, boardUrl,boardDescription } = await req.json();
  try {
    const board = await prisma.board.create({
      data: {
        name: boardName,
        adminEmail: adminEmail,
        slug: boardUrl,
        description: boardDescription,
      },
    });
    return Response.json(board);
  } catch (error) {
    console.error("Error creating board:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
