import React from 'react';
import { BaseJButtonProps } from './../utils/types';
import { classNames } from 'src/utils/hepers';

export interface JCardProps extends BaseJButtonProps {
  className?: string;
  loading?: boolean;
  height?: string;
  width?: string;
  headerSlot?: React.ReactNode;
  footerSlot?: React.ReactNode;
}

const JCard: React.FC<JCardProps> = ({
  height,
  width,
  headerSlot,
  children,
  footerSlot,
  noBg,
  invert,
  flat,
  outline,
  round,
  ...rest
}) => {
  return (
    <div
      className={classNames([
        `border-2 `,
        noBg ? 'bg-transparent' : 'bg-warm-gray-200',
        `${round ? 'rounded-full' : 'rounded-md'}`,
        `${rest.className ?? ''}`,
      ])}
      style={{ width, height }}
    >
      <div className="flex flex-col justify-between space-y-2">
        <div>{headerSlot}</div>
        <div className="grow h-auto w-full">{children}</div>
        <div>{footerSlot}</div>
      </div>
    </div>
  );
};

export default JCard;
