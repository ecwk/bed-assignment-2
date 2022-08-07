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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
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
  VStack,
  BoxProps,
  Heading,
  FlexProps,
  InputRightElement,
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
  Portal,
  useToken
} from '@chakra-ui/react';
import { QueryCache, useQuery, useQueryClient } from '@tanstack/react-query';
import { GetServerSideProps, type NextPage } from 'next';
import {
  AddIcon,
  ArrowForwardIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MinusIcon,
  SearchIcon
} from '@chakra-ui/icons';
import { TbLayoutGrid, TbLayoutList } from 'react-icons/tb';
import { capitalize, startCase, truncate } from 'lodash';
import { DatePicker as MantineDatePicker } from '@mantine/dates';
import { MultiSelect, Pagination, SelectItem } from '@mantine/core';

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
import {
  CreateFlightModal,
  CreateFlightForm,
  SearchFlightKeySelect
} from '@modules/flights';
import { MdRefresh } from 'react-icons/md';
import { AxiosResponse } from 'axios';

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
    name: 'aircraft',
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
  aircraft: boolean;
  origin: boolean;
  destination: boolean;
  price: boolean;
};

const PAGE_DEFAULT = 1;

const DEFAULT_VALUES: FilterOptions = {
  itemsPerPage: 5,
  id: true,
  aircraft: true,
  code: true,
  origin: true,
  destination: true,
  price: true
};

const AdminManageFlights: NextPage = () => {
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebouncedValue(search, 1000);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (search !== debouncedSearch) {
      setIsLoading(true);
    } else if (search === debouncedSearch) {
      setIsLoading(false);
    }
  }, [search, debouncedSearch]);

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

  const [searchKeys, setSearchKeys] = useState<(keyof Flight)[]>([]);

  const flightsQuery = useQuery(
    ['flights', { itemsPerPage, page, debouncedSearch, searchKeys }],
    (ctx) => {
      let page_ = page;
      if (page > numberOfPages) {
        page_ = 1;
        setPage(1);
      }

      const searchKeysQuery = searchKeys.map((key) => `k=${key}`).join('&');
      return server.get(
        `/flights/?page=${page_}&limit=${itemsPerPage}&q=${debouncedSearch}${
          searchKeysQuery ? '&' + searchKeysQuery : ''
        }`,
        {
          signal: ctx.signal
        }
      );
    }
  );
  const countQuery = useQuery(
    ['flights-count', { itemsPerPage, page, debouncedSearch }],
    async (ctx) => {
      return server.get(`/flights/count/?limit=none&q=${debouncedSearch}`, {
        signal: ctx.signal
      });
    }
  );

  const [count, setCount] = useState(0);
  useEffect(() => {
    if (countQuery.data?.data?.count) {
      setCount(countQuery.data?.data?.count);
    } else if (countQuery.data?.data?.count !== 0) {
      setCount(0);
    }
  }, [countQuery.data]);
  const numberOfPages = useMemo(() => {
    const num = Math.ceil(
      count / (itemsPerPage || DEFAULT_VALUES.itemsPerPage)
    );
    if (num <= 0) {
      return 1;
    }
    return num;
  }, [count, itemsPerPage]);

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

  const refresh = () => {
    router.reload();
  };

  return (
    <Main>
      <Title
        mt={10}
        title="Manage Flights"
        subtitle="Using our built-in administrative functions"
      />
      <Form mt={5} methods={methods}>
        <Flex alignItems="flex-start" gap={4}>
          <FormControl>
            <FormLabel color={labelColor}>Refine Your Search</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <SearchIcon />
              </InputLeftElement>
              <Input
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
            <HStack mt={2}>
              <Text color="label-color" fontSize="sm" mb={1}>
                Search By:{' '}
              </Text>
              <SearchFlightKeySelect onChange={setSearchKeys} />
            </HStack>
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

        <Flex justifyContent="flex-end" alignItems="center" mt={2} gap={2}>
          <Text color="label-color" fontSize="sm" mb={1}>
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

          <IconButton
            aria-label="Refresh"
            icon={<MdRefresh />}
            size="sm"
            variant="ghost"
            onClick={refresh}
          />

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
                      <Checkbox
                        // @ts-ignore
                        {...methods.register(name)}
                        key={`field-${i}`}
                        disabled={name === 'id'}
                      >
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
          <CreateFlightModal
            button={<Button colorScheme="brandGold">Add Flight</Button>}
          />
        </Flex>
      </Form>

      <Flex mt={5} fontSize="sm" color="brandGray.500" alignItems="center">
        <Text>{count} Flights</Text>
        <Spacer />
        <Text>
          Page {page} / {numberOfPages}
        </Text>
        <GoToPageInput numberOfPages={numberOfPages} setPage={setPage} />
      </Flex>

      <FlightList
        mt={2}
        flights={flights}
        filterOptions={watch}
        fields={filteredFields}
        itemsPerPage={itemsPerPage || 2}
      />

      <Divider mt={10} />

      <Flex flexDir="column" alignItems="center" mx="auto">
        <Flex
          mt={5}
          fontSize="sm"
          color="brandGray.500"
          alignItems="center"
          w="100%"
        >
          <Text>{count} Flights</Text>
          <Spacer />
          <Text>
            Page {page} / {numberOfPages}
          </Text>
          <GoToPageInput numberOfPages={numberOfPages} setPage={setPage} />
        </Flex>
        <Pagination
          spacing={10}
          total={numberOfPages}
          page={page}
          onChange={(page) => setPage(page)}
          boundaries={2}
        />
      </Flex>
    </Main>
  );
};

