import { FunctionComponent } from 'react';
import Lottie from 'react-lottie';
import { spinnerLottie } from 'assets';

import './style.css';

interface SpinnerProps {
  style?: any;
  wrapperStyle?: any;
}

const option = {
  animationData: spinnerLottie,
  loop: true,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const Spinner: FunctionComponent<SpinnerProps> = (props: SpinnerProps) => {
  const { style, wrapperStyle } = props;
  return (
    <div className="component-spinner" style={wrapperStyle}>
      <Lottie options={option} width={104} height={104} style={style} />
    </div>
  );
};

export default Spinner;
