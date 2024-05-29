import { Typography } from 'components';
import { FunctionComponent } from 'react';
import './style.css';
import { radioDefaultSvg, radioSelectedSvg } from 'assets';

interface RadioButtonProps {
  title: string;
  isSelected: boolean | undefined;
  disabled?: boolean;
  onChange?: () => void;
  style?: any;
}

const RadioButton: FunctionComponent<RadioButtonProps> = (
  props: RadioButtonProps,
) => {
  const { title, isSelected, onChange, style } = props;

  return (
    <div
      className="single-radio-button-container"
      onClick={onChange}
      style={style}
    >
      <img
        className="single-radio-button"
        src={isSelected ? radioSelectedSvg : radioDefaultSvg}
      />
      <Typography variant="b1" weight="regular">
        {title}
      </Typography>
    </div>
  );
};

export default RadioButton;
