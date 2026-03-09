import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import { cn } from '@lib/utils';

const buttonVariants = cva(
  'px-2.5 py-1 cursor-pointer inline-flex items-center justify-center rounded-lg font-bold transition-colors',
  {
    variants: {
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
    className="animate-spin h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
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
          buttonVariants({ variant }),
          loading && 'cursor-wait',
          isDisabled && 'opacity-50 cursor-not-allowed',
          className,
        )}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {loading ? (
          <Spinner />
        ) : (
          <>
            {leftIcon && <span className="mr-1.5">{leftIcon}</span>}
            {children}
          </>
        )}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export default Button;
