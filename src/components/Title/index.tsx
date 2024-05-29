import { FunctionComponent } from 'react';
import Typography from '../Typography/index';

interface Props {
  size: 'big' | 'medium';
  text: string;
  style?: any;
}

const Title: FunctionComponent<Props> = (props: Props) => {
  const { size, text, style } = props;

  return (
    <Typography
      variant={size === 'big' ? 'h2' : size === 'medium' ? 's1' : 's1'}
      weight="bold"
      style={style}
    >
      {text}
    </Typography>
  );
};

export default Title;
