/* eslint-disable @typescript-eslint/no-empty-function */
import { clsx } from 'clsx';

import { ButtonType, ButtonUse } from './types';

const BUTTON_COLOR: { [key in ButtonUse]: string } = {
  primary: 'bg-primary text-white hover:bg-primary-active',
  secondary:
    'bg-bg-secondary text-typography-secondary hover:bg-bg-secondary-active dark:bg-bg-dark-secondary dark:text-typography-dark-secondary dark:hover:bg-white',
  danger: 'bg-danger text-white hover:bg-danger-active',
  dark: 'bg-bg-black text-typography-secondary hover:bg-bg-black-active dark:bg-bg-dark-black dark:text-typography-dark-secondary dark:hover:bg-bg-dark-black-active',
  light: 'bg-bg-secondary text-typography-secondary hover:bg-bg-secondary-active',
};
interface Props {
  type?: ButtonType;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  use?: ButtonUse;
}

export const Button = ({ type = 'button', children, onClick = () => {}, className, use = 'primary' }: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        'flex max-h-12 w-fit items-center whitespace-nowrap rounded-3xl p-4 text-sm font-bold tracking-tight transition-colors',
        BUTTON_COLOR[use],
        className
      )}
    >
      {children}
    </button>
  );
};
