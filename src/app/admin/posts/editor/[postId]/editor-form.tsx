"use client";

import { Icons } from "@/components/icons";
import { Editor } from "@/components/tiptap/editor";
import { EditorContent } from "@/components/tiptap/editor-content";
import { EditorContentLoading } from "@/components/tiptap/editor-content-loading";
import { EditorMenuBar } from "@/components/tiptap/editor-menu-bar";
import { editorActions } from "@/components/tiptap/editor-menu-bar-actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { Post } from "@/db/schema";
import { formatRelative } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import type { JSONContent } from "@tiptap/react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type Action, actions } from "./action-types";
import { editPostAction } from "./actions";
import { type EditPostFormData, editPostFormSchema } from "./schema";

export function EditorForm({ post }: { post: Post }) {
  const form = useForm<EditPostFormData>({
    resolver: zodResolver(editPostFormSchema),
    defaultValues: {
      title: post.title,
      id: post.id,
    },
  });

  const onSubmit = useCallback(
    async (data: EditPostFormData, action: Action, json?: JSONContent) => {
      if (!json) {
        return toast.error("Innehåll krävs", {
          description: "Var god skriv något",
        });
      }

      const response = await editPostAction(data, action, json);

      if (response?.isError) {
        toast.error(
          "Något gick fel när inlägget skulle sparas. Var god försök igen senare.",
        );
      } else {
        toast.success("Inlägg uppdaterat!");
      }
    },
    [],
  );

  return (
    <>
      <div>
        <span>Status: {post.draft ? "Utkast" : "Publicerad"}</span>
      </div>
      <div>
        {!post.draft && post.publishDate && (
          <span>Publicerad: {formatRelative(post.publishDate)}</span>
        )}
      </div>

      <div>Skapad: {formatRelative(post.createdAt)}</div>
      <div>
        {post.updatedAt && (
          <span>Uppdaterad: {formatRelative(post.updatedAt)}</span>
        )}
      </div>
      <Editor content={post.body}>
        {({ getJSON }) => (
          <>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((values, e) => {
                  if (!(e?.nativeEvent instanceof SubmitEvent)) {
                    toast.error("Webbläsaren stöds ej.", {
                      description:
                        "Du verkar använda en webbläsare som inte stöds. Ladda ner en modern webbläsare, t.ex. Google Chrome.",
                    });
                    return;
                  }

                  const submitter = e?.nativeEvent
                    ?.submitter as HTMLButtonElement;

                  const action = actions.find(
                    (action) => action === submitter?.name,
                  );
                  if (!action) {
                    return;
                  }

                  onSubmit(values, action, getJSON());
                })}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="hidden" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rubrik</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          autoCapitalize="none"
                          autoComplete="off"
                          autoCorrect="off"
                          disabled={form.formState.isSubmitting}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <EditorContent loadingContent={<EditorContentLoading />}>
                  <EditorMenuBar actions={editorActions} />
                </EditorContent>

                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="w-full"
                  name="save"
                >
                  {form.formState.isSubmitting && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Spara
                </Button>

                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="w-full"
                  name={post.draft ? "publish" : "unpublish"}
                >
                  {form.formState.isSubmitting && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {post.draft ? "Publicera" : "Avpublicera"}
                </Button>
              </form>
            </Form>
          </>
        )}
      </Editor>
    </>
  );
}
