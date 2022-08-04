import {
  Flex,
  InputGroup,
  InputLeftElement,
  Input,
  Grid,
  Wrap,
  FormControl,
  FormLabel,
  IconButton,
  Text,
  HStack,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  useColorModeValue,
  Button,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  MenuGroup,
  MenuOptionGroup,
  MenuItemOption,
  Box,
  InputLeftAddon,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Select as ChakraSelect,
  Divider,
  Skeleton,
  useDisclosure,
  Collapse,
  Checkbox,
  VStack
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { GetServerSideProps, type NextPage } from 'next';
import { ChevronDownIcon, ChevronUpIcon, SearchIcon } from '@chakra-ui/icons';
import { TbLayoutGrid, TbLayoutList } from 'react-icons/tb';
import { capitalize, startCase, truncate } from 'lodash';
import { Pagination } from '@mantine/core';

import {
  Main,
  Title,
  Form,
  Select,
  SelectOption,
  Link
} from '@common/components';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Flight } from '@common/types';
import { server } from '@config/axios';
import { useForm, useWatch } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useDebouncedValue } from '@mantine/hooks';

const itemsPerPageOptions: SelectOption[] = [
  {
    label: '5',
    value: 5
  },
  {
    label: '10',
    value: 10
  },
  {
    label: '15',
    value: 15
  },
  {
    label: '20',
    value: 20
  }
];

type Field = {
  name: string;
  width?: string;
};

const fields: Field[] = [
  {
    name: 'id',
    width: '75px'
  },
  {
    name: 'code',
    width: '100px'
  },
  {
    name: 'origin',
    width: '1fr'
  },
  {
    name: 'destination',
    width: '1fr'
  },
  {
    name: 'price',
    width: '100px'
  }
];

type FilterOptions = {
  itemsPerPage: number;
  id: boolean;
  code: boolean;
  origin: boolean;
  destination: boolean;
  price: boolean;
};

// const LIMIT_DEFAULT = 10;

const PAGE_DEFAULT = 1;
const DEFAULT_VALUES: FilterOptions = {
  itemsPerPage: 5,
  id: true,
  code: true,
  origin: true,
  destination: true,
  price: true
};

type AdminManageFlightsProps = ServerSideProps;

