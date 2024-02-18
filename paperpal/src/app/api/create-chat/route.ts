import { loadS3IntoPinecone } from "@/lib/pinecone";
import { NextResponse } from "next/server";


// /api/create-chat
export async function POST(req: Request, res: Response) {
    try {
        const { file_key, file_name } = await req.json();  // Fixed: Destructure the body
        console.log("file_key", file_key);
        console.log("file_name", file_name);
        const pages = await loadS3IntoPinecone(file_key);
        console.log("Loaded pages:", pages);  // Log the loaded pages
        return NextResponse.json({pages});
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
