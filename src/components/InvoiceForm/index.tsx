/* eslint-disable @typescript-eslint/no-empty-function */
import { Dialog } from '@headlessui/react';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import Button from '../Button';

interface Props {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  title: React.ReactNode;
  mode: 'add' | 'edit';
}
const InvoiceForm = ({ isOpen, setIsOpen, title, mode }: Props) => {
  return (
    <Dialog open={isOpen} onClose={() => {}} className="relative z-20">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 top-16 box-border flex flex-col bg-bg p-6 pb-20 dark:bg-bg-dark sm:max-w-[38rem] sm:rounded-tr-[26px] sm:rounded-br-[26px]">
        <div className="flex-grow overflow-y-auto ">
          <Dialog.Panel>
            <button onClick={() => setIsOpen(false)} className="mb-6 flex items-center gap-4">
              <ChevronLeftIcon className="h-5 stroke-[3] text-primary" />
              <span className="font-bold leading-none">Go back</span>
            </button>
            <Dialog.Title className="text-3xl font-bold">{title}</Dialog.Title>
          </Dialog.Panel>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 h-20 w-full bg-white shadow-formBar dark:bg-bg-black-active sm:w-full sm:max-w-[38rem] sm:rounded-br-[26px]">
        <div className="flex h-full items-center justify-end gap-2 p-5">
          {mode === 'add' ? (
            <>
              <Button use="secondary" onClick={() => console.log('discard')}>
                Discard
              </Button>
              <Button use="dark" onClick={() => console.log('save as draft')}>
                Save as Draft
              </Button>
              <Button onClick={() => console.log('save & send')}>Save & Send</Button>
            </>
          ) : (
            <>
              <Button use="secondary" onClick={() => console.log('discard')}>
                Cancel
              </Button>
              <Button onClick={() => console.log('save & send')}>Save Changes</Button>
            </>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default InvoiceForm;
