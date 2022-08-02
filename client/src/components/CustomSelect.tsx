import { FC, FormEvent, useId } from "react";

interface Props {
  name: string;
  list: string[];
  value: string;
  labelText?: string;
  handleSelect(e: FormEvent): void;
  disabled?: boolean;
}

const CustomSelect: FC<Props> = ({
  name,
  list,
  value,
  handleSelect,
  labelText,
  disabled = false,
}) => {
  const id = useId();
  return (
    <div className="flex flex-col items-start space-y-4 mb-8">
      <label htmlFor={name}>{labelText || name}</label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={handleSelect}
        className="text-input"
        disabled={disabled}
      >
        {list.map((opt) => (
          <option key={id + opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};
export default CustomSelect;
