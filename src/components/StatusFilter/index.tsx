import { Listbox } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

type StatusFilterOption = { id: string; name: string };

interface Props {
  options: StatusFilterOption[];
  label: React.ReactNode;
  name: string;
}
const StatusFilter = ({ label, name, options }: Props) => {
  const [selectedItem, setSelectedItem] = useState([] as StatusFilterOption[]);

  return (
    <Listbox as="div" value={selectedItem} onChange={setSelectedItem} name={name} multiple className="relative">
      <Listbox.Button className="flex items-center gap-3 whitespace-nowrap">
        <span className="font-bold ">{label}</span>
        <ChevronDownIcon className="w-5 stroke-[3] text-primary" />
      </Listbox.Button>
      <Listbox.Options className="absolute top-8 left-1/2 z-50 w-44 -translate-x-2/4 rounded-lg bg-white p-6 shadow-select  dark:bg-bg-dark-secondary dark:shadow-dark-select">
        {options.map((option) => (
          <Listbox.Option
            className="group mb-2.5 flex cursor-pointer items-center gap-3 last:mb-0"
            key={option.id}
            value={option}
          >
            <div className="h-4 w-4 rounded-sm border-[1px] border-transparent transition-colors group-hover:border-primary ui-selected:!bg-primary ui-not-selected:bg-bg-secondary-active dark:bg-bg-dark">
              <CheckIcon className="hidden stroke-[4] text-white ui-selected:block" />
            </div>
            <span className="pt-1 font-bold leading-none tracking-tight">{option.name}</span>
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
};

export default StatusFilter;
