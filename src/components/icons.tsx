import { CommandIcon, Moon, Sun } from "lucide-react";

export const Logo = CommandIcon;
export const LightMode = Sun;
export const DarkMode = Moon;

export const Menu = () => (
	<svg
		strokeWidth="1.5"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className="h-5 w-5"
	>
		<title>Mobile Menu</title>
		<path
			d="M3 5H11"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M3 12H16"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M3 19H21"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);