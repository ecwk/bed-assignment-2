import {
  FormProvider as FormProviderReact,
  UseFormReturn
} from 'react-hook-form';

import { AxiosInterceptorProvider } from '@common/hooks';

type FormProps = {
  methods: UseFormReturn<any>;
  enableToast?: boolean;
  children?: React.ReactNode;
};

export function FormProvider({ methods, enableToast, children }: FormProps) {
  return (
    <FormProviderReact {...methods}>
      <AxiosInterceptorProvider enableToast={enableToast}>
        {children}
      </AxiosInterceptorProvider>
    </FormProviderReact>
  );
}
