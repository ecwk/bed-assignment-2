import {
  Button,
  Grid,
  GridItem,
  Heading,
  useColorModeValue
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useForm, FormProvider, useWatch } from 'react-hook-form';

import { Options } from './options';
import { SelectDate } from './select-date';
import { Flight, type Airport } from '@common/types';
import { SelectLocation } from './select-location';
import { useQuery } from '@tanstack/react-query';
import { client } from '@config/axios';

export type FlightSearchFormData = {
  from: string; // airportId
  to: string; // airportId
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
  const { to, from } = useWatch<FlightSearchFormData>({
    control: methods.control
  });

  const flightsQuery = useQuery(
    ['flights', { to, from }],
    (ctx) =>
      client.get(`/flights/direct/${from}/${to}?dateFilterType=none`, {
        signal: ctx.signal
      }),
    {
      enabled: !!from && !!to
    }
  );
  const returnFlightsQuery = useQuery(
    ['returnFlights', { to, from }],
    (ctx) =>
      client.get(`/flights/direct/${to}/${from}?dateFilterType=none`, {
        signal: ctx.signal
      }),
    {
      enabled: !!from && !!to
    }
  );
  const flights: Flight[] = flightsQuery.data?.data?.flights;
  const returnFlights: Flight[] = returnFlightsQuery.data?.data?.flights;

  const onSubmit = methods.handleSubmit((formData) => {
    let url = '/search/flights?';
    Object.entries(formData).forEach(([key, value]) => {
      url += `${key}=${value}&`;
    });
    url = url.replace(/&$/, '');
    router.push(url);
  });

  const colorModeButton = useColorModeValue(
    'lightModeButton',
    'darkModeButton'
  );

  return (
    <FormProvider {...methods}>
      <Grid
        as="form"
        gridTemplateAreas={{
          base: `
            "heading heading"
            "input input"
            "options options"
            "button button"
          `,
          lg: `
            "heading heading"
            "input options"
            "button button"
          `
        }}
        columnGap={5}
        onSubmit={onSubmit}
      >
        <GridItem area="heading" mt={5} mb={10}>
          <Heading w="100%">Catch Your Flight</Heading>
        </GridItem>

        <GridItem area="input" display="flex" flexDir="column" gap={6}>
          <SelectLocation
            airports={airports}
            flights={flights}
            returnFlights={returnFlights}
          />
          <SelectDate flights={flights} returnFlights={returnFlights} />
        </GridItem>

        <GridItem area="options">
          <Options
            mt={{
              base: 5,
              lg: 0
            }}
          />
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
