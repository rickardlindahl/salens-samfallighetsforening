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

export function readableFileSize(attachmentSize: number) {
  const DEFAULT_SIZE = 0;
  const fileSize = attachmentSize ?? DEFAULT_SIZE;

  if (!fileSize) {
    return `${DEFAULT_SIZE} kb`;
  }

  const sizeInKb = fileSize / 1024;

  if (sizeInKb > 1024) {
    return `${(sizeInKb / 1024).toFixed(2)} mb`;
  }

  return `${sizeInKb.toFixed(2)} kb`;
}
