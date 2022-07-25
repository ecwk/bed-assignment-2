import {
  Button,
  Grid,
  GridItem,
  Heading,
  useColorModeValue
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useForm, FormProvider } from 'react-hook-form';

import { SelectDate } from './select-date';
import { type Airport } from '@common/types';
import { SelectLocation } from './select-location';
import { Options } from './options';

export type FlightSearchFormData = {
  from: string; // airportId
  to: string;  // airportId
  departureDate: Date;
  returnDate?: Date | null;
  isTwoWay: boolean;
  isDirect: boolean;
};

type FlightSearchFormProps = {
  airports: Airport[];
};

export const FlightSearchForm = ({ airports }: FlightSearchFormProps) => {
  const router = useRouter();
  const methods = useForm<FlightSearchFormData>();

  const colorModeButton = useColorModeValue(
    'lightModeButton',
    'darkModeButton'
  );

  const onSubmit = methods.handleSubmit(
    ({ from, to, departureDate, returnDate, isTwoWay, isDirect }) => {
      let url = '/search/flights?';
      url += `from=${from}&`;
      url += `to=${to}&`;
      url += `departureDate=${departureDate.toISOString()}&`;
      url += `returnDate=${returnDate}&`;
      url += `isTwoWay=${isTwoWay}&`;
      url += `isDirect=${isDirect}&`;
      url = url.replace(/&$/, '');
      router.push(url);
    }
  );

  return (
    <FormProvider {...methods}>
      <Grid
        as="form"
        gridTemplateAreas={`
            "heading heading"
            "input options"
            "button button"
          `}
        columnGap={5}
        onSubmit={onSubmit}
      >
        <GridItem area="heading" mt={5} mb={10}>
          <Heading w="100%">Find Your Flight</Heading>
        </GridItem>
        <GridItem area="input" display="flex" flexDir="column" gap={6}>
          <SelectLocation airports={airports} />
          <SelectDate />
        </GridItem>
        <GridItem area="options">
          <Options />
        </GridItem>
        <GridItem area="button">
          <Button
            type="submit"
            isLoading={methods.formState.isSubmitted}
            layerStyle={colorModeButton}
            sx={sx.button}
          >
            Search
          </Button>
        </GridItem>
      </Grid>
    </FormProvider>
  );
};

const sx = {
  button: {
    mt: 16,
    w: '100%'
  }
};
