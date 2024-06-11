import Link from "next/link";
import { Icons } from "./icons";

export function SiteFooter() {
  const links = {
    allaBolag:
      "https://www.allabolag.se/7179068213/salens-samfallighetsforening",
    umeaEnergiDriftInfo: "https://driftinfo.umeaenergi.se/help",
  };

  return (
    <footer id="footer">
      <hr className="w-11/12 mx-auto" />

      <section className="container py-20 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
        <div className="col-span-full xl:col-span-2">
          <Link
            href="/"
            className="mr-6 flex items-center space-x-2"
            rel="noopener noreferrer"
          >
            <Icons.logo className="h-6 w-6" />
            <span className="font-bold text-xl inline-block">Salen</span>
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Links</h3>
          <div>
            <a
              rel="noreferrer noopener"
              href={links.allaBolag}
              className="opacity-60 hover:opacity-100"
            >
              Alla bolag
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href={links.umeaEnergiDriftInfo}
              className="opacity-60 hover:opacity-100"
            >
              Umeå Energi driftinfo
            </a>
          </div>
        </div>
      </section>

      <section className="container pb-14 text-center">
        <h3>&copy; {new Date().getFullYear()} Salens Samfällighetsförening</h3>
      </section>
    </footer>
  );
}
