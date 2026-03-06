import type { ReactNode, ComponentProps } from 'react';
import type {
  LabelColorScheme,
  LabelVariant,
  LabelShape,
  LabelSize,
} from './types';
import { getColorClasses } from './utils';
import { sizeStyles, shapeStyles } from './spec';

export type LabelProps = Omit<ComponentProps<'span'>, 'children'> & {
  children: ReactNode;
  colorScheme?: LabelColorScheme;
  variant?: LabelVariant;
  shape?: LabelShape;
  size?: LabelSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onLeftIconClick?: () => void;
  onRightIconClick?: () => void;
  disabled?: boolean;
};

const Label = ({
  children,
  colorScheme = 'secondary',
  variant = 'soft',
  shape = 'default',
  size = 'md',
  leftIcon,
  rightIcon,
  onLeftIconClick,
  onRightIconClick,
  disabled,
  className = '',
  ...rest
}: LabelProps) => {
  const colorClasses = getColorClasses(colorScheme, variant);
  const sizeClasses = sizeStyles[size] ?? sizeStyles.md;
  const shapeClasses = shapeStyles[shape] ?? shapeStyles.default;

  const classes = [
    'inline-flex items-center border font-medium leading-none whitespace-nowrap select-none transition-colors px-2 py-1',
    colorClasses,
    sizeClasses.container,
    shapeClasses,
    disabled ? 'opacity-50 cursor-not-allowed' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...rest}>
      {leftIcon && (
        <span
          className={onLeftIconClick ? 'cursor-pointer' : undefined}
          onClick={onLeftIconClick}
        >
          {leftIcon}
        </span>
      )}
      {children}
      {rightIcon && (
        <span
          className={onRightIconClick ? 'cursor-pointer' : undefined}
          onClick={onRightIconClick}
        >
          {rightIcon}
        </span>
      )}
    </span>
  );
};

export default Label;
