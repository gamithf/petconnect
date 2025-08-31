import * as React from "react";
import { cn } from "../../lib/utils"; // Note: Adjust this path to match your project structure

/**
 * A standard HTML input component with default styling.
 * It forwards a ref and accepts all standard input attributes.
 * @param {object} props - The props for the component.
 * @param {string} [props.className] - Additional CSS classes to apply.
 * @param {string} [props.type] - The type of the input (e.g., 'text', 'password', 'email').
 * @param {React.Ref<HTMLInputElement>} ref - The ref forwarded to the input element.
 */
const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };