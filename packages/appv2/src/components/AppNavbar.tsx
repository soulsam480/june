import React, { useState } from 'react';
import JAvatar from 'src/lib/JAvatar';
import { classNames } from 'src/utils/hepers';

interface Props {}

const AppNavbar: React.FC<Props> = () => {
  const [isNav, setNav] = useState(false);
  return (
    <nav
      className={classNames([
        'sticky top-0 z-20 transition-colors duration-400',
        'ease-in-out bg-warm-gray-100 dark:bg-cool-gray-800',
        'backdrop-filter backdrop-blur-md bg-opacity-40 border-b border-gray-200',
      ])}
    >
      <div className="max-w-7xl mx-auto px-2">
        <div className="relative flex items-center justify-between h-14">
          <div className="text-2xl">June</div>
          <div className="flex space-x-1">
            <JAvatar rounded src="https://cdn.quasar.dev/img/avatar.png" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
