import { useEffect, useState } from 'react';
import { Invoice, InvoiceItem } from '@prisma/client';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';

import { LoadingSpinner, Button, StatusBox, GoBack } from '../components';
import { requireAuth, transformDate } from '../helpers';
import { trpc } from '../utils/trpc';

const Invoice = () => {
  const router = useRouter();
  const { query, push } = router;
  const invoiceId = (typeof query?.invoice === 'object' ? query?.invoice[0] : query?.invoice) ?? '';
  const { data, isLoading } = trpc.useQuery(['invoice.fetchInvoice', invoiceId]);
  const { mutate: mutateDelete, isLoading: isLoadingDelete, isSuccess } = trpc.useMutation('invoice.delete');
  const {
    mutate: mutateMarkAsPaid,
    data: dataMarkAsPaid,
    isLoading: isLoadingMarkAsPaid,
  } = trpc.useMutation('invoice.markAsPaid');
  const [invoice, setInvoice] = useState<(Invoice & { items: InvoiceItem[] }) | undefined>(undefined);

  useEffect(() => {
    if (isSuccess) push('/');
    if (data) setInvoice(data);
    if (dataMarkAsPaid) setInvoice(dataMarkAsPaid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, dataMarkAsPaid, isSuccess]);

  if (isLoading || isLoadingDelete || isLoadingMarkAsPaid) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center md:h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!invoice) return null;

  return (
    <div className="mx-auto max-w-3xl py-8 px-6 pb-24 text-typography-gray dark:text-typography-dark-secondary sm:py-12 sm:px-10">
      <GoBack />
      <div className="mb-4 flex items-center justify-between rounded-lg bg-white p-6 dark:bg-bg-dark-black-active">
        <span className="sm:mr-4">Status</span>
        <StatusBox status={invoice.status} />
        <div className="fixed bottom-0 left-0 flex w-full justify-end gap-2 bg-white p-5 dark:bg-bg-dark-black-active sm:static sm:p-0">
          <Button use="secondary" onClick={() => console.log('edit')}>
            Edit
          </Button>
          <Button use="danger" onClick={() => mutateDelete(invoiceId)}>
            Delete
          </Button>
          <Button onClick={() => mutateMarkAsPaid(invoiceId)}>Mark as Paid</Button>
        </div>
      </div>
      <div className="flex flex-col rounded-lg bg-white p-6 dark:bg-bg-dark-black-active">
        <div className="mb-7 justify-between sm:mb-5 sm:flex">
          <div>
            <p className="font-bold sm:mb-1 sm:text-xl">
              <span className="text-typography-secondary">#</span>
              <span className="uppercase text-typography dark:text-white">{invoice.id}</span>
            </p>
            <p className="mb-7 max-w-xs truncate">{invoice.description}</p>
          </div>
          <div className="sm:text-right">
            {invoice.streetName}
            <br />
            {invoice.city}
            <br />
            {invoice.postCode}
            <br />
            {invoice.country}
          </div>
        </div>
        <div className="mb-10 sm:flex sm:gap-[7rem]">
          <div className="flex gap-12 sm:gap-[7rem]">
            <div>
              <div>
                <p>Invoice Date</p>
                <p className="mb-6 whitespace-nowrap text-lg font-bold text-typography dark:text-white">
                  {transformDate(invoice.invoiceDate)}
                </p>
              </div>
              <div>
                <p>Payment Due</p>
                <p className="whitespace-nowrap text-lg font-bold text-typography dark:text-white">
                  {transformDate(invoice.paymentDue)}
                </p>
              </div>
            </div>
            <div>
              <p>Bill To</p>
              <p className="mb-2 max-w-[9rem] truncate text-lg font-bold capitalize text-typography dark:text-white">
                {invoice.clientName}
              </p>
              <div>
                {invoice.clientStreetName}
                <br />
                {invoice.clientCity}
                <br />
                {invoice.clientPostCode}
                <br />
                {invoice.clientCountry}
              </div>
            </div>
          </div>
          <div>
            <p>Sent to</p>
            <p className="max-w-[10rem] truncate text-lg font-bold text-typography dark:text-white">
              {invoice.clientEmail}
            </p>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg bg-bg-secondary dark:bg-bg-dark-secondary">
          {invoice.items.length > 0 ? (
            <ul className="p-6">
              {invoice.items?.map(
                ({ id, itemName, price, quantity }) =>
                  price &&
                  quantity && (
                    <li key={id} className="mb-6 last:mb-0">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="font-bold text-typography dark:text-white">{itemName}</span>
                          <span className="font-bold text-typography-secondary dark:text-typography-gray">
                            {quantity} x £ {price.toFixed(2)}
                          </span>
                        </div>
                        <div className="font-bold text-typography dark:text-white">
                          £ {(quantity * price).toFixed(2)}
                        </div>
                      </div>
                    </li>
                  )
              )}
            </ul>
          ) : null}
          <div className="flex items-center justify-between bg-bg-black p-6 dark:bg-bg-black-active">
            <p className="text-white">Amount Due</p>
            <p className="text-2xl font-bold text-white">£ {invoice.amountDue.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return requireAuth(context, (session) => {
    return { props: { session } };
  });
}

export default Invoice;
