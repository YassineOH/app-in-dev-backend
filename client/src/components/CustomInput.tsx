import { FC, FormEvent } from "react";
interface Props {
  name: string;
  type: string;
  value: string | number;
  labelText?: string;
  handleChange(e: FormEvent): void;
  disabled?: boolean;
}

const CustomInput: FC<Props> = ({
  name,
  value,
  labelText,
  type,
  handleChange,
  disabled = false,
}) => {
  return (
    <div className="flex flex-col items-start space-y-4 mb-8">
      <label htmlFor={name}>{labelText || name}</label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        className="text-input"
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  );
};
export default CustomInput;
