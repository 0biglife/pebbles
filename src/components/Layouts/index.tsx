import Header from 'components/Header';
import Navigation from 'components/Navigation';

export const DefaultLayout = (props: { children: React.ReactNode }) => {
  const { children } = props;
  return (
    <>
      <Header></Header>
      <Navigation></Navigation>
      {children}
    </>
  );
};