type FlightListProps = BoxProps & {
  fields: Field[];
  flights: Flight[];
  filterOptions: Partial<FilterOptions>;
  itemsPerPage: number;
};

const FlightList = ({
  fields,
  flights,
  filterOptions,
  itemsPerPage,
  ...boxProps
}: FlightListProps) => {
  const backgroundColor = useColorModeValue('brandGray.50', 'brandGray.800');
  const borderColor = useColorModeValue('brandGray.200', 'brandGray.700');

  const skeletons = useMemo(() => {
    const arr = [];
    for (let i = 0; i < itemsPerPage; i++) {
      arr.push(<Skeleton gridColumn="1 / -1" key={`skeleton-${i}`} h="65px" />);
    }
    return arr;
  }, [itemsPerPage]);

  const headerBackgroundColor = useColorModeValue(
    'brandGray.700',
    'brandGray.900'
  );

  return (
    <Box {...boxProps}>
      <Grid
        p={4}
        border="1px solid"
        borderColor={borderColor}
        borderTopRadius="lg"
        backgroundColor={headerBackgroundColor}
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
          : skeletons}
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
    aircraftName,
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

  const {
    id,
    code,
    origin,
    aircraft,
    destination,
    price: showPrice
  } = filterOptions;

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
      {aircraft && <Text>{aircraftName}</Text>}
      {origin && (
        <Box>
          <Collapse startingHeight={95} in={show1}>
            <b>Id</b>: {originAirportId}
            {/* {show1 ? '' : '...'} */}
            <br />
            <b>Airport</b>: {originAirportName}
            <br />
            <b>Country</b>: {originAirportCountry}
            <br />
            <b>City</b>: {originAirportCity}
            <br />
            <b>Description</b>: {originAirportDescription}
          </Collapse>
          <Button
            variant="link"
            onClick={handleShow1}
            color={showColor}
            fontSize="sm"
            fontWeight="normal"
            _hover={{ color: showColorHover }}
          >
            {show1 ? 'View less' : 'View more'}
          </Button>
        </Box>
      )}
      {destination && (
        <Box>
          <Collapse startingHeight={95} in={show2}>
            <b>Id</b>: {destinationAirportId}
            <br />
            <b>Airport</b>: {destinationAirportName}
            <br />
            <b>Country</b>: {destinationAirportCountry}
            <br />
            <b>City</b>: {destinationAirportCity}
            <br />
            <b>Description</b>: {destinationAirportDescription}
          </Collapse>
          <Button
            variant="link"
            onClick={handleShow2}
            color={showColor}
            fontSize="sm"
            fontWeight="normal"
            _hover={{ color: showColorHover }}
          >
            {show2 ? 'View less' : 'View more'}
          </Button>
        </Box>
      )}
      {showPrice && <Text>${price}</Text>}
      <Divider gridColumn="1 / -1" />
    </React.Fragment>
  );
};

type GoToPageInputProps = FlexProps & {
  numberOfPages: number;
  setPage: (page: number) => void;
};

const GoToPageInput = ({
  numberOfPages,
  setPage,
  ...flexProps
}: GoToPageInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Flex ml={5} {...flexProps}>
      <Input
        borderRightRadius="none"
        w="100px"
        placeholder="Page no."
        type="number"
        _placeholder={{
          pl: 1
        }}
        ref={inputRef}
        size="sm"
        min={0}
        variant="flushed"
      />
      <IconButton
        aria-label="Go to page"
        icon={<ArrowForwardIcon />}
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
      />
    </Flex>
  );
};

export default AdminManageFlights;
