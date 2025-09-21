"use server"

import { revalidatePath } from "next/cache";
import { connectToDB } from "../database/mongo"
import { handleError } from "../utils";
import User from "../database/models/user.model";
import Image from "../database/models/image.model";
import { redirect } from "next/navigation";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  secure:true,
});

const populateUser = (query: any) => query.populate({
  path: 'author',
  model: User,
  select: '_id firstName lastName clerkId'
})

//add
export async function addImage({ image, userId, path }: AddImageParams) {
  try {
    await connectToDB();

    const author = await User.findById(userId);

    if (!author) {
      throw new Error("User not found");
    };

    const newImage = await Image.create({
      ...image,
      author: author._id,
    })

    revalidatePath(path);

    return JSON.parse(JSON.stringify(newImage));

  } catch (error) {
    handleError(error);
  }

};

//update
export async function updateImage({ image, userId, path }: UpdateImageParams) {
  try {
    await connectToDB();

    const imageToUpdate = await Image.findById(image._id);

    if (!imageToUpdate || imageToUpdate.author.toHexString() !== userId) {
      throw new Error("Unauthorized or image not found");
    }

    const updateImage = await Image.findByIdAndUpdate(
      imageToUpdate._id,
      image,
      { new: true }
    );

    revalidatePath(path);

    return JSON.parse(JSON.stringify(updateImage));

  } catch (error) {
    handleError(error);
  }

}
//delete
export async function deleteImage(imageId: string, publicId: string) {
  try {
    await connectToDB();

    await Image.findByIdAndDelete(imageId);
    const result = await cloudinary.uploader.destroy(publicId);
    console.log(result);
    
  } catch (error) {
    handleError(error);
  } finally {
    redirect("/");
  }

}

//get image
export async function getImagebyId(imageId: string) {
  try {
    await connectToDB();

    const image = await populateUser(Image.findById(imageId))

    if (!image) throw new Error("Image not found")

    return JSON.parse(JSON.stringify(image));

  } catch (error) {
    handleError(error);
  }

}



//get images
export async function getAllImages({ limit = 9, page = 1, searchQuery = '' }: {
  limit?: number;
  page: number;
  searchQuery?: string;
}) {
  try {
    await connectToDB();

  
    // let expression = 'folder=imaginify';

    // if (searchQuery) {
    //   expression += ` AND ${searchQuery}`
    // }

    // const { resources } = await cloudinary.search
    //   .expression(expression)
    //   .execute();

    // const resourceIds = resources.map((resource: any) => resource.public_id);

    // let query = {};

    // if (searchQuery) {
    //   query = {
    //     publicId: {
    //       $in: resourceIds
    //     }
    //   }
    // }
 let query = {};

        if (searchQuery) {
            query = {
                $text: { $search: searchQuery }
            };
        }
    const skipAmount = (Number(page) - 1) * limit;

    const images = await populateUser(Image.find(query))
      .sort({ updatedAt: -1 })
      .skip(skipAmount)
      .limit(limit);

    const totalImages = await Image.find(query).countDocuments();
    // const savedImages = await Image.find().countDocuments();

    return {
      images: JSON.parse(JSON.stringify(images)),
      totalPages: Math.ceil(totalImages / limit),
      // savedImages,
    }
  } catch (error) {
    handleError(error)
  }
}
// GET IMAGES BY USER
export async function getUserImages({
  limit = 9,
  page = 1,
  userId,
}: {
  limit?: number;
  page: number;
  userId: string;
}) {
  try {
    await connectToDB();

    const skipAmount = (Number(page) - 1) * limit;

    const images = await populateUser(Image.find({ author: userId }))
      .sort({ updatedAt: -1 })
      .skip(skipAmount)
      .limit(limit);

    const totalImages = await Image.find({ author: userId }).countDocuments();

    return {
      data: JSON.parse(JSON.stringify(images)),
      totalPages: Math.ceil(totalImages / limit),
    };
  } catch (error) {
    handleError(error);
  }
}