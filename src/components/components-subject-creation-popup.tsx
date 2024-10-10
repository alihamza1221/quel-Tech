"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios, { AxiosError } from "axios";

const formSchema = z.object({
  subject: z.string().min(2, {
    message: "Subject must be at least 2 characters.",
  }),
});

export function SubjectCreationPopup() {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      const response = await axios.post(`/api/subject/`, {
        headers: {
          "Content-Type": "application/json",
        },

        subjectData: values,
      });

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
        <Button className="border-4 border-black font-bold text-lg px-6 py-3 bg-purple-400 hover:bg-purple-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          Create New Subject
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-yellow-100 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Create New Subject
          </DialogTitle>
          <DialogDescription>
            Enter the name of your new subject here.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-bold">
                    Subject Name
                  </FormLabel>
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
              className="w-full border-4 border-black font-bold text-lg px-6 py-3 bg-green-400 hover:bg-green-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              Create Subject
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
