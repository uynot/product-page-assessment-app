import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	asChild?: boolean;
	variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
	size?: "default" | "sm" | "lg" | "icon";
}

const buttonVariants = {
	base: "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
	variants: {
		default: "bg-primary text-primary-foreground hover:bg-primary/90",
		destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
		outline: "border border-input hover:bg-accent hover:text-accent-foreground",
		secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
		ghost: "hover:bg-accent hover:text-accent-foreground",
		link: "underline-offset-4 hover:underline text-primary",
	},
	sizes: {
		default: "h-10 px-4 py-2",
		sm: "h-9 px-3 rounded-md",
		lg: "h-11 px-8 rounded-md",
		icon: "h-10 w-10",
	},
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(buttonVariants.base, buttonVariants.variants[variant], buttonVariants.sizes[size], className)}
				ref={ref}
				{...props}
			/>
		);
	}
);

Button.displayName = "Button";

export { Button };
