import Header from './Header';
import HeadLayout from './HeadLayout';

interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  return (
    <>
      <HeadLayout />
      <div className="flex flex-col md:flex-row">
        <Header />
        <main className="flex-grow">{children}</main>
      </div>
    </>
  );
};

export default Layout;
