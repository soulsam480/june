import React from 'react';
import AppNavbar from 'src/components/AppNavbar';
import JButton from 'src/lib/JButton';
import JAvatar from 'src/lib/JAvatar';
import JMenu from 'src/lib/JMenu';
import { useState } from 'react';
import JIcon from 'src/lib/JIcon';
import { classNames } from './utils/hepers';

interface Props {}

const App: React.FC<Props> = () => {
  const [isLike, setLike] = useState(false);
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
        <div className="text-2xl">June Component library</div>
        <div className="flex flex-col space-y-3">
          <div className="flex space-y-5 flex-col">
            <div className="text-lg">Buttons</div>
            <div className="flex space-x-3 items-center flex-wrap">
              <JButton label="Manish" icon="ion:person" outline />
              <JButton label="Manish" icon="ion:person" flat />
              <JButton label="Manish" icon="ion:person" invert loading />
            </div>
            <div className="flex space-x-3 items-center flex-wrap">
              <JButton label="Manish" outline />
              <JButton label="Manish" flat />
              <JButton label="Manish" invert loading />
            </div>
            <div className="flex space-x-3 items-center flex-wrap">
              <JButton label="Manish" sm outline />
              <JButton label="Manish" sm flat />
              <JButton label="Manish" sm invert loading />
            </div>
            <div className="flex space-x-3 items-center flex-wrap">
              <JButton icon="ion:heart-outline" sm outline />
              <JButton icon="ion:heart-outline" sm flat />
              <JButton icon="ion:heart-outline" sm invert loading />
            </div>
            <div className="flex space-x-3 items-center flex-wrap">
              <JButton icon="ion:heart" sm round outline />
              <JButton
                icon="ion:heart"
                round
                flat
                className={classNames(['!bg-transparent', { 'text-red-700': isLike }])}
                size="20px"
                onClick={() => setLike(!isLike)}
              />
              <JButton
                icon="ion:heart"
                sm
                round
                invert
                className={classNames([{ 'text-red-700': isLike }])}
              />
              <JButton
                icon="ion:heart"
                sm
                round
                className={classNames([{ 'text-red-700': isLike }])}
                onClick={() => setLike(!isLike)}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="text-lg">Avatar</div>
            <div className="flex space-x-3 items-center flex-wrap">
              <JAvatar icon="ion:person" contentClass="bg-cyan-200" rounded />
              <JAvatar content="SS" contentClass="bg-cyan-200" rounded />
              <JAvatar src="https://cdn.quasar.dev/img/avatar.png" rounded />
              <JAvatar icon="ion:person" contentClass="bg-cyan-200" />
              <JAvatar content="SS" contentClass="bg-cyan-200" />
              <JAvatar src="https://cdn.quasar.dev/img/avatar.png" />
            </div>
          </div>
          <div className="flex-col flex space-y-3">
            <div className="text-lg">Menu</div>
            <div className="flex space-y-5 flex-col flex-wrap">
              <div className="flex space-x-3">
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
              </div>
              <div className="flex space-x-3">
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
              </div>
              <div className="flex space-x-3">
                <JMenu
                  iconRight
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
                  iconRight
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
              </div>
              <JMenu
                value={val}
                onInput={(v) => setVal(v)}
                optionKey="value"
                options={options}
                size="30px"
                round
                sm
                avatarRound
                dense
                avatar="img:https://cdn.quasar.dev/img/avatar.png"
                listAlign="left"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
