import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import { cn } from "../../lib/utils"; // Note: Adjust this path as needed for your project

/**
 * A container for a set of radio buttons, allowing a user to select one option from a set.
 * @param {object} props - The props for the component.
 * @param {string} [props.className] - Additional CSS classes for the group container.
 * @param {React.Ref<HTMLDivElement>} ref - The ref forwarded to the root div element.
 */
const RadioGroup = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

/**
 * An individual radio button item to be used inside a RadioGroup.
 * @param {object} props - The props for the component.
 * @param {string} [props.className] - Additional CSS classes for the item.
 * @param {React.Ref<HTMLButtonElement>} ref - The ref forwarded to the button element.
 */
const RadioGroupItem = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };