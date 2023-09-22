export type ToastType = "info" | "success" | "error";

export type Toast = {
  type?: ToastType;
  dismissible?: boolean;
  timeout?: number;
  message: string;
};

export type ToastWithId = { id: number } & Toast;
