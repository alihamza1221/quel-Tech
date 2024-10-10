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
import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { Button } from "@/components/ui/button";

const GenrateTimeTable = () => {
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
      <div className="text-3xl my-3 font-bold">High Priority Tasks</div>
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
      })}{" "}
    </>
  );
};

export default GenrateTimeTable;
