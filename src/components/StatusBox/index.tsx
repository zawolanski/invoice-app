import { useEffect, useState } from 'react';

interface Props {
  status: string;
}
const StatusBox = ({ status }: Props) => {
  const [colorClasses, setColorClasses] = useState({
    card: 'bg-success/20 text-success',
    dot: 'bg-success',
  });

  useEffect(() => {
    if (status === 'pending')
      setColorClasses({
        card: 'bg-warning/20 text-warning',
        dot: 'bg-warning',
      });
    if (status === 'draft')
      setColorClasses({
        card: 'bg-black/20 text-bg-black dark:text-typography-dark-secondary dark:bg-secondary-active/20',
        dot: 'bg-black dark:bg-secondary-active',
      });
  }, [status]);

  return (
    <p
      className={`flex h-10 min-w-[6rem] items-center justify-center gap-3 rounded-lg font-bold capitalize sm:min-w-[7rem] ${colorClasses.card}`}
    >
      <span className={`block h-2 w-2 rounded-full ${colorClasses.dot}`} />
      <span className="leading-none">{status}</span>
    </p>
  );
};

export default StatusBox;