const AdminManageFlights: NextPage<AdminManageFlightsProps> = ({ count }) => {
  const router = useRouter();
  const [page, setPage] = useState<number>(() => {
    const page = router.query.page;
    if (typeof page === 'string') {
      return parseInt(page, 10);
    }
    return PAGE_DEFAULT;
  });

  const methods = useForm<FilterOptions>({
    defaultValues: DEFAULT_VALUES
  });
  const watch = useWatch<FilterOptions>({
    control: methods.control
  });
  const [debouncedWatch] = useDebouncedValue(watch, 500);
  const { itemsPerPage } = watch;

  const numberOfPages = useMemo(() => {
    return Math.ceil(count / (itemsPerPage || DEFAULT_VALUES.itemsPerPage));
  }, [count, itemsPerPage]);
  const flightsQuery = useQuery(['flights', { itemsPerPage, page }], (ctx) => {
    return server.get(`/flights/?page=${page}&limit=${itemsPerPage}`, {
      signal: ctx.signal
    });
  });

  const filteredFields = useMemo(() => {
    return fields.filter((field) => {
      if (watch?.[field.name as keyof FilterOptions]) {
        return true;
      }
    });
  }, [watch]);

  const flights: Flight[] = flightsQuery.data?.data?.flights;
  const backgroundColor = useColorModeValue('brandGray.50', 'brandGray.800');
  const labelColor = useColorModeValue('gray.700', 'gray.300');

  return (
    <Main maxW="1200px" w="100%" mx="auto">
      <Title
        mt={10}
        title="Manage Flights"
        subtitle="Using our built-in administrative functions"
      />
      <Form mt={5} methods={methods}>
        <Flex alignItems="flex-end" gap={4}>
          <FormControl>
            <FormLabel color={labelColor}>Refine Your Search</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <SearchIcon />
              </InputLeftElement>
              <Input placeholder="Search" />
            </InputGroup>
          </FormControl>

          <FormControl flexBasis="175px">
            <FormLabel color={labelColor}>Items Per Page</FormLabel>
            <Select
              name="itemsPerPage"
              defaultValue="10"
              data={itemsPerPageOptions}
            />
          </FormControl>
        </Flex>

        <Flex justifyContent="flex-end" alignItems="center" mt={4} gap={2}>
          <Text color="gray.200" fontSize="sm" mb={1}>
            Sort By:{' '}
          </Text>
          <ChakraSelect
            w="150px"
            size="sm"
            borderRadius="3xl"
            defaultValue="latest"
          >
            <option value="latest">Latest</option>
            <option value="highest-price">Highest Price</option>
            <option value="lowest-price">Lowest Price</option>
          </ChakraSelect>

          <Spacer />

          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  disabled
                  as={Button}
                  rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                >
                  Actions
                </MenuButton>
                <MenuList>
                  <MenuGroup></MenuGroup>
                  <MenuItem>Modify</MenuItem>
                  <MenuItem>Download as CSV</MenuItem>
                  <MenuDivider />
                  <MenuItem>Delete</MenuItem>
                </MenuList>
              </>
            )}
          </Menu>

          <Menu closeOnSelect={false}>
            {({ isOpen }) => (
              <>
                <MenuButton
                  as={Button}
                  rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                >
                  View
                </MenuButton>
                <MenuList px={4} backgroundColor={backgroundColor}>
                  <VStack alignItems="flex-start">
                    {fields.map(({ name }, i) => (
                      // @ts-ignore
                      <Checkbox {...methods.register(name)} key={`field-${i}`}>
                        {capitalize(name)}
                      </Checkbox>
                    ))}
                  </VStack>
                </MenuList>
              </>
            )}
          </Menu>

          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  as={Button}
                  rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                >
                  Filters
                </MenuButton>
                <MenuList w="350px" backgroundColor="brandGray.700">
                  <Accordion allowMultiple allowToggle>
                    <AccordionItem>
                      <AccordionButton justifyContent="space-between">
                        Price
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel>
                        <Flex gap={5}>
                          <FormControl>
                            <FormLabel>Minimum</FormLabel>
                            <InputGroup size="sm">
                              <InputLeftAddon borderRadius="md">
                                S$
                              </InputLeftAddon>
                              <Input borderRadius="md" placeholder="Minimum" />
                            </InputGroup>
                          </FormControl>
                          <FormControl>
                            <FormLabel>Maximum</FormLabel>
                            <InputGroup size="sm">
                              <InputLeftAddon borderRadius="md">
                                S$
                              </InputLeftAddon>
                              <Input borderRadius="md" placeholder="Maximum" />
                            </InputGroup>
                          </FormControl>
                        </Flex>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </MenuList>
              </>
            )}
          </Menu>
          <Button colorScheme="brandGold">Add Flight</Button>
        </Flex>
      </Form>

      <FlightList
        flights={flights}
        filterOptions={watch}
        fields={filteredFields}
      />
      <Divider my={10} />
      <Flex justifyContent="center" alignItems="center">
        <Pagination
          spacing={10}
          total={numberOfPages}
          page={page}
          onChange={(page) => setPage(page)}
          siblings={2}
          boundaries={2}
        />
        <GoToPageInput numberOfPages={numberOfPages} setPage={setPage} />
      </Flex>
    </Main>
  );
};

const FlightList = ({
  fields,
  flights,
  filterOptions
}: {
  fields: Field[];
  flights: Flight[];
  filterOptions: Partial<FilterOptions>;
}) => {
  const backgroundColor = useColorModeValue('brandGray.50', 'brandGray.800');
  const borderColor = useColorModeValue('brandGray.200', 'brandGray.700');

  return (
    <Box>
      <Grid
        mt={10}
        p={4}
        border="1px solid"
        borderColor={borderColor}
        borderTopRadius="lg"
        backgroundColor="brandGray.900"
        gridTemplateColumns={fields
          .filter(({ width }) => width)
          .map(({ width }) => width)
          .join(' ')}
        gridColumnGap={4}
      >
        {fields.map(({ name }) => (
          <Text
            key={`field-${name}`}
            fontWeight="semibold"
            color="brandGray.50"
          >
            {startCase(name)}
          </Text>
        ))}
      </Grid>
      <Grid
        p={4}
        border="1px solid"
        borderTop="none"
        borderColor={borderColor}
        backgroundColor={backgroundColor}
        borderBottomRadius="lg"
        gridTemplateColumns={fields
          .filter(({ width }) => width)
          .map(({ width }) => width)
          .join(' ')}
        gridRowGap={4}
        gridColumnGap={4}
      >
        {flights
          ? flights.map((flight, i) => (
              <FlightListItem
                key={`flightId-${flight.flightId}`}
                flight={flight}
                filterOptions={filterOptions}
              />
            ))
          : [...Array(5).keys()].map((_, i) => (
              <Skeleton gridColumn="1 / -1" key={`skeleton-${i}`} h="41px" />
            ))}
      </Grid>
    </Box>
  );
};

