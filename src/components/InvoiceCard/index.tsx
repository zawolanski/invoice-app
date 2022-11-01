import { useEffect, useState } from 'react';
import { transformDate } from '../../helpers/transformDate';

interface Props {
  id: string;
  clientName: string;
  status: string;
  amountDue: number;
  paymentDue: Date;
}
const InvoiceCard = ({ id, amountDue, clientName: clientsName, paymentDue, status }: Props) => {
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
    <div className="flex justify-between rounded-lg bg-white p-6 dark:bg-bg-black-active">
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
        <p className="mb-5 font-bold sm:m-0">
          <span className="text-typography-secondary">#</span>
          {id}
        </p>
        <p className="text-typography-gray dark:text-typography-dark-secondary">Due {transformDate(paymentDue)}</p>
        <p className="text-xl font-bold sm:hidden">£ {amountDue}</p>
        <p className="mb-5 hidden max-w-[140px] truncate text-typography-gray dark:text-typography-dark-secondary sm:m-0 sm:block">
          {clientsName}
        </p>
      </div>
      <div className="flex flex-col items-end sm:flex-row sm:items-center sm:gap-10">
        <p className="mb-5 max-w-[140px] truncate text-typography-gray dark:text-typography-dark-secondary sm:hidden">
          {clientsName}
        </p>
        <p className="hidden text-xl font-bold sm:block">£ {amountDue}</p>
        <p
          className={`flex h-10 w-28 items-center justify-center gap-3 rounded-lg font-bold capitalize ${colorClasses.card}`}
        >
          <span className={`block h-2 w-2 rounded-full ${colorClasses.dot}`} />
          <span className="leading-none">{status}</span>
        </p>
      </div>
    </div>
  );
};

export default InvoiceCard;
