import Image from 'next/future/image';
import { useTheme } from 'next-themes';
import { signIn, signOut, useSession } from 'next-auth/react';
import { SunIcon, MoonIcon, UserIcon } from '@heroicons/react/24/solid';

import logo from '../../public/logo.svg';
import Button from './Button';

const Header = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 left-0 flex h-16 justify-between bg-bg-black dark:bg-bg-dark-black-active md:h-screen md:w-24 md:flex-col md:items-center md:justify-between md:rounded-tr-[26px] md:rounded-br-[26px]">
      <div className="relative h-full w-16 md:h-24 md:w-full">
        <Image src={logo} alt="" fill />
      </div>
      <div className="flex items-center md:w-full md:flex-col md:items-center">
        <button
          type="button"
          className="mx-6 flex h-8 w-8 items-center justify-center md:my-6"
          onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
        >
          {resolvedTheme === 'light' ? (
            <MoonIcon className="h-7 w-7 text-bg-icon transition-colors hover:text-bg-icon-active" />
          ) : (
            <SunIcon className="h-7 w-7 text-bg-icon transition-colors hover:text-bg-icon-active" />
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
              <UserIcon className="text-typography-purple h-6 w-6" />
            )}
          </button>
        ) : (
          <div className="m-6">
            <Button
              type="button"
              use="light"
              onClick={() => {
                signIn();
              }}
            >
              Sign in
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
