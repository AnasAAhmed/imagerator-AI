"use server";

import { revalidatePath } from "next/cache";

import User from "../database/models/user.model";
import { connectToDB } from "../database/mongo";
import { handleError } from "../utils";
import { clerkClient } from "@clerk/nextjs/server";

// CREATE
export async function createUser(user: CreateUserParams) {
  try {
    await connectToDB();

    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

// READ
export async function getUserById(userId: string): Promise<User | null> {
  try {
    const clerk = await clerkClient();

    await connectToDB();

    let user = await User.findOne({ clerkId: userId });

    if (!user) {
      // Recreate user manually using Clerk API
      const clerkUser = await clerk.users.getUser(userId);
      if (!clerkUser || !clerkUser.emailAddresses?.length) {
        throw new Error("Invalid user from Clerk");
      }
      await connectToDB();
      const newUser = await User.create({
        email: clerkUser.emailAddresses[0].emailAddress,
        username: clerkUser.firstName + " " + clerkUser.lastName,
        clerkId: clerkUser.id,
        photo: clerkUser.imageUrl,
      });
      console.log('newUsr created: ' + newUser);

      user = newUser;
    }

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
    return null;
  }
}

// UPDATE
export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDB();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updatedUser) throw new Error("User update failed");

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteUser(clerkId: string) {
  try {
    await connectToDB();

    // Find user to delete
    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}

// USE CREDITS
export async function updateCredits(userId: string, creditFee: number) {
  try {
    await connectToDB();

    const updatedUserCredits = await User.findOneAndUpdate(
      { _id: userId },
      { $inc: { creditBalance: creditFee } },
      { new: true }
    )

    if (!updatedUserCredits) throw new Error("User credits update failed");

    return JSON.parse(JSON.stringify(updatedUserCredits));
  } catch (error) {
    handleError(error);
  }
}