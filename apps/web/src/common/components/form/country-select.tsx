import {
  FormControl,
  FormLabel,
  Select,
  type FormControlProps
} from '@chakra-ui/react';
import { ChangeEventHandler } from 'react';
import { useFormContext } from 'react-hook-form';

import { COUNTRIES } from '@common/constants';

export type CountrySelectProps = FormControlProps & {
  name?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  useMobileCode?: boolean;
  defaultValue?: string;
  useCode?: boolean;
  value?: string;
  setValue?: (value: string) => void;
};

export function CountrySelect({
  name,
  label,
  type,
  placeholder,
  defaultValue = COUNTRIES.find((country) => country.code === 'SG')?.mobileCode,
  useMobileCode = false,
  useCode = false,
  value,
  setValue,
  ...formControlProps
}: CountrySelectProps) {
  const { register } = useFormContext();

  const onChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    if (setValue) {
      setValue(e.target.value);
    }
  };

  return (
    <FormControl {...formControlProps}>
      {label && (
        <FormLabel color="whiteAlpha.600" mb={0} fontWeight="normal">
          {label}
        </FormLabel>
      )}
      <Select {...(name && register(name))} value={value} onChange={onChange}>
        {COUNTRIES.map(({ name, code, mobileCode }) => (
          <option
            key={name}
            value={useCode ? code : useMobileCode ? mobileCode : code}
          >
            {name} ({useMobileCode ? mobileCode : code})
          </option>
        ))}
      </Select>
    </FormControl>
  );
}
