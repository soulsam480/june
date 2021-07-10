import React from 'react';

interface Props {
  size?: string;
  icon: string;
}

const JIcon: React.FC<Props> = ({ size, icon }) => {
  return (
    <span className="flex items-center">
      <i
        style={{ fontSize: size || '16px' }}
        className="iconify"
        data-icon={icon}
        data-inline="true"
      />
    </span>
  );
};

export default JIcon;
