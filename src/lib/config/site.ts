import { Icons } from "$lib/components/icons";

export const name = "Salens Samfällighetsförening";

export const url = "https://www.salenssamfallighetsforening.se";

export const description = "Samfällighetsföreningen på Tomtebo, Umeå";

export const mainNav = [
  {
    title: "Inlägg",
    href: "/posts",
    icon: Icons.newspaper,
    description: "Nyheter och kommande händeleser.",
  },
  {
    title: "Dokument",
    href: "/documents",
    icon: Icons.file,
    description: "Uppladdade filer, t.ex. protokoll från styrelsemöten.",
  },
  {
    title: "Hushåll",
    href: "/households",
    icon: Icons.contact,
    description: "Kontaktuppgifter till medlemmarna.",
  },
];

export type MainNav = typeof mainNav;

export const links = {
  allaBolag: "https://www.allabolag.se/7179068213/salens-samfallighetsforening",
  facebook: "https://www.facebook.com",
  github: "https://github.com/rickardlindahl/salens-samfallighetsforening",
};
