import AWS from "aws-sdk";
import fs from "fs";

export async function downloadFromS3(file_key: string){
    try {
        AWS.config.update({
            accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
            secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
          });

          const s3 = new AWS.S3({
            params: {
              Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
            },
            region: "ap-southeast-1",
          });

          const params = {
            Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
            Key: fileKey
          };

          const obj=await s3.getObject(params).promise();
          const file_name = `/tmp/Karthik${Date.now().toString()}.pdf`;

          if (obj.Body instanceof require("stream").Readable){
            const file = fs.createWriteStream(file_name);
            file.on("open", function (fd) {
                // @ts-ignore
                obj.Body?.pipe(file).on("finish", () => {
                  return resolve(file_name);
                });
              });
          }
    } catch (error) {
        console.error(error);
        reject(error);
        return null;    
    }
}


