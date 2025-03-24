import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import AiTrainGenerate from "./routes/ai-train-generate";
import cors from "cors";
import { errorMiddleWare, routeNotFoundMiddleware } from './middleware/error';
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const s3Client = new S3Client({
    region: "auto",
    endpoint: process.env.R2_API, // Your R2 endpoint
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY!,
      secretAccessKey: process.env.S3_SECRET_KEY!,
    },
  });


app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Backend Is Up!' });
});


// Pre-signed URL endpoint
app.get("/pre-signed-url", async (req: Request, res: Response) => {
  try {
    const key = `models/${Date.now()}.zip`;
    
    const putObjectCommand = new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: key,
      ContentType: "application/zip",
      

    });

    const url = await getSignedUrl(s3Client, putObjectCommand, {
      expiresIn: 3000, // URL expires in 5 minutes
    });

    res.json({
      url,
      key,
    });
  } catch (error) {
    console.error('Error generating pre-signed URL:', error);
    res.status(500).json({ error: 'Failed to generate pre-signed URL' });
  }
});




app.use('/api/v1/ai',AiTrainGenerate)




//@ts-ignore
// Global Route Handlers 
app.use(routeNotFoundMiddleware)

//@ts-ignore
// Middle for Handling Error
app.use(errorMiddleWare);





app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
  

