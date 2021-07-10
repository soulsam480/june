import React, { useState } from 'react';
import JButton from 'src/lib/JButton';
import { classNames } from 'src/utils/hepers';

interface Props {}

const AppNavbar: React.FC<Props> = () => {
  const [isNav, setNav] = useState(false);
  return (
    <nav
      className={classNames([
        'sticky top-0 z-20 transition-colors duration-400',
        'ease-in-out bg-warm-gray-100 dark:bg-cool-gray-800',
      ])}
    >
      <div className="max-w-7xl mx-auto px-2">
        <div className="relative flex items-center justify-between h-14">
          <div className="text-2xl">June</div>
          <div className="flex space-x-1">
            <JButton label="Manish" outline icon="ion:person" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
