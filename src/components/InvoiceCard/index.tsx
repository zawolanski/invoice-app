import Link from 'next/link';

import { transformDate } from '../../helpers/transformDate';
import StatusBox from '../StatusBox';

interface Props {
  id: string;
  clientName: string;
  status: string;
  amountDue: number;
  paymentDue: Date;
}
const InvoiceCard = ({ id, amountDue, clientName: clientsName, paymentDue, status }: Props) => {
  return (
    <Link href={`/${id}`} legacyBehavior>
      <a className="flex cursor-pointer justify-between rounded-lg border-[1px] border-transparent bg-white p-6 transition-colors hover:border-primary dark:bg-bg-black-active">
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
          <p className="mb-5 font-bold sm:m-0">
            <span className="text-typography-secondary">#</span>
            {id}
          </p>
          <p className="text-typography-gray dark:text-typography-dark-secondary">Due {transformDate(paymentDue)}</p>
          <p className="text-xl font-bold sm:hidden">£ {amountDue.toFixed(2)}</p>
          <p className="mb-5 hidden max-w-[140px] truncate text-typography-gray dark:text-typography-dark-secondary sm:m-0 sm:block">
            {clientsName}
          </p>
        </div>
        <div className="flex flex-col items-end sm:flex-row sm:items-center sm:gap-10">
          <p className="mb-5 max-w-[140px] truncate text-typography-gray dark:text-typography-dark-secondary sm:hidden">
            {clientsName}
          </p>
          <p className="hidden text-xl font-bold sm:block">£ {amountDue.toFixed(2)}</p>
          <StatusBox status={status} />
        </div>
      </a>
    </Link>
  );
};

export default InvoiceCard;
