import './style.css';
import { downArrowSvg, skuberWhiteIconSvg, skuberWhiteLogoSvg } from 'assets';
import { FunctionComponent } from 'react';
import { Typography } from '..';

interface Props {
  tapped?: () => void;
}

const Header: FunctionComponent<Props> = (props: Props) => {
  const { tapped } = props;

  const userTapped = () => tapped && tapped();

  return (
    <div className="header-container">
      <div className="header-left-container">
        <img src={skuberWhiteIconSvg} />
        <img src={skuberWhiteLogoSvg} />
      </div>
      <div className="header-right-container">
        <Typography variant="s1">{'test'}</Typography>
        <div className="header-user-wrapper" onClick={userTapped}>
          <img src={downArrowSvg} />
        </div>
      </div>
    </div>
  );
};

export default Header;
