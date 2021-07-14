import React from 'react';
import AppNavbar from 'src/components/AppNavbar';
import { useRoutes } from 'react-router-dom';
import Lib from 'src/pages/Lib';
import Index from 'src/layouts/Index';
import Home from 'src/layouts/Home';
import Feed from 'src/pages/Feed';
import Login from 'src/pages/Login';

interface Props {}

const App: React.FC<Props> = () => {
  const Routes = useRoutes([
    {
      path: '/',
      element: <Index />,
      children: [
        {
          path: '/',
          element: <Login />,
        },
        {
          path: '/lib',
          element: <Lib />,
        },
        {
          path: '/login',
          element: <Login />,
        },
      ],
    },
    {
      path: 'u',
      element: <Home />,
      children: [
        {
          path: '/',
          element: <Feed />,
        },
      ],
    },
  ]);

  return (
    <div>
      <AppNavbar />
      <div className="px-2 py-1 sm:max-w-7xl mx-auto">{Routes}</div>
    </div>
  );
};

export default App;
