import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { Button, Grid, GridItem, type GridProps } from '@chakra-ui/react';

import { Options } from './options';
import { client } from '@config/axios';
import { SelectDate } from './select-date';
import { SelectLocation } from './select-location';
import { Flight, type Airport } from '@common/types';
import { flightSearchSchema } from '@modules/flights';

export type FlightSearchFormData = {
  from: string; // airportId
  to: string; // airportId
  departureDate: Date;
  returnDate?: Date | null;
  isTwoWay: boolean;
  isDirect: boolean;
};

type FlightSearchFormProps = GridProps & {
  airports: Airport[];
};

export const FlightSearchForm = ({
  airports,
  ...gridProps
}: FlightSearchFormProps) => {
  const router = useRouter();
  const methods = useForm<FlightSearchFormData>({
    resolver: yupResolver(flightSearchSchema)
  });
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
      if (value) {
        url += `${key}=${value}&`;
      }
    });
    url = url.replace(/&$/, '');
    router.push(url);
  });

  return (
    <FormProvider {...methods}>
      <Grid
        as="form"
        gridTemplateAreas={{
          base: `
            "input input"
            "options options"
            "button button"
          `,
          lg: `
            "input options"
            "button button"
          `
        }}
        columnGap={10}
        onSubmit={onSubmit}
        {...gridProps}
      >
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
            isLoading={methods.formState.isSubmitSuccessful}
            colorScheme="brandGold"
            mt={10}
            size="md"
            w="100px"
          >
            Search
          </Button>
        </GridItem>
      </Grid>
    </FormProvider>
  );
};
