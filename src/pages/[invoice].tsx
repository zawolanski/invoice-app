import Button from '../components/Button';
import StatusBox from '../components/StatusBox';
import { invoices } from '../data/invoices';
import { transformDate } from '../helpers/transformDate';
import GoBack from '../components/GoBack';

const Invoice = () => {
  const invoice = invoices[0];

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
          <Button use="danger" onClick={() => console.log('delete')}>
            Delete
          </Button>
          <Button onClick={() => console.log('make as paid')}>Mark as Paid</Button>
        </div>
      </div>
      <div className="flex flex-col rounded-lg bg-white p-6 dark:bg-bg-dark-black-active">
        <div className="mb-7 justify-between sm:mb-5 sm:flex">
          <div>
            <p className="font-bold sm:mb-1 sm:text-xl">
              <span className="text-typography-secondary">#</span>
              <span className="text-typography dark:text-white">{invoice.id}</span>
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
                  {transformDate(invoice.invoiceDate!)}
                </p>
              </div>
              <div>
                <p>Payment Due</p>
                <p className="whitespace-nowrap text-lg font-bold text-typography dark:text-white">
                  {transformDate(invoice.paymentDue!)}
                </p>
              </div>
            </div>
            <div>
              <p>Bill To</p>
              <p className="mb-2 max-w-[9rem] truncate text-lg font-bold text-typography dark:text-white">
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
          <ul className="p-6">
            {invoice.items?.map((item) => (
              <li key={item.id} className="mb-6 last:mb-0">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-bold text-typography dark:text-white">{item.itemName}</span>
                    <span className="font-bold text-typography-secondary dark:text-typography-gray">
                      {item.quantity} x £ {item.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="font-bold text-typography dark:text-white">
                    £ {(item.quantity * item.price).toFixed(2)}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between bg-bg-black p-6 dark:bg-bg-black-active">
            <p className="text-white">Amount Due</p>
            <p className="text-2xl font-bold text-white">£ {invoice.amountDue.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
