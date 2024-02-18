import { NextResponse } from "next/server";


// /api/create-chat
export async function POST(req: Request, res: Response) {
    try {
        const body=await req.json();
        const [file_key,file_name]=body;
        console.log("file_key",file_key);
        console.log("file_name",file_name);
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
        
    }
}