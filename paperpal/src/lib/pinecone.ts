import { Pinecone, PineconeClient, PineconeRecord } from "@pinecone-database/pinecone";
import { downloadFromS3 } from "./s3-server";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

let pinecone:PineconeClient | null = null;

// export const getPineconeClient = async () => {
//     // if (!pinecone) {
//     //     pinecone = new PineconeClient();
//     //     await pinecone.init({
//     //         environment: process.env.PINECONE_ENVIRONMENT,
//     //         apiKey: process.env.PINECONE_API_KEY
//     //     });
//     // }
//     const pc = new Pinecone({
//         apiKey:process.env.PINECONE_API_KEY
//       });
//       const index = pc.index('quickstart');
// };

export const getPineconeClient = async () => {
    if (!pinecone) {
        pinecone = new Pinecone({
            apiKey: process.env.PINECONE_API_KEY
        });
        return pinecone;  // Return the Pinecone client instance
    }
    return pinecone;
};



  export async function loadS3IntoPinecone(fileKey: string) {
    console.log("downloading s3 into file system");
    const file_name = await downloadFromS3(fileKey);
    if (!file_name) {
        throw new Error("could not download from s3");
      }
      console.log("loading pdf into memory" + file_name);
      const loader = new PDFLoader(file_name);
      const pages = await loader.load();
      return pages;


  }
