import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "../../lib/utils"; // Note: Adjust path as needed for your project

/**
 * The root container for an avatar component.
 * @param {object} props - The props for the component.
 * @param {string} [props.className] - Additional CSS classes.
 * @param {React.Ref<HTMLSpanElement>} ref - The ref forwarded to the root element.
 */
const Avatar = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

/**
 * The image part of the avatar. It will be rendered if the image loads successfully.
 * @param {object} props - The props for the component.
 * @param {string} [props.className] - Additional CSS classes.
 * @param {React.Ref<HTMLImageElement>} ref - The ref forwarded to the image element.
 */
const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

/**
 * The fallback part of the avatar, displayed while the image is loading or if it fails to load.
 * @param {object} props - The props for the component.
 * @param {string} [props.className] - Additional CSS classes.
 * @param {React.Ref<HTMLSpanElement>} ref - The ref forwarded to the fallback element.
 */
const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };