import React, { useState } from 'react';
import JAvatar from 'src/lib/JAvatar';
import JButton from 'src/lib/JButton';
import JCard from 'src/lib/JCard';
import JImage from 'src/lib/JImage';
import JMenu from 'src/lib/JMenu';

interface Props {
  imgSrc: string;
}

const PostCard: React.FC<Props> = ({ imgSrc }) => {
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

  return (
    <JCard
      headerSlot={
        <div className="flex px-2 pt-2 justify-between items-center">
          <div className="flex space-x-2 grow items-center">
            <div className="flex-none">
              <JAvatar src="https://cdn.quasar.dev/img/avatar.png" rounded />
            </div>
            <div className="flex grow flex-col space-y-1 justify-start">
              <div className="text-sm">Manish Sahu</div>
              <div className="text-xs">Cuttack</div>
            </div>
          </div>
          <div className="flex-none">
            <JMenu
              value={val}
              onInput={(v) => setVal(v)}
              optionKey="value"
              options={options}
              size="20px"
              round
              sm
              noBg
              dense
              icon="ion:ellipsis-horizontal-outline"
              listAlign="right"
            />
          </div>
        </div>
      }
      footerSlot={
        <div className="flex px-1 py-4  justify-between items-center">
          <div className="flex space-x-2">
            <JButton noBg icon="ion:heart-outline" size="25px" sm dense />
            <JButton noBg icon="ion:chatbubble-outline" size="25px" sm dense />
          </div>

          <JButton noBg icon="ion:share-social-outline" size="25px" sm dense />
        </div>
      }
      block
    >
      <JImage src={imgSrc} loading="lazy" minHeight="300px" />
    </JCard>
  );
};

export default PostCard;
