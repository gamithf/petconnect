import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "../../lib/utils"; // Note: Adjust this path to match your project structure

/**
 * A component that visually or semantically separates content.
 * @param {object} props - The props for the component.
 * @param {string} [props.className] - Additional CSS classes to apply.
 * @param {'horizontal' | 'vertical'} [props.orientation='horizontal'] - The orientation of the separator.
 * @param {boolean} [props.decorative=true] - Whether the separator is for decoration or has semantic meaning.
 * @param {React.Ref<HTMLDivElement>} ref - The ref forwarded to the underlying div element.
 */
const Separator = React.forwardRef(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };