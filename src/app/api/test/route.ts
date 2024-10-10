import { NextResponse } from "next/server";
import { userModel } from "@/db/models/user";
import dbConnect from "@/db/mongooseConnect";
export const GET = async () => {
  //get users data from database

  await dbConnect();
  const users = await userModel.find({});
  return NextResponse.json({ users: users }, { status: 201 });
};
