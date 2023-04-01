import { useRouter } from 'next/router';

import { InvoiceForm, FormValues } from '../.';
import { trpc } from '../../utils/trpc';
import { addDays } from '../../helpers';

export const EditInvoice = () => {
  const router = useRouter();
  const { query } = router;
  const invoiceId = (typeof query?.invoice === 'object' ? query?.invoice[0] : query?.invoice) ?? '';

  const { mutate } = trpc.useMutation(['invoice.editInvoice']);

  const onSubmit = (data: FormValues, status: 'pending' | 'draft') => {
    if (invoiceId) {
      mutate({
        ...data,
        invoiceDate: new Date(),
        paymentDue: addDays(new Date(), data.paymentTerms.value),
        invoiceId,
        amountDue:
          data.items.length > 0
            ? data.items.reduce(
                (prev, curr) => (curr.price && curr.quantity ? prev + curr.price * curr.quantity : prev),
                0
              )
            : 0,
        status,
      });
    }
  };

  const handleClose = () => {
    router.replace('/', undefined, { shallow: true });
  };

  if (query?.form !== 'edit') return null;

  return <InvoiceForm title="Edit" mode="edit" isOpen={true} onClose={handleClose} onSubmit={onSubmit} />;
};
