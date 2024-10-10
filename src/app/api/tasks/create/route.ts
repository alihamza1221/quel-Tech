import dbConnect from "@/db/mongooseConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { subjectModel } from "@/db/models/subject";
import { returnResErr, returnResUnAuth } from "../route";
import { taskModel } from "@/db/models/task";

export const POST = async (req: NextRequest) => {
  //get users data from server
  const session = await getServerSession();
  //check if user is authenticated

  const { taskData } = await req.json();
  console.log("session", session);
  console.log("taskdata: ", taskData, "taskdata.labl", taskData.label);
  if (!session || !session.user || !taskData) {
    return returnResUnAuth();
  }
  try {
    await dbConnect();

    const deadlineDate = new Date(taskData.deadline);
    console.log("typeof date, ", typeof deadlineDate, deadlineDate);
    const newTask = await taskModel.create({
      label: taskData.label,
      deadLine: deadlineDate,
      priority: taskData.priority,
      userEmail: session.user.email,
    });
    const resSaveTask = await newTask.save();

    console.log("resSaveTask; ", resSaveTask);
    if (resSaveTask) {
      const res = await subjectModel.updateOne(
        { label: taskData.subject, userEmail: resSaveTask.userEmail },
        { $push: { taskIds: resSaveTask._id } }
      );

      if (res) {
        return NextResponse.json({ data: res }, { status: 200 });
      }
    } else {
      return returnResErr("Error saving task");
    }
  } catch (err) {
    return returnResErr(err);
  }
};

export { returnResErr, returnResUnAuth };
