import { Await, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs, defer } from "@vercel/remix";
import { Suspense } from "react";
import { db } from "~/db";
import { households as householdsTable } from "~/db/schema";
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

function getHouseholds() {
  return db.select().from(householdsTable).all();
}

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  return defer({
    households: getHouseholds(),
  });
}

export default function Households() {
  const { households } = useLoaderData<typeof loader>();

  return (
    <main>
      <h1>Households</h1>
      <Suspense fallback={<h1 className="mb-10 mt-5 text-center text-3xl font-bold">Loading households ...</h1>}>
        <Await resolve={households}>
          {households => (
            // Render a grid of households
            <section className="grid grid-cols-1 gap-5">
              {households.map(household => (
                <div key={household.id} className="rounded-lg bg-gray-100 p-5">
                  <h2 className="text-2xl font-bold">
                    {household.streetName} {household.houseNumber}
                  </h2>
                </div>
              ))}
            </section>
          )}
        </Await>
      </Suspense>
    </main>
  );
}
