import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@lib/utils';

type TabProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Tab = forwardRef<HTMLButtonElement, TabProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center cursor-pointer rounded-lg px-3 py-1 text-sm font-medium transition-all',
          'border border-transparent text-gray-800',
          'focus:label-gradient-border',
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);
Tab.displayName = 'Tab';

export default Tab;
