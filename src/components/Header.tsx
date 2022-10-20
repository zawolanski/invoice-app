import Image from 'next/future/image';
import { useTheme } from 'next-themes';
import { signIn, signOut, useSession } from 'next-auth/react';
import { SunIcon, MoonIcon, UserIcon } from '@heroicons/react/24/solid';

import logo from '../../public/logo.svg';

const Header = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const { data: session, status } = useSession();

  return (
    <header className="sticky flex h-16 justify-between	 bg-menu dark:bg-menu-dark">
      <div className="relative h-full w-16">
        <Image src={logo} alt="" />
      </div>
      <div className="flex items-center">
        <button
          type="button"
          className="mx-6 flex h-8 w-8 items-center justify-center transition-transform hover:scale-110"
          onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
        >
          {resolvedTheme === 'light' ? (
            <MoonIcon className="h-7 w-7 text-typography-purple" />
          ) : (
            <SunIcon className="h-7 w-7 text-typography-purple" />
          )}
        </button>
        <div className="h-full w-px bg-border"></div>
        {status === 'authenticated' ? (
          <button
            className="relative mx-6 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-border"
            onClick={() => signOut()}
          >
            {session?.user?.image ? (
              <Image src={session?.user?.image} alt="" fill />
            ) : (
              <UserIcon className="h-6 w-6 text-typography-purple" />
            )}
          </button>
        ) : (
          <button type="button" className="mx-6" onClick={() => signIn()}>
            Sign in
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
