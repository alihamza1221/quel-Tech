"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { TaskCreationPopup } from "./components-task-creation-popup";
import { SubjectCreationPopup } from "./components-subject-creation-popup";

const menuIt = [
  { name: "Track Record", href: "/dashboard/track-record" },
  { name: "Generate Time Table", href: "/dashboard/generate-timetable" },
];

export function NeoMenuBar() {
  const pathname = usePathname();
  return (
    <nav className="flex justify-center bg-yellow-300 p-4 border-b-4 border-black">
      <ul className="flex flex-wrap justify-center space-x-2 space-y-2 sm:space-y-0 sm:space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              "inline-block px-4 py-2 text-lg font-bold border-4 border-black rounded-md transition-all",
              "hover:bg-pink-400 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            )}
          >
            Subject
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel></DropdownMenuLabel>
            <DropdownMenuSeparator />

            <SubjectCreationPopup />

            <DropdownMenuItem>Delete Subject</DropdownMenuItem>
            <DropdownMenuItem>Show Tasks</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              "inline-block px-4 py-2 text-lg font-bold border-4 border-black rounded-md transition-all",
              "hover:bg-pink-400 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            )}
          >
            Tasks
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel></DropdownMenuLabel>
            <DropdownMenuSeparator />

            <TaskCreationPopup />

            <DropdownMenuItem>Delete Task</DropdownMenuItem>
            <DropdownMenuItem>Show Tasks</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {menuIt.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className={cn(
                "inline-block px-4 py-2 text-lg font-bold border-4 border-black rounded-md transition-all",
                "hover:bg-pink-400 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
                pathname === item.href
                  ? "bg-green-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  : "bg-white"
              )}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
