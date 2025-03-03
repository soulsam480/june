import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from 'src/components/user/BottomNav';
import LeftNav from 'src/components/user/LeftNav';
import RightNav from 'src/components/user/RightNav';
import 'src/styles/layouts.scss';
import { classNames } from 'src/utils/hepers';
import { useHideOnScroll } from 'src/utils/hooks';

interface Props {}

const Authorized: React.FC<Props> = () => {
  const isHidden = useHideOnScroll();

  return (
    <div className="j-layout">
      <aside className="j-layout__leftbar">
        <LeftNav />
      </aside>
      <main className="j-layout__content">
        <Outlet />
      </main>
      <aside className="j-layout__rightbar">
        {' '}
        <RightNav />
      </aside>
      <div
        className={classNames([
          'j-layout__bottombar',
          {
            'j-layout__bottombar--hidden': isHidden,
          },
        ])}
      >
        <BottomNav />
      </div>
    </div>
  );
};

export default Authorized;
