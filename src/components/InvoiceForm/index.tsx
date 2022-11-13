/* eslint-disable @typescript-eslint/no-empty-function */
import { Dialog } from '@headlessui/react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/24/solid';
import { useCallback, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import Button from '../Button';
import GoBack from '../GoBack';
import Select from '../Select';
import Textfield, { textfieldLabelClass } from '../Textfield';

type FormValues = {
  clientName: string;
  status: string;
  paymentDue: Date;
  paymentTerms: {
    id: string;
    name: string;
    value: number;
  };
  description: string;
  streetName: string;
  city: string;
  postCode: string;
  country: string;
  clientStreetName: string;
  clientCity: string;
  clientPostCode: string;
  clientCountry: string;
  clientEmail: string;
  items: {
    id: string;
    itemName: string;
    quantity: number | null;
    price: number | null;
  }[];
};

const options = [
  { id: '1', name: 'Net 1 Day', value: 1 },
  { id: '2', name: 'Net 7 Days', value: 7 },
  { id: '3', name: 'Net 14 Days', value: 14 },
  { id: '4', name: 'Net 30 Days', value: 30 },
];

interface Props {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  title: React.ReactNode;
  mode: 'add' | 'edit';
}
const InvoiceForm = ({ isOpen, setIsOpen, title, mode }: Props) => {
  const { register, handleSubmit, control } = useForm<FormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });
  const onSubmit = handleSubmit((data) => console.log(data));

  const closeModalOnEsc = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setIsOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.addEventListener('keyup', closeModalOnEsc);
    return () => document.removeEventListener('keyup', closeModalOnEsc);
  }, [closeModalOnEsc]);

  return (
    <Dialog open={isOpen} onClose={() => {}} className="relative z-20">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" onClick={() => setIsOpen(false)} />
      <div className="fixed inset-0 top-16 box-border flex flex-col bg-bg p-6 pb-20 dark:bg-bg-dark sm:max-w-[38rem] sm:rounded-tr-[26px] sm:rounded-br-[26px] md:top-0 md:max-w-[42rem] md:pl-28">
        <Dialog.Panel className="flex-grow overflow-y-auto pr-3">
          <GoBack as="button" onClick={() => setIsOpen(false)} />
          <Dialog.Title className="mb-6 text-3xl font-bold">{title}</Dialog.Title>
          <form onSubmit={onSubmit}>
            <p className="mb-6 font-bold text-primary">Bill From</p>

            <div className="mb-10 flex flex-col gap-4 sm:gap-6">
              <Textfield register={register} name="streetName" label="Street address" />
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
                <Textfield register={register} name="city" label="City" />
                <Textfield register={register} name="streetName" label="Post code" />
                <Textfield
                  containerClass="col-span-full sm:col-auto"
                  register={register}
                  name="country"
                  label="Country"
                />
              </div>
            </div>

            <p className="mb-6 font-bold text-primary">Bill To</p>
            <div className="mb-10 flex flex-col gap-4 sm:gap-6">
              <Textfield register={register} name="clientName" label="Client's name" />
              <Textfield
                register={register}
                name="clientEmail"
                label="Client's email"
                placeholder="e.g. email@example.com"
                type="email"
              />
              <Textfield register={register} name="clientStreetName" label="Street address" />
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
                <Textfield register={register} name="clientCity" label="City" />
                <Textfield register={register} name="clientPostCode" label="Post code" />
                <Textfield
                  containerClass="col-span-full sm:col-auto"
                  register={register}
                  name="clientCountry"
                  label="Country"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                Invoice Date
                <Select
                  control={control as any}
                  options={options}
                  name="paymentTerms"
                  defaultValue={options[3]}
                  label="Payment Terms"
                />
              </div>
              <Textfield
                register={register}
                name="description"
                label="Project / Description"
                placeholder="e.g. Graphic Design Service"
              />
            </div>

            {fields.length > 0 ? (
              <p className="mb-6 text-xl font-bold text-typography-gray sm:mb-4">Item List</p>
            ) : null}
            <div className="mb-10">
              <div className="hidden items-center gap-x-4 gap-y-6 sm:mb-3 sm:grid sm:grid-cols-[auto_10%_20%_20%_1.5rem]">
                <p>Item Name</p>
                <p>Qty.</p>
                <p>Price</p>
                <p>Total</p>
                <span></span>
              </div>
              {fields.map((field, i) => (
                <div
                  className="mb-10 grid grid-cols-[repeat(3,_minmax(0,_1fr))_1.5rem] items-center gap-x-4 gap-y-6 sm:mb-3 sm:grid-cols-[auto_10%_20%_20%_1.5rem]"
                  key={field.id}
                >
                  <Textfield
                    containerClass="col-span-full sm:col-auto"
                    register={register}
                    name={`items.${i}.itemName`}
                    label="Item Name"
                    labelClass="sm:sr-only"
                  />
                  <Textfield register={register} name={`items.${i}.quantity`} label="Qty." labelClass="sm:sr-only" />
                  <Textfield register={register} name={`items.${i}.price`} label="Price" labelClass="sm:sr-only" />
                  <div>
                    <p className={`${textfieldLabelClass} sm:sr-only`}>Total</p>
                    <p className="flex h-12 items-center text-typography-secondary dark:text-typography-dark-gray">
                      {field.quantity && field.price ? (field.quantity * field.price).toFixed(2) : '0.00'}
                    </p>
                  </div>
                  <button
                    className="h-fit w-fit"
                    aria-label={`remove item with a name ${field.itemName}`}
                    onClick={() => remove(i)}
                  >
                    <TrashIcon className="w-6 text-bg-icon" />
                  </button>
                </div>
              ))}
            </div>
            <Button
              use="secondary"
              className="mb-6 !w-full items-center justify-center text-center"
              onClick={() => append({ id: '3', itemName: '', price: null, quantity: null })}
            >
              <PlusIcon className="mr-1 w-3 stroke-[4px]" />
              <p className="mt-[2px]">Add New Item</p>
            </Button>

            <div className="fixed bottom-0 left-0 h-20 w-full bg-white shadow-formBar dark:bg-bg-black-active sm:w-full sm:max-w-[38rem] sm:rounded-br-[26px] sm:dark:bg-bg-dark md:max-w-[42rem]">
              <div className="flex h-full items-center justify-end gap-2 p-5">
                {mode === 'add' ? (
                  <>
                    <Button use="secondary" onClick={() => setIsOpen(false)}>
                      Discard
                    </Button>
                    <Button use="dark" onClick={() => console.log('save as draft')}>
                      Save as Draft
                    </Button>
                    <Button onClick={() => console.log('save & send')} type="submit">
                      Save & Send
                    </Button>
                  </>
                ) : (
                  <>
                    <Button use="secondary" onClick={() => setIsOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => console.log('save & send')} type="submit">
                      Save Changes
                    </Button>
                  </>
                )}
              </div>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default InvoiceForm;
