import { formatRelative as dateFnsFormatRelative } from "date-fns/formatRelative";
import { sv as SwedishLocale } from "date-fns/locale/sv";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("sv-SE", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatRelative(date: Date, today: Date = new Date()) {
  return dateFnsFormatRelative(date, today, { locale: SwedishLocale });
}
