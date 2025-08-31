import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "../../lib/utils"; // Note: Adjust this path to match your project structure

const Tabs = TabsPrimitive.Root;

/**
 * A container for the list of tab triggers.
 * @param {object} props - The props for the component.
 * @param {string} [props.className] - Additional CSS classes.
 * @param {React.Ref<HTMLDivElement>} ref - The ref forwarded to the list element.
 */
const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      // A pill-shaped container with a glassy background
      "relative inline-flex h-12 items-center justify-center rounded-full bg-black/20 p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

/**
 * The button that activates its associated tab panel.
 * @param {object} props - The props for the component.
 * @param {string} [props.className] - Additional CSS classes.
 * @param {React.Ref<HTMLButtonElement>} ref - The ref forwarded to the button element.
 */
const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "relative z-10 inline-flex items-center justify-center whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      "text-gray-300 hover:text-white transition-colors",
      // ✨ Active state: NOW ADDS an underline to the highlighted text.
      "data-[state=active]:text-white data-[state=active]:underline data-[state=active]:underline-offset-4 data-[state=active]:decoration-white/70",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

/**
 * The container for the content of a tab.
 * @param {object} props - The props for the component.
 * @param {string} [props.className] - Additional CSS classes.
 * @param {React.Ref<HTMLDivElement>} ref - The ref forwarded to the content element.
 */
const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      // Enhanced animation: fade, zoom, and slide in for a dynamic effect
      "data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:zoom-in-95 data-[state=active]:slide-in-from-top-4 duration-500",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };