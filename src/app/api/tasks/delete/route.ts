import dbConnect from "@/db/mongooseConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { subjectModel } from "@/db/models/subject";

import { returnResErr, returnResUnAuth } from "../route";
import mongoose from "mongoose";
export const POST = async (req: NextRequest) => {
  //get users data from database
  const session = await getServerSession();
  const { taskData } = await req.json();
  //check if user is authenticated
  if (!session || !taskData.subjectId || !session.user) {
    if (!taskData.taskId) return returnResErr("no task id");
    return returnResUnAuth();
  }

  try {
    await dbConnect();
    const taskObjectId = new mongoose.Types.ObjectId(taskData.taskId);
    const subjectObjectId = new mongoose.Types.ObjectId(taskData.subjectId);
    const res = await subjectModel.updateOne(
      { _id: taskObjectId, userEmail: session.user.email },
      { $push: { taskIds: taskObjectId } }
    );

    if (res) {
      return NextResponse.json({ data: res }, { status: 200 });
    }
  } catch (err) {
    return returnResErr(err);
  }
  return NextResponse.json({ data: null }, { status: 201 });
};

export { returnResErr, returnResUnAuth };
