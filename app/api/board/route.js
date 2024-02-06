import { getServerSession } from "next-auth";
import prisma from "../../../prisma/index.js";
import { authOptions } from "../../utils/auth.js";
import { canWeaccessthisBoard } from "../../utils/boardApiFunctions.js";


export async function GET(req) {
  const url = new URL(req.url);
  const session = await getServerSession(authOptions);
  if(!session){
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const adminEmail = session.user.email;
  try {
    if(url.searchParams.get('slug')){
      const board = await prisma.board.findUnique({
        where: {
          slug: url.searchParams.get('slug')
        }
      })
      if(!canWeaccessthisBoard(board, adminEmail)){
        return Response.json({ error: "Unauthorized" }, { status: 401 });
      }
      return Response.json(board);
    }
    else{
      try{
      if(url.searchParams.get('sharedEmail')){
        const sharedboards = await prisma.board.findMany({
          where:{
            allowedEmails: {
              has: url.searchParams.get('sharedEmail')
            }
          }
        })
        return Response.json(sharedboards);
      }
    }catch(error){
        console.error("Error fetching shared boards:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
      }
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
  if(!session){
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const adminEmail = session.user.email;
  const { boardName, boardUrl,boardDescription,visibility, allowedEmails} = await req.json();
  try {
    const board = await prisma.board.create({
      data: {
        name: boardName,
        adminEmail: adminEmail,
        slug: boardUrl,
        description: boardDescription,
        visibility: visibility,
        allowedEmails: allowedEmails
      },
    });
    return Response.json(board);
  } catch (error) {
    console.error("Error creating board:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}



export async function PUT(req) {
  const session = await getServerSession(authOptions);
  if(!session){
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const adminEmail = session.user.email;
  const { boardName,boardDescription, boardId, boardUrl, visibility, allowedEmails, archiveStatus} = await req.json();
  try{
    const board = await prisma.board.update({
      where: {
        id: boardId
      },
      data:{
        name: boardName,
        adminEmail: adminEmail,
        description: boardDescription,
        slug: boardUrl,
        visibility: visibility,
        allowedEmails: allowedEmails,
        archived: archiveStatus
      }
    })
    return Response.json(board);
  }catch(error){
    console.error("Error updating board:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
