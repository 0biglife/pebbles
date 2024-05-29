import './style.css';
import { billingSvg, grayDotSvg, pieChartSvg } from 'assets';
import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography } from 'components';

interface Props {}

interface CellProps {
  title: string;
  icon: any;
  style?: any;
  url: string;
}

const Navigation: FunctionComponent<Props> = (props: Props) => {
  const { t } = useTranslation();

  const titles = [
    {
      title: t('component_navigation.plan_and_usage'),
      icon: pieChartSvg,
      url: 'plan',
    },
    {
      title: t('component_navigation.billing'),
      icon: billingSvg,
      url: 'billing',
    },
  ];

  return (
    <div className="navigation-container">
      {titles.map((set, index) => (
        <NavigationCell
          key={index}
          title={set.title}
          icon={set.icon}
          url={set.url}
        />
      ))}
      <NavigationCell
        title={t('component_navigation.help')}
        icon={grayDotSvg}
        style={{
          position: 'fixed',
          bottom: '0',
          width: '208px',
          backgroundColor: 'rgba(23, 28, 38, 1)',
          borderTop: '1px solid rgba(238, 238, 238, 0.1)',
          borderBottom: '0px solid rgba(238, 238, 238, 0)',
        }}
        url={'help'}
      />
    </div>
  );
};

const NavigationCell: FunctionComponent<CellProps> = (props: CellProps) => {
  const { title, icon, url, style } = props;
  const navigate = useNavigate();
  const location = useLocation();

  const goToDetail = (url: string) => navigate(`/${url}`);

  return (
    <div
      className="navigation-cell-container"
      style={{
        ...style,
        backgroundColor:
          location.pathname.split('/')[1] === url ? 'rgb(31,43,73)' : '',
      }}
      onClick={() => goToDetail(url)}
    >
      <img src={icon} />
      <Typography variant="b1" weight="regular">
        {title}
      </Typography>
    </div>
  );
};

export default Navigation;
