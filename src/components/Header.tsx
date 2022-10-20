import Image from 'next/future/image';
import { useTheme } from 'next-themes';
import { signIn, signOut, useSession } from 'next-auth/react';
import { SunIcon, MoonIcon, UserIcon } from '@heroicons/react/24/solid';

import logo from '../../public/logo.svg';

const Header = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const { data: session, status } = useSession();

  return (
    <header className="sticky flex h-16 justify-between	rounded-tr-3xl bg-menu dark:bg-menu-dark md:h-screen md:w-24 md:flex-col md:items-center md:justify-between md:rounded-tr-[26px] md:rounded-br-[26px]">
      <div className="relative h-full w-16 md:h-24 md:w-full">
        <Image src={logo} alt="" className="h-full w-full" />
      </div>
      <div className="flex items-center md:w-full md:flex-col md:items-center">
        <button
          type="button"
          className="mx-6 flex h-8 w-8 items-center justify-center md:my-6 "
          onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
        >
          {resolvedTheme === 'light' ? (
            <MoonIcon className="h-7 w-7 text-typography-purple transition-colors hover:text-typography-gray" />
          ) : (
            <SunIcon className="h-7 w-7 text-typography-purple transition-colors hover:text-typography-gray" />
          )}
        </button>
        <div className="h-full w-px bg-border md:h-px md:w-full"></div>
        {status === 'authenticated' ? (
          <button
            className="relative mx-6 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-border md:my-6"
            onClick={() => signOut()}
          >
            {session?.user?.image ? (
              <Image src={session?.user?.image} alt="" fill />
            ) : (
              <UserIcon className="h-6 w-6 text-typography-purple" />
            )}
          </button>
        ) : (
          <button type="button" className="mx-6 md:my-6" onClick={() => signIn()}>
            Sign in
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
