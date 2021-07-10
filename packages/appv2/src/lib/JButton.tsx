import React, { ComponentProps } from 'react';
import { classNames } from 'src/utils/hepers';
import JIcon from 'src/lib/JIcon';
import JAvatar from 'src/lib/JAvatar';

export interface JButtonProps extends ComponentProps<'button'> {
  label?: string;
  icon?: string;
  size?: string;
  sm?: boolean;
  invert?: boolean;
  block?: boolean;
  flat?: boolean;
  color?: string;
  round?: boolean;
  outline?: boolean;
  loading?: boolean;
  avatar?: string;
  avatarRound?: boolean;
  iconSlot?: React.ReactNode;
  labelSlot?: React.ReactNode;
}

const JButton: React.FC<JButtonProps> = ({
  block,
  size,
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
  loading,
  avatar,
  avatarRound,
  ...rest
}) => {
  return (
    <button
      className={classNames([
        {
          '!px-2 !py-2': sm,
          'w-full': block,
          '!px-3 !py-3': round && !sm,
        },
        invert
          ? 'bg-lime-400 hover:bg-lime-300'
          : flat
          ? 'hover:bg-lime-200'
          : outline
          ? 'hover:bg-lime-200 border border-lime-400'
          : 'bg-lime-300 hover:bg-lime-400',
        `${round ? 'rounded-full' : 'rounded-md'}`,
        'j-button',
        `${rest.className ?? ''}`,
      ])}
      type="button"
      onClick={rest.onClick}
    >
      <span
        className={classNames([
          'j-button__content',
          {
            'j-button__content--loading': loading,
          },
        ])}
      >
        <>
          {!!iconSlot ? (
            iconSlot
          ) : icon ? (
            <JIcon icon={icon} size={sm ? '12px' : size} />
          ) : (
            avatar && (
              <JAvatar
                icon={avatar.startsWith('icn:') ? avatar.split('icn:')[1] : undefined}
                src={avatar.startsWith('img:') ? avatar.split('img:')[1] : undefined}
                size={size || '16px'}
                content={
                  !avatar.startsWith('img:') || !avatar.startsWith('icn:') ? avatar : undefined
                }
                rounded={avatarRound}
              />
            )
          )}
        </>
        <>
          {labelSlot
            ? labelSlot
            : label && (
                <span className={classNames([{ 'text-xs': sm }, 'flex-grow'])}>{label}</span>
              )}
        </>
      </span>
      {loading && (
        <span className="j-button__bottom">
          <span
            className={classNames([
              'j-button__loading',
              `j-button__loading${flat || outline ? '--invert' : '--normal'}`,
            ])}
            style={{ height: sm ? '16px' : '20px', width: sm ? '16px' : '20px' }}
          ></span>
        </span>
      )}
    </button>
  );
};

export default JButton;
