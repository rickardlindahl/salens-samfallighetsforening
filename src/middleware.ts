import { getMeUser } from "@/lib/utilities/getMeUser";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = ["/posts"];

export async function middleware(request: NextRequest) {
	if (
		protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))
	) {
		const { user } = await getMeUser();

		if (!user) {
			return NextResponse.redirect(
				`${
					process.env.NEXT_PUBLIC_PAYLOAD_URL
				}/login?error=${encodeURIComponent(
					"You must be logged in to access the page.",
				)}&redirect=${encodeURIComponent(request.nextUrl.pathname)}`,
			);
		}

		return NextResponse.next();
	}

	return NextResponse.next();
}
