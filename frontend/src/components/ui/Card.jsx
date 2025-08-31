import * as React from "react";
import { cn } from "../../lib/utils"; // Note: Adjust the path to your utils file

/**
 * A container component that groups related content.
 * @param {object} props - The props for the component.
 * @param {string} [props.className] - Additional CSS classes.
 * @param {React.Ref<HTMLDivElement>} ref - The ref forwarded to the main div element.
 */
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

/**
 * A header section for a Card component.
 * @param {object} props - The props for the component.
 * @param {string} [props.className] - Additional CSS classes.
 * @param {React.Ref<HTMLDivElement>} ref - The ref forwarded to the header div element.
 */
const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

/**
 * A title element for a CardHeader. Best used as a direct child of CardHeader.
 * @param {object} props - The props for the component.
 * @param {string} [props.className] - Additional CSS classes.
 * @param {React.Ref<HTMLDivElement>} ref - The ref forwarded to the title div element.
 */
const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  // Note: The original component uses a `div`. For better semantics, consider changing this to an `<h3>` or similar heading tag.
  <div
    ref={ref}
    className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

/**
 * A description element for a CardHeader. Best used as a direct child of CardHeader.
 * @param {object} props - The props for the component.
 * @param {string} [props.className] - Additional CSS classes.
 * @param {React.Ref<HTMLDivElement>} ref - The ref forwarded to the description div element.
 */
const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  // Note: The original component uses a `div`. For better semantics, consider changing this to a `<p>` tag.
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

/**
 * The main content area of a Card component.
 * @param {object} props - The props for the component.
 * @param {string} [props.className] - Additional CSS classes.
 * @param {React.Ref<HTMLDivElement>} ref - The ref forwarded to the content div element.
 */
const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

/**
 * A footer section for a Card component.
 * @param {object} props - The props for the component.
 * @param {string} [props.className] - Additional CSS classes.
 * @param {React.Ref<HTMLDivElement>} ref - The ref forwarded to the footer div element.
 */
const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };