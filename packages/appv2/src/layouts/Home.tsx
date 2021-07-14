import React from 'react';
import { Outlet } from 'react-router-dom';
import LeftNav from 'src/components/user/LeftNav';
import RightNav from 'src/components/user/RightNav';
import 'src/styles/layouts.scss';

interface Props {}

const Authorized: React.FC<Props> = () => {
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
    </div>
  );
};

export default Authorized;
