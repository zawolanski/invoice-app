import { clsx } from 'clsx';

import { ButtonType } from './types';

interface Props {
  type?: ButtonType;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}
const Button = ({ type = 'button', children, onClick, className }: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        'flex max-h-12 w-fit items-center whitespace-nowrap rounded-3xl p-4 text-sm font-bold tracking-tight',
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
