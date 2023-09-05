import type { Icon as LucideIcon } from "lucide-svelte";
import {
  ChevronLeft,
  CircleDollarSign,
  Command,
  Contact,
  Facebook,
  File,
  Github,
  Loader,
  Moon,
  Newspaper,
  SunMedium,
  X,
} from "lucide-svelte";

export type Icon = LucideIcon;
export const Icons = {
  arrowLeft: ChevronLeft,
  circleDollarSign: CircleDollarSign,
  close: X,
  contact: Contact,
  facebook: Facebook,
  file: File,
  github: Github,
  logo: Command,
  moon: Moon,
  newspaper: Newspaper,
  spinner: Loader,
  sun: SunMedium,
};
