import { writable } from "svelte/store";
import type { ToastWithId, Toast } from "./types";

export const toasts = writable<ToastWithId[]>([]);

const defaults: Omit<Toast, "message"> = {
  type: "info",
  dismissible: true,
  timeout: 3000,
};

export const addToast = (toast: Toast) => {
  const id = Math.floor(Math.random() * 10000);

  const _toast: ToastWithId = {
    ...defaults,
    ...toast,
    id,
  };

  toasts.update((all) => [_toast, ...all]);

  if (_toast.timeout) {
    setTimeout(() => dismissToast(id), _toast.timeout);
  }
};

export const dismissToast = (id: number) => {
  toasts.update((all) => all.filter((t) => t.id !== id));
};
