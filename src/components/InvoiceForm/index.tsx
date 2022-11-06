/* eslint-disable @typescript-eslint/no-empty-function */
import { Dialog } from '@headlessui/react';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import Button from '../Button';
import GoBack from '../GoBack';
import Textfield from '../Textfield';

type FormValues = {
  clientName: string;
  status: string;
  paymentDue: Date;
  invoiceDue: Date;
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
};

interface Props {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  title: React.ReactNode;
  mode: 'add' | 'edit';
}
const InvoiceForm = ({ isOpen, setIsOpen, title, mode }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit = handleSubmit((data) => console.log(data));

  const closeModalOnEsc = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setIsOpen(false);
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

            <div className="flex flex-col gap-4 pb-10 sm:gap-6">
              <Textfield register={register} name="streetName" label="Street address" />
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:flex-row sm:gap-6">
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
            <div className="flex flex-col gap-4 pb-10 sm:gap-6">
              <Textfield register={register} name="clientName" label="Client's name" />
              <Textfield
                register={register}
                name="clientEmail"
                label="Client's email"
                placeholder="e.g. email@example.com"
                type="email"
              />
              <Textfield register={register} name="clientStreetName" label="Street address" />
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:flex-row sm:gap-6">
                <Textfield register={register} name="clientCity" label="City" />
                <Textfield register={register} name="clientPostCode" label="Post code" />
                <Textfield
                  containerClass="col-span-full sm:col-auto"
                  register={register}
                  name="clientCountry"
                  label="Country"
                />
              </div>
              <div></div>
              <Textfield
                register={register}
                name="description"
                label="Project / Description"
                placeholder="e.g. Graphic Design Service"
              />
            </div>

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
