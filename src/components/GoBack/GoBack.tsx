/* eslint-disable @typescript-eslint/no-empty-function */
import Link from 'next/link';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

interface Props {
  href?: string;
  as?: 'a' | 'button';
  onClick?: () => void;
}
export const GoBack = ({ href = '/', as = 'a', onClick = () => {} }: Props) => {
  if (as === 'button')
    return (
      <button onClick={onClick} className="mb-6 flex items-center gap-4 sm:hidden">
        <ChevronLeftIcon className="h-5 stroke-[3] text-primary" />
        <span className="font-bold leading-none">Go back</span>
      </button>
    );

  return (
    <Link href={href} legacyBehavior>
      <a className="group mb-6 flex items-center gap-4">
        <ChevronLeftIcon className="h-5 stroke-[3] text-primary" />
        <span className="font-bold leading-none transition-colors group-hover:text-typography-secondary dark:group-hover:text-typography-dark-gray">
          Go back
        </span>
      </a>
    </Link>
  );
};
