import Image from "@/lib/database/models/image.model";
import User from "@/lib/database/models/user.model";
import { connectToDB } from "@/lib/database/mongo";
import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from "next/server";

const populateUser = (query: any) => query.populate({
    path: 'author',
    model: User,
    select: '_id firstName lastName clerkId'
})

export async function GET(req: Request) {

    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get('page') || 1);
    const limit = Number(searchParams.get('limit') || 9);
    const searchQuery = searchParams.get('searchQuery')!;
    const skipAmount = (page - 1) * limit;

    try {
        await connectToDB();

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            secure: true,
        })

        let expression = 'folder=imaginify';

        if (searchQuery) {
            expression += ` AND ${searchQuery}`
        }

        const { resources } = await cloudinary.search
            .expression(expression)
            .execute();

        const resourceIds = resources.map((resource: any) => resource.public_id);

        let query = {};

        if (searchQuery) {
            query = {
                publicId: {
                    $in: resourceIds
                }
            }
        }

        const images = await populateUser(Image.find(query))
            .sort({ updatedAt: -1 })
            .skip(skipAmount)
            .limit(limit);

        const totalImages = await Image.find(query).countDocuments();
        const savedImages = await Image.find().countDocuments();

        return NextResponse.json({ images, totalImages, savedImages }, { status: 200 });

    } catch (error) {
        console.error('getAllImages Error: ' + error);
        const errorMessage=(error as Error).message;
        return NextResponse.json(errorMessage.includes('mongodb')?'Internal Server Error':errorMessage, { status: 500,statusText:errorMessage.includes('mongodb')?'Internal Server Error':errorMessage});
    }
}