import { clsx } from 'clsx';

import { ButtonType, ButtonUse } from './types';

const BUTTON_COLOR: { [key in ButtonUse]: string } = {
  primary: 'bg-primary text-white hover:bg-primary-light',
  secondary:
    'bg-secondary text-typography-secondary hover:bg-secondary-light dark:bg-secondary-dark dark:hover:bg-white dark:text-secondary-light',
  danger: 'bg-danger text-white hover:bg-danger-light',
  dark: 'bg-menu text-typography-secondaryDark hover:bg-typography-dark dark:hover:bg-menu-dark dark:text-secondary-light',
  light: 'bg-secondary text-typography-secondary hover:bg-secondary-light',
};
interface Props {
  type?: ButtonType;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  use?: ButtonUse;
}

const Button = ({ type = 'button', children, onClick, className, use = 'primary' }: Props) => {
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

export default Button;
