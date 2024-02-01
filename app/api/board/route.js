import { getServerSession } from "next-auth";
import prisma from "../../../prisma/index.js";
import { authOptions } from "../../utils/auth.js";
export async function GET(req) {
  const session = await getServerSession(authOptions);
  const adminEmail = session.user.email;
  try {
    const boards = await prisma.board.findMany({
      where: {
        adminEmail: adminEmail,
      },
    });
    return Response.json(boards);
  } catch (error) {
    console.error("Error fetching boards:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  const adminEmail = session.user.email;
  const { boardName, boardUrl } = await req.json();
  try {
    const board = await prisma.board.create({
      data: {
        name: boardName,
        adminEmail: adminEmail,
        slug: boardUrl,
      },
    });
    return Response.json(board);
  } catch (error) {
    console.error("Error creating board:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
