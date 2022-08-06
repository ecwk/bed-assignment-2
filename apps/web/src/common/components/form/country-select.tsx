import {
  FormControl,
  FormLabel,
  FormLabelProps,
  Select,
  useColorModeValue,
  type FormControlProps
} from '@chakra-ui/react';
import { ChangeEventHandler } from 'react';
import { useFormContext } from 'react-hook-form';

import { COUNTRIES } from '@common/constants';

export type CountrySelectProps = FormControlProps & {
  name?: string;
  label?: string;
  labelProps?: FormLabelProps;
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
  labelProps,
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

  const labelColor = useColorModeValue('gray.700', 'gray.300');

  return (
    <FormControl {...formControlProps}>
      {label && (
        <FormLabel color={labelColor} {...labelProps}>
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
