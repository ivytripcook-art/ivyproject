import { InputHTMLAttributes } from "react";

type FieldProps = InputHTMLAttributes<HTMLInputElement> & { label: string };

export function Field({ label, ...props }: FieldProps) {
  return (
    <label className="mb-3 block">
      <span className="mb-1.5 block text-xs text-subtle">{label}</span>
      <input
        className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-primary-light outline-none focus:border-primary"
        {...props}
      />
    </label>
  );
}
