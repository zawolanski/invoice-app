import { Header, HeadLayout } from '../.';

interface Props {
  children: React.ReactNode;
}
export const Layout = ({ children }: Props) => {
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
