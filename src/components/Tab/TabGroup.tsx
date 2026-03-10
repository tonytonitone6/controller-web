import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '@lib/utils';

type TabGroupProps = HTMLAttributes<HTMLDivElement>;

const TabGroup = forwardRef<HTMLDivElement, TabGroupProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('inline-flex items-center gap-1', className)}
        role="tablist"
        {...props}
      >
        {children}
      </div>
    );
  },
);
TabGroup.displayName = 'TabGroup';

export default TabGroup;
