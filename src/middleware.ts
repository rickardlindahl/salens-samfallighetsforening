import { getMeUser } from "@/lib/utilities/getMeUser";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	if (request.nextUrl.pathname.startsWith("/dashboard")) {
		const { user } = await getMeUser();

		if (!user) {
			return NextResponse.redirect(
				`${
					process.env.NEXT_PUBLIC_PAYLOAD_URL
				}/login?error=${encodeURIComponent(
					"You must be logged in to access the dashboard.",
				)}&redirect=${encodeURIComponent("/dashboard")}`,
			);
		}

		return NextResponse.next();
	}

	return NextResponse.next();
}
