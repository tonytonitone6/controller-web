import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@lib/utils';
import { Icon } from '../Icon';

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  indeterminate?: boolean;
};

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MinusIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, indeterminate = false, disabled, checked, ...props }, ref) => {
    const isChecked = checked || indeterminate;

    return (
      <label
        className={cn(
          'relative inline-flex items-center justify-center size-5 rounded cursor-pointer',
          isChecked
            ? disabled
              ? 'bg-gray-400/40'
              : 'bg-gray-400'
            : disabled
              ? 'border border-gray-300 bg-gray-100'
              : 'border border-gray-400 bg-white',
          disabled && 'cursor-not-allowed',
          className,
        )}
      >
        <input
          ref={ref}
          type="checkbox"
          className="sr-only"
          checked={checked}
          disabled={disabled}
          {...props}
        />
        {indeterminate ? <MinusIcon /> : checked && <Icon name="check" color='white' size={16} />}
      </label>
    );
  },
);
Checkbox.displayName = 'Checkbox';

export default Checkbox;
