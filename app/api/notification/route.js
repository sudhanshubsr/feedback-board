import { authOptions } from "../../utils/auth";
import { getServerSession } from "next-auth";
import prisma from "../../../prisma/index.js";
export async function GET(req){
    const session = await getServerSession(authOptions);
    if(!session){
        return Response.json({error: "Unauthorized"}, {status: 401})
    }
   const notification = await prisma.notification.findMany({
        where:{
            destinationUserEmail: session?.user?.email
        },
        orderBy:{
            createdAt: 'desc'
        },
        include:{
            Feedback:true,
        }
    })
    return Response.json(notification)
}


export async function PUT(req){
    const session = await getServerSession(authOptions);
    if(!session){
        return Response.json({error: "Unauthorized"}, {status: 401})
    }
   const {id} = await req.json();
   if(id){
    const notification = await prisma.notification.update({
        where:{
            id
        },
        data:{
            read: true
        }
    })
    return Response.json(notification)
}
else{
    await prisma.notification.update({
        where:{
            destinationUserEmail: session?.user?.email
        },
        data:{
            read: true
        }
    })
    return Response.json({message: "All notifications read"})
}
    
}

export async function DELETE(req){
    const session = await getServerSession(authOptions);
    if(!session){
        return Response.json({error: "Unauthorized"}, {status: 401})
    }
    await prisma.notification.deleteMany({
        where:{
            destinationUserEmail: session?.user?.email
        }
    })
    return Response.json({message: "All notifications deleted"})
}