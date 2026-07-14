import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  const base = "w-full rounded-lg px-4 py-2.5 text-sm font-medium transition-colors";
  const styles =
    variant === "primary"
      ? "bg-primary text-background hover:bg-primary/90"
      : "border border-border text-primary-light hover:bg-surface";

  return <button className={`${base} ${styles} ${className}`} {...props} />;
}
