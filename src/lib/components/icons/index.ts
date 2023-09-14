import type { Icon as LucideIcon } from "lucide-svelte";
import {
  AlertCircle,
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
  MoreVertical,
  Newspaper,
  Plus,
  Save,
  Send,
  Settings,
  SunMedium,
  Trash2,
  Undo,
  User,
  X,
} from "lucide-svelte";

export type Icon = LucideIcon;
export const Icons = {
  alert: AlertCircle,
  add: Plus,
  arrowLeft: ChevronLeft,
  circleDollarSign: CircleDollarSign,
  close: X,
  contact: Contact,
  dashboard: LayoutDashboard,
  delete: Trash2,
  facebook: Facebook,
  file: File,
  github: Github,
  logo: Command,
  logout: LogOut,
  moon: Moon,
  more: MoreVertical,
  newspaper: Newspaper,
  publish: Send,
  save: Save,
  settings: Settings,
  spinner: Loader,
  sun: SunMedium,
  unpublish: Undo,
  user: User,
};
