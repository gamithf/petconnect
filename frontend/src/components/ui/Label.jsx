import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils"; // Note: Adjust this path to match your project structure

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

/**
 * A component that renders an accessible label for form elements like input, textarea, etc.
 * @param {object} props - The props for the component.
 * @param {string} [props.className] - Additional CSS classes to apply.
 * @param {React.Ref<HTMLLabelElement>} ref - The ref forwarded to the label element.
 */
const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };