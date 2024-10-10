//@ts-nocheck
"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Subject } from "@/db/models/subject";
import axios, { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
const Dashboard = () => {
  const [subjectData, setSubjectData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("/api/subject");
        console.log(response.data.data);
        setSubjectData(response.data.data);

        if (!response.data?.data) {
          console.log(response.data?.message);
        }
      } catch (err: any) {
        const axiosError = err as AxiosError;
        console.log(axiosError.response?.data);
      }
    };
    getData();
  }, []);

  async function handleIsCompletedSateChange(taskId) {
    console.log("Task completed");
    try {
      const response = await axios.post(
        `/api/tasks/toggleIsCompleted?taskId=${taskId}`
      );
      console.log(response.data.data);

      if (!response.data?.data) {
        console.log(response.data?.message);
      }
    } catch (err: any) {
      const axiosError = err as AxiosError;
      console.log(axiosError.response?.data);
    }
  }
  return (
    <>
      {subjectData.map((subject, index) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                "inline-block px-4 py-2 text-lg font-bold border-4 border-black rounded-md transition-all",
                "hover:bg-pink-400 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              )}
            >
              {subject.label}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Table>
                <TableBody>
                  {subject?.taskIds.map((task, index) => {
                    <TableRow key={task._id}>
                      <TableCell className="font-base">{task.label}</TableCell>
                      <TableCell>Priority: {task.priority}</TableCell>
                      <TableCell>DeadLine: {task.deadLine.getDate}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          className="border-4 border-black font-bold text-lg px-6 py-3 bg-green-400 hover:bg-green-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                          onClick={() => {
                            console.log("Task completed");
                          }}
                        >
                          Complete Task
                        </Button>
                      </TableCell>
                    </TableRow>;
                  })}
                </TableBody>
              </Table>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      })}

      {subjectData.map((subject, index) => {
        return (
          <Table className="my-5">
            <TableCaption>{subject.label}</TableCaption>
            <TableBody>
              {subject.taskIds.map((task, index) => {
                return (
                  !task.isCompleted && (
                    <>
                      <TableRow key={task._id}>
                        <TableCell className="font-base">
                          {task.label}
                        </TableCell>
                        <TableCell>{task.priority}</TableCell>
                        <TableCell>CreatedAt: {task.createdAt}</TableCell>
                        <TableCell>DeadLine: {task.deadLine}</TableCell>
                        <Button
                          onClick={() => {
                            handleIsCompletedSateChange(task._id);
                          }}
                        >
                          set isCompleted
                        </Button>
                      </TableRow>
                    </>
                  )
                );
              })}
            </TableBody>
          </Table>
        );
      })}

      <div className="text-3xl my-3 font-bold">Completed Tasks</div>

      {subjectData.map((subject, index) => {
        return (
          <Table className="my-5">
            <TableCaption>{subject.label}</TableCaption>
            <TableBody>
              {subject.taskIds.map((task, index) => {
                return (
                  task.isCompleted && (
                    <>
                      <TableRow key={task._id}>
                        <TableCell className="font-base">
                          {task.label}
                        </TableCell>
                        <TableCell>{task.priority}</TableCell>
                        <TableCell>CreatedAt: {task.createdAt}</TableCell>
                        <TableCell>DeadLine: {task.deadLine}</TableCell>
                        <Button
                          onClick={() => {
                            handleIsCompletedSateChange(task._id);
                          }}
                        >
                          set isCompleted
                        </Button>
                      </TableRow>
                    </>
                  )
                );
              })}
            </TableBody>
          </Table>
        );
      })}
    </>
  );
};

export default Dashboard;
