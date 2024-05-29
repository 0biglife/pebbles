import { FunctionComponent } from 'react';
import './style.css';

interface Props {
  variant?: 'h1' | 'h2' | 's1' | 'b1' | 'b2' | 'label' | 'link' | 'code';
  weight?: 'bold' | 'semi-bold' | 'medium' | 'regular' | 'thin';
  ellipsis?: boolean;
  style?: any;
  children?: any;
  link?: string;
  dangerouslySetInnerHTML?: any;
  onClick?: () => void;
}

const Typography: FunctionComponent<Props> = (props: Props) => {
  const {
    variant,
    weight,
    style,
    ellipsis,
    children,
    dangerouslySetInnerHTML,
    onClick,
  } = props;

  const defaultClassName = 'component-typography';
  const variantClassName = `${defaultClassName}-${
    variant === undefined ? 's1' : variant
  }`;
  const weightClassName = `${variantClassName}-${
    weight === undefined ? 'bold' : weight
  }`;
  const ellipsisClassName = `${defaultClassName}-${
    ellipsis === undefined ? 'non-ellipsis' : 'ellipsis'
  }`;

  return (
    <div
      className={`${defaultClassName} ${variantClassName} ${weightClassName} ${ellipsisClassName}`}
      style={{ ...style }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Typography;
