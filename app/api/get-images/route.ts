import Image from "@/lib/database/models/image.model";
import User from "@/lib/database/models/user.model";
import { connectToDB } from "@/lib/database/mongo";
// import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from "next/server";

export async function GET(req: Request) {

    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get('page') || 1);
    const limit = Number(searchParams.get('limit') || 9);
    const rawQuery = searchParams.get("query");
    const searchQuery = rawQuery ? decodeURIComponent(rawQuery) : "";
    const skipAmount = (page - 1) * limit;

    try {
        await connectToDB();


        //It is cloudinary auto tags based search in theri db then it retunn publicId of images thruogh wich we search i our db currently futher images wouldnot have auto tags becasue free quota free tags has ended

        // cloudinary.config({
        //     cloud_name: process.env.CLOUDINARY_NAME,
        //     api_key: process.env.CLOUDINARY_API_KEY,
        //     api_secret: process.env.CLOUDINARY_API_SECRET,
        //     secure: true,
        // })

        // let expression = 'folder=imaginify';

        // if (searchQuery) {
        //     expression += ` AND ${searchQuery}`
        // }

        // const { resources } = await cloudinary.search
        //     .expression(expression)
        //     .execute();

        // const resourceIds = resources.map((resource: any) => resource.public_id);

        // let query = {};

        // if (searchQuery) {
        //     query = {
        //         publicId: {
        //             $in: resourceIds
        //         }
        //     }
        // }

        let query = {};

        if (searchQuery) {
            query = {
                $text: { $search: searchQuery }
            };
        }

        const images = await Image.find(query)
            .sort({ updatedAt: -1 })
            .skip(skipAmount)
            .limit(limit)
            .populate({
                path: 'author',
                model: User,
                select: '_id firstName lastName clerkId'
            });

        const totalImages = await Image.find(query).countDocuments();
        // const savedImages = await Image.find().countDocuments();
        const totalPages = Math.ceil(totalImages / limit)

        return NextResponse.json({ images, totalPages, totalImages }, { status: 200 });

    } catch (error) {
        console.error('getAllImages Error: ' + error);
        const errorMessage = (error as Error).message;
        return NextResponse.json(errorMessage.includes('mongodb') ? 'Internal Server Error' : errorMessage, { status: 500, statusText: errorMessage.includes('mongodb') ? 'Internal Server Error' : errorMessage });
    }
}