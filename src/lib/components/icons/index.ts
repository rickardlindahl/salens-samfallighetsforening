import type { Icon as LucideIcon } from "lucide-svelte";
import {
  ChevronLeft,
  CircleDollarSign,
  Command,
  Contact,
  Facebook,
  File,
  Github,
  LayoutDashboard,
  Loader,
  LogOut,
  Moon,
  Newspaper,
  Settings,
  SunMedium,
  User,
  X,
} from "lucide-svelte";

export type Icon = LucideIcon;
export const Icons = {
  arrowLeft: ChevronLeft,
  circleDollarSign: CircleDollarSign,
  close: X,
  contact: Contact,
  dashboard: LayoutDashboard,
  facebook: Facebook,
  file: File,
  github: Github,
  logo: Command,
  logout: LogOut,
  moon: Moon,
  newspaper: Newspaper,
  settings: Settings,
  spinner: Loader,
  sun: SunMedium,
  user: User,
};
