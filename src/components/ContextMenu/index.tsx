import { FunctionComponent, useEffect, useRef, useState } from 'react';
import './ContextMenu.css';
import { Typography } from 'components';
import {
  globeSvg, upArrowSvg, downArrowSvg
} from 'assets';
import calendarIcon from 'assets/svg/calendar.svg';

interface Props {
  decoration?: string;
  value?: string;
  visibleNavigator?: boolean;
  style?: any;
  iconStyle?: any;
  wrapperStyle?: any;
  contextStyle?: any;
  options?: string[];
  nowIndex?: number;
  children?: React.ReactNode;
  onChange?: (index: number) => void;
  selectNowIndex?: (value: number) => void;
}

const ContextMenu: FunctionComponent<Props> = (props: Props) => {
  const {
    decoration,
    value,
    visibleNavigator = false,
    options,
    style,
    iconStyle,
    contextStyle,
    wrapperStyle,
    onChange,
    selectNowIndex,
    nowIndex,
  } = props;
  const { children } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const dropMenuRef = useRef<HTMLDivElement | null>(null);
  const defaultClassName = 'component-context-menu';
  const itemClassName = `${defaultClassName}-item`;

  const handleClick = (index: number) => {
    if (onChange) onChange(index);
    setVisible(false);
  };

  useEffect(() => {
    const handleOutsideClose = (e: { target: any }) => {
      if (visible && !dropMenuRef.current?.contains(e.target))
        setVisible(false);
    };
    document.addEventListener('click', handleOutsideClose);
    return () => document.removeEventListener('click', handleOutsideClose);
  }, [visible]);

  return (
    <div
      ref={dropMenuRef}
      className={`${defaultClassName}`}
      style={wrapperStyle}
    >
      <div
        className={`${itemClassName}`}
        onClick={(e) => {
          e.stopPropagation();
          setVisible(!visible);
        }}
        style={style}
      >
        {decoration && (
          <div className={`${itemClassName}-button-decoration`} style={iconStyle}>
            <img src={decoration} alt="" />
          </div>
        )}
        {children && children}
        {value && (
          <Typography
            variant="b1"
            weight="regular"
            style={{
              color: 'var(--text-ui-text-secondary)',
              marginRight: '26px',
            }}
          >
            {value}
          </Typography>
        )}
        {visibleNavigator && (
          <img
            className={`${itemClassName}-triangle`}
            src={visible ?upArrowSvg : downArrowSvg}
            alt=""
          />
        )}
      </div>
      {visible && (
        <div className={`${defaultClassName}-list`} style={contextStyle}>
          {options &&
            options.map((item, index) => (
              <div
                key={`${defaultClassName}-list-item-${item}__${index}`}
                className={`${defaultClassName}-list-item`}
                onClick={(e) => {
                  if (selectNowIndex && nowIndex !== undefined) {
                    selectNowIndex(nowIndex);
                  }
                  e.stopPropagation();
                  handleClick(index);
                }}
              >
                <Typography
                  variant="b1"
                  weight="regular"
                  style={{
                    color: 'var(--text-ui-text-secondary)',
                  }}
                >
                  {item}
                </Typography>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ContextMenu;