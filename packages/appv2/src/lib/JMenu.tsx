import React, { MouseEvent, useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { classNames } from 'src/utils/hepers';
import { useClickoutside } from 'src/utils/hooks';
import JButton from 'src/lib/JButton';

export type optionType = string | { [k in 'label' | 'value']: any };

interface Props {
  options: optionType[];
  optionKey?: 'label' | 'value';
  value?: string;
  onInput?: (val: string, e: MouseEvent) => void;
  label?: string;
  icon?: string;
  size?: string;
  sm?: boolean;
  invert?: boolean;
  block?: boolean;
  flat?: boolean;
  color?: string;
  round?: boolean;
  outline?: boolean;
  iconSlot?: React.ReactNode;
  avatar?: string;
  avatarRound?: boolean;
  listAlign?: 'left' | 'right';
  iconRight?: boolean;
  dense?: boolean;
  onClick?: (e: MouseEvent) => void;
  optionSlot?: (
    option: string | Record<string, any>,
    getOptionVal: (option: string | Record<string, any>, optionKey?: string) => string,
  ) => React.ReactNode;
}

const JMenu: React.FC<Props> = (props) => {
  const { options, optionKey, onInput, value, optionSlot, listAlign, ...rest } = props;
  const [isMenu, setMenu] = useState(false);
  const [ref] = useClickoutside<HTMLDivElement>(() => setMenu(false));
  function handleClose(e: KeyboardEvent) {
    if (!isMenu) return;
    const { key } = e;
    if (key === 'Escape') return setMenu(false);
  }

  function getOptionVal(option: string | Record<string, any>, optionKey?: string): string {
    if (typeof option !== 'object') return option;
    if (!optionKey) throw new Error('optionKey prop is required for Object type option.');
    return option[optionKey];
  }

  function handleClick(option: string | Record<string, any>, e: MouseEvent) {
    if (!!onInput) {
      onInput(getOptionVal(option, optionKey), e);
    }
    setMenu(false);
  }

  useEffect(() => {
    window.addEventListener('keydown', handleClose);
    return () => window.removeEventListener('keydown', handleClose);
  }, []);

  return (
    <div className="relative j-menu" ref={ref}>
      <div>
        <JButton {...rest} onClick={() => setMenu(!isMenu)} />
      </div>
      <CSSTransition
        in={isMenu}
        timeout={{
          enter: 300,
          exit: 300,
        }}
        classNames="j-menu"
        unmountOnExit
      >
        <div
          className={classNames([
            'j-menu__list__parent',
            `${listAlign === 'left' ? 'origin-top-left left-0' : 'origin-top-right right-0'}`,
          ])}
        >
          <ul
            tab-index="-1"
            role="listbox"
            aria-labelledby="assigned-to-label"
            className="j-menu__list"
          >
            {options.map((option) => {
              return (
                <li
                  role="option"
                  key={getOptionVal(option, optionKey)}
                  title={getOptionVal(option, optionKey)}
                  className={classNames([
                    'j-menu__list-item',
                    `${value === getOptionVal(option, optionKey) ? `bg-lime-300` : ''}`,
                  ])}
                  onClick={(e) => handleClick(option, e)}
                >
                  {!!optionSlot ? (
                    optionSlot(option, getOptionVal)
                  ) : (
                    <span className="font-normal flex-grow">{getOptionVal(option, 'label')} </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </CSSTransition>
    </div>
  );
};

export default JMenu;
