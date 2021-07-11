import React from 'react';
import { classNames } from 'src/utils/hepers';
import JIcon from 'src/lib/JIcon';
import JAvatar from 'src/lib/JAvatar';
import { BaseJButtonProps } from 'src/utils/types';

export interface JButtonProps extends BaseJButtonProps {
  className?: string;
  loading?: boolean;
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
  iconRight,
  dense,
  avatarRound,
  ...rest
}) => {
  return (
    <button
      className={classNames([
        {
          'w-full': block,
        },
        dense ? '!px-[2px] !py-[2px]' : round ? '!px-3 !py-3' : sm ? '!px-2 !py-2' : '',
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
            'flex-row-reverse !space-x-reverse ': iconRight,
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
