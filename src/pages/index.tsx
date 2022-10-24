import type { NextPage } from 'next';

import { PlusCircleIcon } from '@heroicons/react/24/solid';
import Button from '../components/Button';

const Home: NextPage = () => {
  return (
    <div className="mx-auto max-w-3xl px-6 py-8 sm:px-12 sm:py-14 md:py-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tighter sm:pb-1 sm:text-3xl">Invoices</h1>
          <p className="font-medium text-typography-gray dark:text-typography-dark-secondary">No invoices</p>
        </div>
        <div>
          <Button onClick={() => console.log('add invoice')} className="pl-2">
            <PlusCircleIcon className="mr-3 h-10 w-10" />
            New Invoice
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
