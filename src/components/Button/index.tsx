import { CSSProperties, FunctionComponent } from 'react';

import './style.css';
import Spinner from '../Spinner';

interface Props {
  disabled?: boolean;
  onClick?: () => void;
  loading?: boolean;
  size?: 'small' | 'medium' | 'large';

  style?: CSSProperties;

  children?: any;

  startIcon?: string;
  endIcon?: string;

  variant?: 'contained' | 'outlined' | 'text';

  className?: string;
}

const Button: FunctionComponent<Props> = (props: Props) => {
  const {
    disabled,
    onClick,
    loading,
    size,
    startIcon,
    endIcon,
    style,
    children,
    variant,
    className,
  } = props;

  const defaultClassName = 'component-button';
  const sizeClassName = `${defaultClassName}-${size ? size : 'medium'}`;
  const variantClassName = `${defaultClassName}-${
    variant ? variant : 'contained'
  }`;
  const createAccountDisabledConfirmButtonClassName = `${
    className ? className : ''
  } `;

  return (
    <button
      className={`${defaultClassName} ${sizeClassName} ${variantClassName} ${createAccountDisabledConfirmButtonClassName}`}
      disabled={disabled === undefined ? false : disabled}
      onClick={onClick}
      style={style}
    >
      {startIcon && (
        <img style={{ marginRight: '8px' }} src={startIcon} alt="" />
      )}
      {loading ? (
        <Spinner style={{ width: '44px', height: '44px' }} />
      ) : (
        children
      )}
      {endIcon && <img src={endIcon} alt="" />}
    </button>
  );
};

export default Button;
