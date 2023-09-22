import type { Icon as LucideIcon } from "lucide-svelte";
import {
  AlertCircle,
  CheckCircle,
  ChevronLeft,
  CircleDollarSign,
  Command,
  Contact,
  Facebook,
  File,
  Github,
  Info,
  LayoutDashboard,
  Loader,
  Lock,
  LogOut,
  Mail,
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
  XCircle,
} from "lucide-svelte";

export type Icon = LucideIcon;
export const Icons = {
  add: Plus,
  alert: AlertCircle,
  arrowLeft: ChevronLeft,
  circleDollarSign: CircleDollarSign,
  close: X,
  contact: Contact,
  dashboard: LayoutDashboard,
  delete: Trash2,
  error: XCircle,
  facebook: Facebook,
  file: File,
  github: Github,
  info: Info,
  lock: Lock,
  logo: Command,
  logout: LogOut,
  mail: Mail,
  moon: Moon,
  more: MoreVertical,
  newspaper: Newspaper,
  publish: Send,
  save: Save,
  settings: Settings,
  spinner: Loader,
  success: CheckCircle,
  sun: SunMedium,
  unpublish: Undo,
  user: User,
};
