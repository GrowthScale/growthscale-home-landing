import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0",
        outline:
          "border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-accent/50 hover:-translate-y-0.5 active:translate-y-0",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0",
        ghost: "hover:bg-accent hover:text-accent-foreground hover:-translate-y-0.5 active:translate-y-0",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80",
        accent: "bg-accent text-accent-foreground hover:bg-accent/90 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0",
        success: "bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0",
        warning: "bg-orange-600 text-white hover:bg-orange-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0",
        gradient: "bg-gradient-to-r from-primary to-accent text-white hover:from-primary/90 hover:to-accent/90 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0",
        premium: "bg-gradient-to-r from-primary via-accent to-primary text-white hover:from-primary/90 hover:via-accent/90 hover:to-primary/90 shadow-2xl hover:shadow-3xl hover:scale-105 active:scale-95",
        glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-lg px-10 text-lg",
        "2xl": "h-16 rounded-xl px-12 text-xl",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-12 w-12",
        "icon-xl": "h-14 w-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
