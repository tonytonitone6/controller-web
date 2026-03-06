import React, {
  lazy,
  Suspense,
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
  fallback?: React.ReactNode;
}

const modules = import.meta.glob<SVGComponent>('../../assets/icons/**/*.svg', {
  query: '?react',
  import: 'default',
});

const iconRegistry = new Map<string, React.LazyExoticComponent<SVGComponent>>();

for (const [path, loader] of Object.entries(modules)) {
  const match = path.match(/\/icons\/(.+)\.svg$/);
  if (match) {
    const name = match[1];
    iconRegistry.set(
      name,
      lazy(async () => {
        const Component = await loader();
        return { default: Component };
      }),
    );
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
    fallback,
    className,
    style,
    ...rest
  }) => {
    const LazyIcon = iconRegistry.get(name);

    if (!LazyIcon) {
      if (import.meta.env.DEV) {
        console.warn(`[Icon] "${name}" not found in assets/icons/`);
      }
      return <DefaultFallback size={size} />;
    }

    const iconProps = {
      width: size,
      height: size,
      strokeWidth,
      'aria-hidden': label ? undefined : true,
      'aria-label': label,
      role: label ? 'img' : 'presentation',
      className,
      style: { flexShrink: 0, ...style },
      ...rest,
    };
    console.log(iconProps);
    return (
      <Suspense fallback={fallback ?? <DefaultFallback size={size} />}>
        {React.createElement(LazyIcon, iconProps)}
      </Suspense>
    );
  },
);

Icon.displayName = 'Icon';

export default Icon;
