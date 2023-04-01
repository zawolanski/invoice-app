import { useRouter } from 'next/router';

import { InvoiceForm, FormValues } from '../.';
import { trpc } from '../../utils/trpc';
import { addDays } from '../../helpers';

export const AddInvoice = () => {
  const router = useRouter();
  const query = router.query;

  const { mutate } = trpc.useMutation(['invoice.addInvoice']);

  const onSubmit = (data: FormValues, status: 'pending' | 'draft') => {
    mutate({
      ...data,
      invoiceDate: new Date(),
      paymentDue: addDays(new Date(), data.paymentTerms.value),
      amountDue:
        data.items.length > 0
          ? data.items.reduce(
              (prev, curr) => (curr.price && curr.quantity ? prev + curr.price * curr.quantity : prev),
              0
            )
          : 0,
      status,
    });
  };

  const handleClose = () => {
    router.replace('/', undefined, { shallow: true });
  };

  if (query?.form !== 'add') return null;

  return <InvoiceForm title="New Invoice" mode="add" isOpen={true} onClose={handleClose} onSubmit={onSubmit} />;
};
