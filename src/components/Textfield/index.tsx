import { UseFormRegister } from 'react-hook-form';

interface Props {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  placeholder?: string;
  type?: 'text' | 'number' | 'email';
  containerClass?: string;
}
const Textfield = ({ label, name, register, placeholder = '', type = 'text', containerClass = '' }: Props) => {
  return (
    <div className={`w-full ${containerClass}`}>
      <div className={textfieldLabelClass}>
        <label className="capitalize text-typography-secondary dark:text-typography-dark-gray" htmlFor={name}>
          {label}
        </label>
        {/* <span className="text-sm text-danger" role="alert">
          This is required
        </span> */}
      </div>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className={textfieldInputClass}
        {...register(name, { valueAsNumber: type === 'number' })}
      />
    </div>
  );
};

export default Textfield;

export const textfieldInputClass =
  'placeholder-typography/35 h-12 w-full rounded-[4px] border-[1px] border-border-input bg-transparent px-4 font-bold text-typography outline-none transition-colors hover:border-border-input-active focus:border-border-input-active dark:border-border-dark-input dark:bg-bg-dark-black-active dark:text-white dark:placeholder-white/60 dark:hover:border-border-dark-input-active dark:focus:border-border-dark-input-active';

export const textfieldLabelClass = 'capitalize text-typography-secondary dark:text-typography-dark-gray';
