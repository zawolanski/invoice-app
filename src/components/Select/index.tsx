import { useController, UseControllerProps } from 'react-hook-form';
import { Listbox } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

import { textfieldInputClass, textfieldLabelClass } from '../Textfield';

type SelectOption = { id: string; name: string };

interface Props extends UseControllerProps {
  options: SelectOption[];
  label: string;
}
const Select = ({ name, options, control, defaultValue, rules, shouldUnregister, label }: Props) => {
  const {
    field: { value, onChange },
  } = useController({ name, control, defaultValue, rules, shouldUnregister });

  return (
    <Listbox as="div" value={value} onChange={onChange} className="relative">
      <Listbox.Label className={`clock mb-1 ${textfieldLabelClass}`}>{label}</Listbox.Label>
      <Listbox.Button className={`relative w-full ${textfieldInputClass}`}>
        <div className="text-left leading-none">{value ? (value as SelectOption).name : ''}</div>
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <ChevronDownIcon className="w-4 stroke-[3] text-primary" />
        </div>
      </Listbox.Button>
      <Listbox.Options className="absolute left-0 z-50 my-3 w-full rounded-lg bg-white shadow-select  dark:bg-bg-dark-secondary dark:shadow-dark-select">
        {options.map((option) => (
          <Listbox.Option
            className="group flex cursor-pointer items-center gap-3 border-b-2 py-5 px-7 last:border-b-0 dark:border-bg-dark-black-active "
            key={option.id}
            value={option}
          >
            <span className="font-bold leading-none tracking-tight transition-colors group-hover:text-primary dark:text-typography-dark-secondary dark:group-hover:text-primary-active">
              {option.name}
            </span>
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
};

export default Select;
