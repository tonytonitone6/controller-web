import {
  type ComponentProps,
  type FC,
  memo,
} from 'react';

/** Available icon names — update this union type as you add/remove SVGs */
export type IconName =
  | 'align-justify'
  | 'arrow-down'
  | 'arrow-left'
  | 'arrow-right'
  | 'arrow-up'
  | 'arrow-up-down'
  | 'bookmark'
  | 'chart-column-big'
  | 'check'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-up'
  | 'chevrons-left-right'
  | 'chevrons-up-down'
  | 'circle-alert'
  | 'circle-check-big'
  | 'dark-mode'
  | 'ellipsis'
  | 'ellipsis-vertical'
  | 'eye'
  | 'eye-closed'
  | 'eye-off'
  | 'funnel'
  | 'grip'
  | 'layers'
  | 'layers-2'
  | 'layout-grid'
  | 'layout-panel-left'
  | 'light-mode'
  | 'loader-circle'
  | 'lock-keyhole'
  | 'lock-keyhole-open'
  | 'log-in'
  | 'mail'
  | 'maximize'
  | 'minimize'
  | 'minus'
  | 'noti-off'
  | 'panel-right-close'
  | 'panel-right-close-1'
  | 'pencil'
  | 'plus'
  | 'schedule'
  | 'search'
  | 'settings-2'
  | 'signal'
  | 'trash'
  | 'user-round'
  | 'user-round-cog'
  | 'users'
  | 'users-round'
  | 'x'
  | (string & {}); // allow arbitrary strings while keeping autocomplete

type SVGComponent = FC<ComponentProps<'svg'>>;

export interface IconProps extends Omit<ComponentProps<'svg'>, 'name'> {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

const modules = import.meta.glob<SVGComponent>('../../assets/icons/**/*.svg', {
  query: '?react',
  import: 'default',
  eager: true,
});

const iconRegistry = new Map<string, SVGComponent>();

for (const [path, Component] of Object.entries(modules)) {
  const match = path.match(/\/icons\/(.+)\.svg$/);
  if (match) {
    iconRegistry.set(match[1], Component);
  }
}

const DefaultFallback: FC<{ size: number }> = ({ size }) => (
  <span
    role="presentation"
    style={{
      display: 'inline-block',
      width: size,
      height: size,
      flexShrink: 0,
    }}
  />
);

const Icon: FC<IconProps> = memo(
  ({
    name,
    size = 16,
    strokeWidth,
    label,
    className,
    style,
    ...rest
  }) => {
    const SvgIcon = iconRegistry.get(name);

    if (!SvgIcon) {
      if (import.meta.env.DEV) {
        console.warn(`[Icon] "${name}" not found in assets/icons/`);
      }
      return <DefaultFallback size={size} />;
    }

    return (
      <SvgIcon
        width={size}
        height={size}
        strokeWidth={strokeWidth}
        aria-hidden={label ? undefined : true}
        aria-label={label}
        role={label ? 'img' : 'presentation'}
        className={className}
        style={{ flexShrink: 0, ...style }}
        {...rest}
      />
    );
  },
);

Icon.displayName = 'Icon';

export default Icon;
