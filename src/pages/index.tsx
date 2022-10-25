import type { NextPage } from 'next';
import Image from 'next/future/image';
import { PlusCircleIcon } from '@heroicons/react/24/solid';

import Button from '../components/Button';
import Select from '../components/Select';
import nothingThereImg from '../../public/nothing_there.svg';

const options = [
  { id: 'draft', name: 'Draft' },
  { id: 'pending', name: 'Pending' },
  { id: 'paid', name: 'Paid' },
];

const Home: NextPage = () => {
  return (
    <div className="mx-auto max-w-3xl px-6 py-8 sm:px-12 sm:py-14 md:py-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tighter sm:pb-1 sm:text-3xl">Invoices</h1>
          <p className="font-medium text-typography-gray dark:text-typography-dark-secondary">No invoices</p>
        </div>
        <div className="flex items-center gap-4 sm:gap-10">
          <Select options={options} name="status" label="Filter by status" />
          <Button onClick={() => console.log('add invoice')} className="pl-2">
            <PlusCircleIcon className="mr-3 h-10 w-10" />
            New Invoice
          </Button>
        </div>
      </div>
      <div className="m-auto mt-24 w-60 md:mt-40 md:w-64">
        <Image className="mx-auto mb-9" src={nothingThereImg} alt="" />
        <p className="mb-6 text-center text-2xl font-bold tracking-tight">There is nothing here</p>
        <p className="text-center leading-none tracking-tight text-typography-gray dark:text-typography-dark-secondary">
          Create an invoice by clicking the <br />
          <span className="font-bold">New Invoice</span> button and get started
        </p>
      </div>
    </div>
  );
};

export default Home;
