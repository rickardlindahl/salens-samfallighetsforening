"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { useUploadThing } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  type UploadDocumentFormData,
  uploadDocumentFormSchema,
} from "./schema";

export function UploadDocumentForm() {
  const form = useForm<UploadDocumentFormData>({
    resolver: zodResolver(uploadDocumentFormSchema),
    defaultValues: {
      description: "",
      file: undefined,
    },
  });

  const { startUpload, isUploading } = useUploadThing("documentUploader", {
    onUploadError: (error) => {
      toast.error("An error occurred while uploading the file.");
      console.error(error);
    },
    onClientUploadComplete: () => {
      toast.success("File uploaded successfully.");
    },
  });

  const onSubmit = useCallback(
    async (data: UploadDocumentFormData) => {
      const file = data.file.item(0);
      if (!file) {
        return;
      }

      await startUpload([file], {
        description: data.description,
        createdAt: data.createdAt.toISOString(),
      });

      form.reset();
    },
    [form.reset, startUpload],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect="off"
                  disabled={isUploading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>File</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  disabled={isUploading || !form.watch("description")}
                  {...field}
                  value={undefined}
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files) {
                      field.onChange(files);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="createdAt"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <Icons.calendar className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>When the document was created.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isUploading} className="w-full">
          {isUploading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Upload
        </Button>
      </form>
    </Form>
  );
}
