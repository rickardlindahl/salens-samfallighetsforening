import { Post } from "@/payload-types";
import { twMerge } from "tailwind-merge";
import { Serialize } from "./serialize";
import { SerializedLexicalNode } from "./types";

interface RichTextProps
	extends Omit<React.HTMLAttributes<HTMLElement>, "content"> {
	content: Post["content"];
	as?: React.ElementType<React.HTMLAttributes<HTMLElement>>;
}

export const RichText: React.FC<RichTextProps> = ({
	content,
	as: Component = "div",
	className,
	...props
}) => {
	return (
		<Component className={twMerge("lexical", className)} {...props}>
			<Serialize nodes={content?.root.children as SerializedLexicalNode[]} />
		</Component>
	);
};
