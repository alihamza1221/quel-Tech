import dbConnect from "@/db/mongooseConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { subjectModel } from "@/db/models/subject";
import { taskModel } from "@/db/models/task";
import mongoose from "mongoose";

const returnResUnAuth = () => {
  return NextResponse.json({ message: "Unauthenticated" }, { status: 403 });
};

const returnResErr = (err: any) => {
  return NextResponse.json({ message: err?.message }, { status: 403 });
};
export const POST = async (req: NextRequest) => {
  //get users data from database
  const session = await getServerSession();
  const taskId = await req.nextUrl.searchParams.get("taskId");
  //check if user is authenticated
  if (!session || !taskId || !session.user) {
    return returnResUnAuth();
  }
  try {
    await dbConnect();
    const taskObjectId = new mongoose.Types.ObjectId(taskId);

    const userTask = await taskModel.updateOne(
      {
        _id: taskObjectId,
        userEmail: session.user.email,
      },
      {
        $set: { isCompleted: true },
      }
    );
    if (userTask) {
      return NextResponse.json({ data: userTask }, { status: 200 });
    }
  } catch (err) {
    return returnResErr(err);
  }
  return NextResponse.json({ data: null }, { status: 201 });
};

export { returnResErr, returnResUnAuth };
