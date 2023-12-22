import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";


export async function POST(req){

    const s3 = new S3Client({
        region: 'ap-south-1',
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        },
      });


    const formData = await req.formData();
    const links =[]
    for (const fileInfo of formData){
        const file = fileInfo[1];
        const fileName = Date.now().toString()+file.name
        const chunks = []
        for await (const chunk of file.stream()){
            chunks.push(chunk)
        }
        const buffer = Buffer.concat(chunks)
        await s3.send(new PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: fileName,
            Body: buffer,
            ACL: 'public-read',
            ContentType: file.type,
        }));
        links.push('https://voxboard-uploads.s3.ap-south-1.amazonaws.com/'+fileName)
        
    }
    return Response.json(links)   
    }
 