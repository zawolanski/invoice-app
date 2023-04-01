import { useRouter } from 'next/router';

import { InvoiceForm, FormValues } from '../.';
import { trpc } from '../../utils/trpc';
import { addDays } from '../../helpers';
import { useEffect } from 'react';

interface Props {
  handleIsLoading: (val: boolean) => void;
}
export const AddInvoice = ({ handleIsLoading }: Props) => {
  const router = useRouter();
  const query = router.query;

  const { mutate, isLoading } = trpc.useMutation(['invoice.addInvoice']);

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

  useEffect(() => {
    handleIsLoading(isLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const handleClose = () => {
    router.replace('/', undefined, { shallow: true });
  };

  if (query?.form !== 'add') return null;

  return <InvoiceForm title="New Invoice" mode="add" isOpen={true} onClose={handleClose} onSubmit={onSubmit} />;
};
