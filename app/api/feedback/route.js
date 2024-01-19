
import { getServerSession } from "next-auth";
import prisma from "../../../prisma/index.js";
import { authOptions } from '../../utils/auth.js'

export async function POST(request) {
  const jsonbody = await request.json();
  const { title, description, uploads,boardName} = jsonbody;
  const session =await getServerSession(authOptions)
  const userEmail = session.user.email;
  try{
  const feedbackDoc = await prisma.feedback.create({
    data: {
      title,
      description,
      uploads,
      userEmail,
      boardName
    },
  });

  return Response.json(feedbackDoc);
}catch(error){
  console.log(error);
}
  
}


// This function handles GET requests
export async function GET(request) {
  // Create a new URL object from the request URL
  const url = new URL(request.url);

  // Check if a feedbackId parameter is present in the URL
  if (url.searchParams.get('feedbackId')) {
    // If feedbackId is present, fetch the specific feedback from the database
    const feedback = await prisma.feedback.findUnique({
      where: {
        id: url.searchParams.get('feedbackId'),
      }
    });

    // Return the fetched feedback as a JSON response
    return Response.json(feedback);
  } else {
    // If feedbackId is not present, fetch all feedbacks

    // Get the search and sort parameters from the URL
    const searchPhrase = url.searchParams.get('search');
    const sort = url.searchParams.get('sort');
    const boardName = url.searchParams.get('boardName');

    // Initialize an empty filter object
    let filter = {boardName};

    if(['in-progress', 'planned', 'complete','archived'].includes(sort)){
      filter.status = sort;
    }else if(sort === 'all'){
      filter 
    }else{
      filter.status = 'new';
    }
    // If a search phrase is present, find all comments that contain the search phrase
    if (searchPhrase) {
      const comments = await prisma.comment.findMany({
        where: { text: { contains: searchPhrase, mode: 'insensitive' } },
      });
    
    
      // Get the feedbackIds from the found comments
      const feedbackIds = comments.map((comment) => comment.feedbackId);

      // Update the filter object to include the search phrase and feedbackIds
      filter = {
        boardName:boardName,
        OR: [
          { title: { contains: searchPhrase, mode: 'insensitive' } },
          { description: { contains: searchPhrase, mode: 'insensitive' } },
          { id: { in: feedbackIds } },
        ]
      }
    }
    // Fetch all feedbacks from the database that match the filter and sort them according to the sort parameter
    const feedbacks = await prisma.feedback.findMany({
      where: filter,
      orderBy: [
        { voteCount: sort === 'votes' ? 'desc' : 'asc' },
        { createdAt: sort === 'latest' ? 'desc' : sort === 'oldest' ? 'asc' : 'asc' },
      ],
    });

    // Return the fetched feedbacks as a JSON response
    return Response.json(feedbacks);
  }
}


export async function PUT(request){
  
  const session =await getServerSession(authOptions)
  if(!session){
    return Response.unauthorized();
  }
  const isAdmin = session.user.isAdmin || session.user.email === 'sudhanshubsr.dev@gmail.com';
  if(!isAdmin){
    return Response.unauthorized();
  }
  const jsonbody = await request.json();
  const {feedbackId, title, description, uploads, userEmail,status} = jsonbody;
  const updateData = status ? {status} : {title,description,uploads,userEmail}

  const updatedFeedbackDoc = await prisma.feedback.update({
    where:{
      id: feedbackId,
    },
    data: updateData,

  })
  
  return Response.json(updatedFeedbackDoc); 
}


