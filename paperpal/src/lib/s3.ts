// import { S3 } from "@aws-sdk/client-s3";
// import { PutObjectCommand } from "@aws-sdk/client-s3";
import AWS from "aws-sdk";

export async function uploadToS3(file: File) {
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

    const fileKey = "uploads/" + Date.now().toString() + file.name.replace(" ", "-");

    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
      Key: fileKey,
      Body: file,
    };

    const upload = s3.putObject(params).on('httpUploadProgress', (evt) => {
      console.log("Uploading to S3...", parseInt((evt.loaded / evt.total).toString() * 100) + "%");
    });

    await upload.promise(); // Use promise() to return a promise from the operation

    console.log("Successfully uploaded to S3", fileKey);

    return Promise.resolve({
      fileKey,
      file_name: file.name,
    });
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw error;
  }
}

export function getS3Url(file_key: string) {
  const url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.ap-southeast-1.amazonaws.com/${file_key}`;
  return url;
}
