import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils"; // Note: Adjust this path as needed

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * A component that displays a short, important message in a way that attracts the user's attention without interrupting their task.
 * @param {object} props - The props for the component.
 * @param {'default' | 'destructive'} [props.variant='default'] - The visual style of the alert.
 * @param {string} [props.className] - Additional CSS classes to apply.
 * @param {React.Ref<HTMLDivElement>} ref - The ref forwarded to the main div element.
 */
const Alert = React.forwardRef(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

/**
 * The title for the Alert component. Should be used as a child of Alert.
 * @param {object} props - The props for the component.
 * @param {string} [props.className] - Additional CSS classes to apply.
 * @param {React.Ref<HTMLHeadingElement>} ref - The ref forwarded to the h5 element.
 */
const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

/**
 * The description for the Alert component. Should be used as a child of Alert.
 * @param {object} props - The props for the component.
 * a@param {string} [props.className] - Additional CSS classes to apply.
 * @param {React.Ref<HTMLDivElement>} ref - The ref forwarded to the description div element.
 */
const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };