"use client";

import {
  Select as SelectBase,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectInput = {
  options: string[];
  placeholder: string;
};
type props = {
  meta: SelectInput;
  onChange?: (value: string, index: number) => void;
};
const Select = ({ meta, onChange }: props) => {
  const { options, placeholder = "Select an option" } = meta;
  return (
    <div>
      <SelectBase
        onValueChange={(value: string) => {
          const index = options.indexOf(value); // Get the index of the selected value
          onChange?.(value, index);
        }}
      >
        <SelectTrigger className="inline-flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="z-50 relative left-0 mt-1 w-full rounded-md border border-gray-300 bg-white shadow-lg">
          <SelectGroup className="p-1">
            {options.map((option, index) => (
              <SelectItem
                key={index}
                value={option}
                className="relative flex cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm hover:bg-starlight-yellow focus:outline-none"
                data-state="inactive"
              >
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </SelectBase>
    </div>
  );
};

export default Select;
