import { cn } from "@/lib/utils";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";

export default function Kbd(
  props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
) {
  const { children, className, ...rest } = props;
  return (
    <kbd
      className={cn(
        "pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono font-medium opacity-100",
        className,
      )}
      {...rest}
    >
      {children}
    </kbd>
  );
}
