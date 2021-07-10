import React, { ComponentProps } from 'react';
import { classNames } from 'src/utils/hepers';
import JIcon from 'src/lib/JIcon';

interface Props extends ComponentProps<'button'> {
  label?: any;
  icon?: string;
  size?: string;
  sm?: boolean;
  invert?: boolean;
  center?: boolean;
  block?: boolean;
  flat?: boolean;
  color?: string;
  round?: boolean;
  outline?: boolean;
  iconSlot?: React.ReactNode;
  labelSlot?: React.ReactNode;
}

const JButton: React.FC<Props> = ({
  block,
  size,
  center,
  color,
  flat,
  icon,
  invert,
  label,
  sm,
  iconSlot,
  labelSlot,
  outline,
  round,
  ...rest
}) => {
  return (
    <button
      className={classNames([
        {
          'px-2 py-2': sm,
          'px-3 py-2': !sm,
          'w-full': block,
          'space-x-1': (!!icon || !!iconSlot) && (!!label || !!labelSlot),
        },
        invert
          ? 'bg-lime-400 hover:bg-lime-300'
          : flat
          ? 'hover:bg-lime-200'
          : outline
          ? 'hover:bg-lime-200 border border-lime-400'
          : 'bg-lime-300 hover:bg-lime-400',
        `${round ? 'rounded-full' : 'rounded-md'}`,
        'flex items-center focus:outline-none disabled:(cursor-not-allowed hover:bg-red-100)',
        'transition-colors transition-duration-300 ease-in-out justify-center',
        `${rest.className}`,
      ])}
      type="button"
      onClick={rest.onClick}
    >
      <>{!!iconSlot ? iconSlot : icon && <JIcon icon={icon} size={sm ? '12px' : size} />}</>
      <>{labelSlot ? labelSlot : <div className={classNames({ 'text-xs': sm })}>{label}</div>}</>
    </button>
  );
};

export default JButton;
