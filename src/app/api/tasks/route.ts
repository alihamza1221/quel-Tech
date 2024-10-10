import dbConnect from "@/db/mongooseConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { subjectModel } from "@/db/models/subject";

const returnResUnAuth = () => {
  return NextResponse.json({ message: "Unauthenticated" }, { status: 403 });
};

const returnResErr = (err: any) => {
  return NextResponse.json({ message: err?.message }, { status: 403 });
};
export const GET = async (req: NextRequest) => {
  //get users data from database
  const session = await getServerSession();
  const subjectId = req.nextUrl.searchParams.get("subjectId");
  //check if user is authenticated
  if (!session || !subjectId || !session.user) {
    return returnResUnAuth();
  }
  try {
    await dbConnect();

    const userTasksBySubject = await subjectModel
      .findOne({ _id: subjectId, userEmail: session.user.email })
      .select("taskIds")
      .populate("taskIds")
      .lean();
    if (userTasksBySubject) {
      return NextResponse.json(
        { data: userTasksBySubject.taskIds },
        { status: 200 }
      );
    }
  } catch (err) {
    return returnResErr(err);
  }
  return NextResponse.json({ data: null }, { status: 201 });
};

export { returnResErr, returnResUnAuth };
