import React from 'react';
import AppNavbar from 'src/components/AppNavbar';
import JButton from 'src/lib/JButton';
import JAvatar from 'src/lib/JAvatar';
import JMenu from 'src/lib/JMenu';
import { useState } from 'react';
import JIcon from 'src/lib/JIcon';

interface Props {}

const App: React.FC<Props> = () => {
  const [val, setVal] = useState('');
  const options = [
    {
      label: 'Account',
      value: 'account',
      icon: 'ion:ios-contact-outline',
    },
    {
      label: 'Home',
      value: 'home',
      icon: 'ion:home-outline',
    },
    {
      label: 'Log out',
      value: 'logout',
      icon: 'ion:log-out-outline',
    },
  ];
  function logger() {
    console.log('clicked');
  }
  return (
    <div>
      <AppNavbar />
      <div className="px-2 py-1 max-w-7xl mx-auto h-[2000px]">
        <div>
          <div className="text-lg">Buttons</div>
          <div className="flex space-x-3 my-2 items-center">
            <JButton label="Manish" icon="ion:person" outline />
            <JButton label="Manish" icon="ion:person" flat />
            <JButton label="Manish" icon="ion:person" invert loading />
            <JButton label="Manish" icon="ion:person" loading />
          </div>
          <div className="flex space-x-3 my-2 items-center">
            <JButton label="Manish" outline />
            <JButton label="Manish" flat />
            <JButton label="Manish" invert loading />
          </div>
          <div className="flex space-x-3 my-2 items-center">
            <JButton label="Manish" sm outline />
            <JButton label="Manish" sm flat />
            <JButton label="Manish" sm invert loading />
          </div>
          <div className="flex space-x-3 items-center">
            <JButton icon="ion:heart-outline" sm outline />
            <JButton icon="ion:heart-outline" sm flat />
            <JButton icon="ion:heart-outline" sm invert loading />
          </div>
          <div className="flex space-x-3 items-center my-2">
            <JButton icon="ion:heart-outline" sm round outline />
            <JButton icon="ion:heart-outline" sm round flat />
            <JButton icon="ion:heart-outline" sm round invert loading />
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
        <div>
          <div className="text-lg">Menu</div>
          <div className="flex space-x-3 items-center">
            <span>With scoped slot {'->'} </span>
            <JMenu
              icon="ion:heart"
              options={options}
              label="menu"
              onInput={logger}
              optionKey="value"
              optionSlot={(option, getVal) => (
                <div className="w-full flex items-center space-x-2">
                  <span className="flex-none">
                    <JIcon icon={getVal(option, 'icon')} />
                  </span>
                  <span className="flex-grow"> {getVal(option, 'label')} </span>
                </div>
              )}
              listAlign="left"
            />
            <span>Basic variations ={'>'} </span>
            <JMenu
              value={val}
              onInput={(v) => setVal(v)}
              options={options}
              optionKey="value"
              size="25px"
              label="menu"
              flat
              avatarRound
              avatar="img:https://cdn.quasar.dev/img/avatar.png"
              listAlign="left"
            />{' '}
            <JMenu
              value={val}
              onInput={(v) => setVal(v)}
              options={options}
              optionKey="value"
              size="25px"
              label="menu"
              outline
              avatarRound
              avatar="img:https://cdn.quasar.dev/img/avatar.png"
              listAlign="left"
            />{' '}
            <JMenu
              value={val}
              onInput={(v) => setVal(v)}
              optionKey="value"
              options={options}
              size="25px"
              label="menu"
              avatarRound
              avatar="img:https://cdn.quasar.dev/img/avatar.png"
              listAlign="left"
            />
            <JMenu
              value={val}
              onInput={(v) => setVal(v)}
              optionKey="value"
              options={options}
              size="25px"
              round
              sm
              avatarRound
              avatar="img:https://cdn.quasar.dev/img/avatar.png"
              listAlign="left"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
