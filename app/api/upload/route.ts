import { NextRequest, NextResponse } from "next/server";
import {v2 as cloudinary} from "cloudinary";
import DatauriParser from 'datauri/parser';
import path from "path";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest){
    try{
        const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;
    
    if(!file){
        return new Response('failed',{status: 404})
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const parser = new DatauriParser();

    const base64Image = parser.format(path.extname(file.name).toString(), buffer);
    let uploadedImageResponse;

    if(base64Image.content)
    uploadedImageResponse = await cloudinary.uploader.upload(base64Image.content, { resource_type: 'image' });

    if(!uploadedImageResponse){
        return new Response('Image upload failed', { status: 400})
    }
    return NextResponse.json({imageUrl: uploadedImageResponse.secure_url})
    }
    catch(error){
        console.log(error);
        return new Response('failed',{status:400});
    }
}