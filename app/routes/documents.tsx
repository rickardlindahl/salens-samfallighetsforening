import { Await, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs, defer } from "@vercel/remix";
import { Suspense } from "react";
import { db } from "~/db";
import { authenticator } from "~/lib/auth.server";

export const meta = () => [
  {
    title: "Remix DnB Stack | Books Edge Streaming",
  },
  {
    charset: "utf-8",
  },
  {
    viewport: "width=device-width,initial-scale=1",
  },
];

async function getDocuments() {
  return [];
}

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  return defer({
    documents: getDocuments(),
  });
}

export default function Documents() {
  const { documents } = useLoaderData<typeof loader>();

  return (
    <main>
      <h1>Documents</h1>
      <Suspense fallback={<h1 className="mb-10 mt-5 text-center text-3xl font-bold">Loading books ...</h1>}>
        <Await resolve={documents}>
          {documents => (
            <div>
              {/*
              documents.map(doc => (
                <div key={doc.id} className="mb-5">
                  <h2 className="text-2xl font-bold">{doc.title}</h2>
                  <p>{doc.body}</p>
                </div>
              ))
              */}
            </div>
          )}
        </Await>
      </Suspense>
    </main>
  );
}