const FlightListItem = ({
  flight,
  filterOptions
}: {
  flight: Flight;
  filterOptions: Partial<FilterOptions>;
}) => {
  const {
    flightId,
    flightCode,
    originAirportId,
    originAirportName,
    originAirportCountry,
    originAirportCity,
    originAirportDescription,
    destinationAirportId,
    destinationAirportName,
    destinationAirportCountry,
    destinationAirportCity,
    destinationAirportDescription,
    price
  } = flight;
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const handleShow1 = () => setShow1((prev) => !prev);
  const handleShow2 = () => setShow2((prev) => !prev);

  const { id, code, origin, destination, price: showPrice } = filterOptions;

  const showColor = useColorModeValue('brandGold.600', 'brandGold.50');
  const showColorHover = useColorModeValue('brandGold.800', 'brandGold.300');

  return (
    <React.Fragment>
      {id && (
        <Text>
          <b>{flightId}</b>
        </Text>
      )}
      {code && <Text>{flightCode}</Text>}
      {origin && (
        <Box>
          <Collapse startingHeight={20} in={show1}>
            <b>Id</b>: {originAirportId}
            {show1 ? '' : '...'}
            <br />
            <b>Airport</b>: {originAirportName}
            <br />
            <b>Country</b>: {originAirportCountry}
            <br />
            <b>City</b>: {originAirportCity}
            <br />
            <b>Description</b>: {originAirportDescription}
          </Collapse>
          <Link
            onClick={handleShow1}
            color={showColor}
            fontSize="sm"
            _hover={{ color: showColorHover }}
          >
            {show1 ? 'View less' : 'View more'}
          </Link>
        </Box>
      )}
      {destination && (
        <Box>
          <Collapse startingHeight={20} in={show2}>
            <b>Id</b>: {destinationAirportId}
            {show2 ? '' : '...'}
            <br />
            <b>Airport</b>: {destinationAirportName}
            <br />
            <b>Country</b>: {destinationAirportCountry}
            <br />
            <b>City</b>: {destinationAirportCity}
            <br />
            <b>Description</b>: {destinationAirportDescription}
          </Collapse>
          <Link
            href="#"
            onClick={handleShow2}
            color={showColor}
            fontSize="sm"
            _hover={{ color: showColorHover }}
          >
            {show2 ? 'View less' : 'View more'}
          </Link>
        </Box>
      )}
      {showPrice && <Text>${price}</Text>}
      <Divider gridColumn="1 / -1" />
    </React.Fragment>
  );
};

type GoToPageInputProps = {
  numberOfPages: number;
  setPage: (page: number) => void;
};

const GoToPageInput = ({ numberOfPages, setPage }: GoToPageInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Flex ml={5}>
      <Input
        borderRightRadius="none"
        w="100px"
        placeholder="Page no."
        ref={inputRef}
        size="sm"
        borderLeftRadius="md"
        min={0}
      />
      <Button
        colorScheme="brandGold"
        borderLeftRadius="none"
        size="sm"
        onClick={() => {
          const value: string | undefined = inputRef?.current?.value;
          if (
            /^\d+$/.test(value || '') &&
            Number(value) > 0 &&
            Number(value) <= numberOfPages
          ) {
            setPage(Number(value));
          }
        }}
      >
        Go To
      </Button>
    </Flex>
  );
};

type ServerSideProps = {
  count: number;
};

export const getServerSideProps: GetServerSideProps<
  ServerSideProps
> = async () => {
  const res = await server.get('/flights/count');
  const count = res.data.count;

  return {
    props: {
      count
    }
  };
};
export default AdminManageFlights;
