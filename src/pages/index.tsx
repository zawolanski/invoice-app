import { useEffect, useState } from 'react';
import type { GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/future/image';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { Invoice } from '@prisma/client';

import { Button, StatusFilter, InvoiceCard, LoadingSpinner, AddInvoice } from '../components';
import nothingThereImg from '../../public/nothing_there.svg';
import { trpc } from '../utils/trpc';
import { requireAuth } from '../helpers';

const options = [
  { id: 'draft', name: 'Draft' },
  { id: 'pending', name: 'Pending' },
  { id: 'paid', name: 'Paid' },
];

const Home: NextPage = () => {
  const { data, refetch, status, isFetchedAfterMount, isRefetching } = trpc.useQuery(['invoice.fetchUserInvoices']);
  const router = useRouter();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleIsLoading = async (val: boolean) => {
    setIsLoading(val);
    await refetch();
  };

  useEffect(() => {
    setIsLoading(status === 'loading');
  }, [status]);

  useEffect(() => {
    if (data) setInvoices(data);
  }, [data]);

  const handleOpen = () => {
    router.replace('/?form=add', undefined, { shallow: true });
  };

  return (
    <>
      <div className="mx-auto max-w-3xl px-6 py-8 sm:px-12 sm:py-14 md:py-20">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tighter sm:pb-1 sm:text-3xl">Invoices</h1>
            <p className="font-medium text-typography-gray dark:text-typography-dark-secondary">
              {invoices.length > 0 ? `There are ${invoices.length} total invoices` : 'No invoices'}
            </p>
          </div>
          <div className="flex items-center gap-3 sm:gap-10">
            <StatusFilter
              options={options}
              name="status"
              label={
                <>
                  Filter
                  <span className="hidden sm:inline">&nbsp;by status</span>
                </>
              }
            />
            <Button onClick={handleOpen} className="pl-2">
              <PlusCircleIcon className="mr-2 h-10 w-10 sm:mr-3" />
              New<span className="hidden sm:inline">&nbsp;Invoice</span>
            </Button>
          </div>
        </div>
        {!isLoading && isFetchedAfterMount && !isRefetching ? (
          invoices.length > 0 ? (
            <div className="flex flex-col gap-4">
              {invoices.map(({ id, ...invoice }) => (
                <InvoiceCard key={id} id={id} {...invoice} />
              ))}
            </div>
          ) : (
            <div className="m-auto mt-24 w-60 md:mt-40 md:w-64">
              <Image className="mx-auto mb-9" src={nothingThereImg} alt="" />
              <p className="mb-6 text-center text-2xl font-bold tracking-tight">There is nothing here</p>
              <p className="text-center leading-none tracking-tight text-typography-gray dark:text-typography-dark-secondary">
                Create an invoice by clicking the <br />
                <span className="font-bold">New Invoice</span> button and get started
              </p>
            </div>
          )
        ) : (
          <div className="m-auto mt-12 flex w-60 justify-center md:mt-20 md:w-32">
            <LoadingSpinner />
          </div>
        )}
      </div>
      <AddInvoice handleIsLoading={handleIsLoading} />
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return requireAuth(context, (session) => ({
    props: { session },
  }));
}

export default Home;
