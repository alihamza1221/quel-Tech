"use client";

import * as React from "react";
import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import axios, { AxiosError } from "axios";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  label: z.string().min(2, {
    message: "Label must be at least 2 characters.",
  }),
  deadline: z.date({
    required_error: "A deadline is required.",
  }),
  priority: z.enum(["important", "moderate", "normal"], {
    required_error: "Please select a priority.",
  }),
  subject: z.string().min(2, {
    message: "Subject must be at least 2 characters.",
  }),
});

export function TaskCreationPopup() {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: "",
      subject: "",
      priority: "normal",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post("/api/tasks/create", {
        headers: {
          "Content-Type": "application/json",
        },

        taskData: values,
      });
      console.log(response.data);

      if (!response.data?.data) {
        console.log(response.data?.message);
      }
    } catch (err: any) {
      const axiosError = err as AxiosError;
      console.log(axiosError.response?.data);
    }
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="border-4 border-black font-bold text-lg px-6 py-3 bg-green-400 hover:bg-green-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          Create New Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-pink-100 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Create New Task
          </DialogTitle>
          <DialogDescription>
            Fill in the details for your new task here.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-bold">Label</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-2 border-black text-lg p-2"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-lg font-bold">Deadline</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          className={cn(
                            "w-full pl-3 text-left font-normal border-2 border-black text-lg",
                            !field.value &&
                              "text-neutral-500 dark:text-neutral-400"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-bold">Priority</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="border-2 border-black text-lg">
                        <SelectValue placeholder="Select a priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="important" className="text-lg">
                        Important
                      </SelectItem>
                      <SelectItem value="moderate" className="text-lg">
                        Moderate
                      </SelectItem>
                      <SelectItem value="normal" className="text-lg">
                        Normal
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-bold">Subject</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-2 border-black text-lg p-2"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full border-4 border-black font-bold text-lg px-6 py-3 bg-blue-400 hover:bg-blue-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              Create Task
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
