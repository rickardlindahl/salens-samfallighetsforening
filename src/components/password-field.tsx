import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  type HTMLInputAutoCompleteAttribute,
  createElement,
  useState,
} from "react";
import { Icons } from "./icons";

type PasswordFieldProps = {
  description?: string;
  autoComplete?: HTMLInputAutoCompleteAttribute;
  id?: string;
};

export function PasswordField({
  description,
  autoComplete = "on",
  id,
}: PasswordFieldProps) {
  const { control, getFieldState } = useFormContext();
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  return (
    <FormField
      control={control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={id}>Lösenord</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                id={id}
                type={passwordVisibility ? "text" : "password"}
                placeholder="Fyll i lösenord"
                autoComplete={autoComplete}
                {...field}
                className={`pr-12 ${
                  getFieldState("password").error && "border-red-500"
                }`}
              />
              <div
                className="absolute inset-y-0 right-0 flex cursor-pointer items-center p-3 text-muted-foreground"
                onClick={() => setPasswordVisibility(!passwordVisibility)}
                onKeyUp={() => setPasswordVisibility(!passwordVisibility)}
              >
                {createElement(passwordVisibility ? Icons.eye : Icons.eyeOff, {
                  className: "h-6 w-6",
                })}
              </div>
            </div>
          </FormControl>
          <FormMessage />
          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  );
}
