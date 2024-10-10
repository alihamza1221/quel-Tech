import dbConnect from "@/db/mongooseConnect";
import { subjectModel } from "@/db/models/subject";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { taskModel } from "@/db/models/task";
const returnResUnAuth = () => {
  return NextResponse.json({ message: "Unauthenticated" }, { status: 403 });
};

const returnResErr = (err: any) => {
  return NextResponse.json({ message: err?.message }, { status: 403 });
};

export const GET = async (req: NextRequest) => {
  //get users data from database
  const session = await getServerSession();

  //check if user is authenticated
  if (!session || !session.user) {
    return returnResUnAuth();
  }
  try {
    await dbConnect();

    const res = await subjectModel
      .find({
        userEmail: session.user.email,
      })
      .populate({ path: "taskIds", model: taskModel });

    console.log(res);
    if (res) {
      return NextResponse.json({ data: res }, { status: 200 });
    }
  } catch (err) {
    return returnResErr(err);
  }
  return NextResponse.json({ data: null }, { status: 201 });
};

export const POST = async (req: NextRequest) => {
  //get users data from database
  const session = await getServerSession();

  const { subjectData } = await req.json();
  console.log("subjectData: ", subjectData);
  //check if user is authenticated
  if (!session || !subjectData || !session.user) {
    return returnResUnAuth();
  }
  try {
    await dbConnect();

    const subject = await subjectModel.create({
      label: subjectData.subject,
      userEmail: session.user.email,
    });
    const res = await subject.save();
    console.log(res);
    if (res) {
      return NextResponse.json({ data: res }, { status: 200 });
    }
  } catch (err) {
    return returnResErr(err);
  }
  return NextResponse.json({ data: null }, { status: 201 });
};

export { returnResErr, returnResUnAuth };
