import dateFnsFormatRelative from "date-fns/formatRelative/index";
import SwedishLocale from "date-fns/locale/sv/index";

export function formatRelative(date: Date, today: Date = new Date()) {
  return dateFnsFormatRelative(date, today, { locale: SwedishLocale });
}
