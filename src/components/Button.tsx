import * as React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        const base =
            'inline-flex items-center justify-center whitespace-nowrap font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-40 rounded-full';

        const variants: Record<string, string> = {
            primary: 'btn-amber amber-glow-sm',
            secondary: 'bg-white/10 text-white border border-white/15 hover:bg-white/15',
            outline: 'border text-amber bg-transparent hover:bg-amber-500/10',
            ghost: 'text-white/70 hover:text-white hover:bg-white/5',
        };

        const sizes: Record<string, string> = {
            sm: 'h-9 px-4 text-xs',
            md: 'h-10 px-6 text-sm',
            lg: 'h-12 px-8 text-base',
        };

        const outlineStyles =
            variant === 'outline'
                ? { borderColor: 'rgba(201,169,110,0.5)', color: '#c9a96e' }
                : {};

        return (
            <button
                ref={ref}
                style={outlineStyles}
                className={cn(base, variants[variant], sizes[size], className)}
                {...props}
            />
        );
    }
);
Button.displayName = 'Button';

export { Button };
