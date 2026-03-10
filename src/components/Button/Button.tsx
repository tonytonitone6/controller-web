import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import { cn } from '@lib/utils';

const buttonVariants = cva(
  'relative cursor-pointer inline-flex items-center justify-center rounded-lg font-bold transition-colors',
  {
    variants: {
      size: {
        sm: 'px-2 py-0.5',
        md: 'px-4 py-2',
        lg: 'px-6 py-2.5',
      },
      variant: {
        primary: [
          'bg-primary-500',
          'text-white',
          'hover:bg-primary-300',
          'focus:bg-primary-400',
        ].join(' '),
        secondary: [
          'text-gray-800',
          'hover:bg-label-secondary',
          'focus:bg-gray-300',
        ].join(' '),
        destructive: [
          'bg-status-red',
          'text-white',
          'hover:bg-status-red/60',
          'focus:bg-status-red/80',
        ].join(' '),
      },
      disabled: {
        true: 'cursor-not-allowed pointer-events-none',
      },
      loading: {
        true: 'cursor-wait pointer-events-none',
      },
    },
    compoundVariants: [
      {
        variant: 'primary',
        disabled: true,
        className: 'bg-gray-200 text-white font-bold',
      },
      {
        variant: 'secondary',
        disabled: true,
        className: 'bg-transparent text-gray-800/40 font-bold',
      },
      {
        variant: 'destructive',
        disabled: true,
        className: 'bg-status-red/40 text-white font-bold',
      },
      {
        variant: 'primary',
        loading: true,
        className: 'bg-primary-400 text-white',
      },
      {
        variant: 'secondary',
        loading: true,
        className: 'bg-gray-300 text-gray-800',
      },
      {
        variant: 'destructive',
        loading: true,
        className: 'bg-status-red/80 text-white',
      },
    ],
    defaultVariants: {
      size: 'md',
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    disabled?: boolean;
    loading?: boolean;
    leftIcon?: ReactNode;
  };

const Spinner = () => (
  <svg
    className="animate-spin h-5 w-5"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      cx="12"
      cy="12"
      r="9"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeDasharray="42 14"
    />
  </svg>
);

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size = 'md',
      asChild = false,
      loading = false,
      disabled,
      leftIcon,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot.Root : 'button';
    const isDisabled = disabled || loading;

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, disabled: isDisabled, loading }),
          className,
        )}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <Spinner />
          </span>
        )}
        <span className={cn('inline-flex items-center gap-inherit', loading && 'invisible')}>
          {leftIcon && <span className='mr-2'>{leftIcon}</span>}
          {children}
        </span>
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export default Button;
