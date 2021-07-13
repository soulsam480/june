import React from 'react';
import AppNavbar from 'src/components/AppNavbar';
import { useRoutes } from 'react-router-dom';
import Lib from 'src/pages/Lib';
import Index from 'src/layouts/Index';
import Authorized from 'src/layouts/Authorized';
import Feed from 'src/pages/Feed';

interface Props {}

const App: React.FC<Props> = () => {
  const Routes = useRoutes([
    {
      path: '/',
      element: <Index />,
      children: [
        {
          path: '/',
          element: <Lib />,
        },
      ],
    },
    {
      path: 'u',
      element: <Authorized />,
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
      <div className="px-2 py-1 sm:max-w-7xl mx-auto">
        {/* <Routes>
          <Route path="/" element={<Lib />}>
          </Route>

          <Route path="u" element={<Authorized />}>
            <Route path="" element={<Lib />} />
          </Route>
        </Routes> */}
        {Routes}
      </div>
    </div>
  );
};

export default App;
