import React from 'react';
import AppNavbar from 'src/components/AppNavbar';
import JButton from 'src/lib/JButton';
import JAvatar from './lib/JAvatar';

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <div>
      <AppNavbar />
      <div className="px-2 py-1 max-w-7xl mx-auto">
        <div>
          <div className="text-lg">Buttons</div>
          <div className="flex space-x-3 my-2 items-center">
            <JButton label="Manish" icon="ion:person" outline />
            <JButton label="Manish" icon="ion:person" flat />
            <JButton label="Manish" icon="ion:person" invert />
          </div>
          <div className="flex space-x-3 my-2 items-center">
            <JButton label="Manish" outline />
            <JButton label="Manish" flat />
            <JButton label="Manish" invert />
          </div>
          <div className="flex space-x-3 my-2 items-center">
            <JButton label="Manish" sm outline />
            <JButton label="Manish" sm flat />
            <JButton label="Manish" sm invert />
          </div>
          <div className="flex space-x-3 items-center">
            <JButton icon="ion:heart-outline" sm outline />
            <JButton icon="ion:heart-outline" sm flat />
            <JButton icon="ion:heart-outline" sm invert />
          </div>
          <div className="flex space-x-3 items-center my-2">
            <JButton icon="ion:heart-outline" sm round outline />
            <JButton icon="ion:heart-outline" sm round flat />
            <JButton icon="ion:heart-outline" sm round invert />
          </div>
        </div>
        <div>
          <div className="text-lg">Avatar</div>
          <div className="flex space-x-3 items-center">
            <JAvatar icon="ion:person" contentClass="bg-cyan-200" rounded />
            <JAvatar content="SS" contentClass="bg-cyan-200" rounded />
            <JAvatar src="https://cdn.quasar.dev/img/avatar.png" rounded />
            <JAvatar icon="ion:person" contentClass="bg-cyan-200" />
            <JAvatar content="SS" contentClass="bg-cyan-200" />
            <JAvatar src="https://cdn.quasar.dev/img/avatar.png" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
