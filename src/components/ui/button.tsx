import { Slot } from '@radix-ui/react-slot'
import {  cva } from 'class-variance-authority'
import * as React from 'react'

import type {VariantProps} from 'class-variance-authority';

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-300 btn-interactive group',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 glow-primary rounded-md',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-lg hover:shadow-destructive/20 rounded-md',
        outline:
          'border border-white/20 bg-transparent text-foreground hover:bg-white/10 hover:border-white/30 hover:shadow-lg hover:shadow-white/5 rounded-full',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-lg rounded-md',
        ghost: 'hover:bg-secondary/50 hover:text-foreground rounded-md',
        link: 'text-primary hover:underline link-underline',
        hero: 'bg-primary text-primary-foreground hover:bg-primary/80 hover:shadow-2xl hover:shadow-primary/30 rounded-full glow-primary font-semibold tracking-wide',
        'hero-outline':
          'border border-white/20 bg-white/5 backdrop-blur-sm text-foreground hover:bg-white/10 hover:border-white/30 hover:shadow-xl hover:shadow-white/10 rounded-full font-medium',
        nav: 'bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 rounded font-semibold',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-12 px-8 text-base',
        xl: 'h-14 px-10 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
