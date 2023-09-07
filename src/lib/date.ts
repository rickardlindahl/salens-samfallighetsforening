import dateFnsFormatRelative from "date-fns/formatRelative";
import SwedishLocale from "date-fns/locale/sv";

export function formatRelative(date: Date, today: Date = new Date()) {
  return dateFnsFormatRelative(date, today, { locale: SwedishLocale });
}
