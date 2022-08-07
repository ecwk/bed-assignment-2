import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  ModalCloseButton,
  type UseDisclosureReturn,
  Flex,
  Button,
  Spacer,
  Code,
  HStack,
  useToast
} from '@chakra-ui/react';
import { Form, FormButton, H2, H3, Input, Select } from '@common/components';
import { useCart } from '@common/hooks';
import { yupResolver } from '@hookform/resolvers/yup';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createBookingSchema } from '@modules/bookings';
import { useMutation } from '@tanstack/react-query';
import { sleep } from '@common/utils';
import { random } from 'lodash';
import { server } from '@config/axios';
import { useAuth } from '@modules/auth';
import { useRouter } from 'next/router';

export type CheckoutModalFormProps = {
  button?: JSX.Element;
  disclosure?: UseDisclosureReturn;
};

export type CheckoutDto = {
  name: string;
  passport: string;
  nationality: string;
  age: number;
};

export const CheckoutModalForm = ({
  button,
  disclosure
}: CheckoutModalFormProps) => {
  const defaultDisclosure = useDisclosure();
  const { isOpen, onOpen, onClose } = disclosure || defaultDisclosure;
  const { user } = useAuth();
  const { cart, clearCart } = useCart();

  const methods = useForm<CheckoutDto>({
    resolver: yupResolver(createBookingSchema)
  });

  const router = useRouter();
  const toast = useToast();
  const checkoutMutation = useMutation(
    async (data: CheckoutDto) => {
      console.log(data);
      const { name, passport, nationality, age } = data;
      return Promise.all(
        cart.map((item) => {
          return server.post(`/bookings/${user?.userId}/${item.id}`, {
            name,
            passport,
            nationality,
            age
          });
        })
      );
    },
    {
      onMutate: async (data) => {
        await sleep(random(500, 3000));
      },
      onSuccess: (data) => {
        console.log(data);
        toast({
          title: 'Success',
          description: 'Checkout successful',
          status: 'success',
          duration: 5000,
          position: 'bottom-right',
          isClosable: true,
          containerStyle: {
            marginRight: '40px',
            marginBottom: '20px'
          }
        });
        setTimeout(() => {
          clearCart();
          router.push('/settings/account/bookings');
          onClose();
        }, 1000);
      }
    }
  );
  const onSubmit = async (data: CheckoutDto) => {
    checkoutMutation.mutate(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent backgroundColor="modal-bg" p={4}>
        <ModalHeader>
          <H2>Checkout</H2>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Form methods={methods} onSubmit={onSubmit}>
            <H3>Traveler Information</H3>
            <Input
              mt={4}
              type="text"
              name="name"
              label="Full Name"
              placeholder="John Doe"
            />
            <Input
              mt={4}
              type="text"
              name="passport"
              label="Passport Number"
              placeholder="SG1234567J"
            />
            <Input
              mt={4}
              type="text"
              name="nationality"
              label="Nationality"
              placeholder="Singaporean"
            />
            <Input
              mt={4}
              type="number"
              name="age"
              label="Age"
              placeholder="Above 16"
            />

            <H3 mt={6}>Payment Details</H3>
            <Input
              mt={4}
              type="text"
              name="card"
              label="Card Number"
              placeholder="1234 5678 9012 3456"
              autoComplete="cc-number"
            />
            <Input
              mt={4}
              type="text"
              name="cardName"
              label="Name on Card"
              placeholder="John Doe"
              autoComplete="cc-name"
            />
            <Flex mt={4} gap={4}>
              <Input
                type="text"
                name="expiry"
                label="Expiry Date"
                placeholder="MM/YY"
                autoComplete="cc-exp"
              />
              <Input
                type="text"
                name="cvv"
                label="CVV"
                placeholder="123"
                autoComplete="cc-csc"
              />
            </Flex>

            <Flex mt={10}>
              <Button variant="ghost" onClick={() => methods.reset()}>
                Clear
              </Button>
              <Spacer />
              <Button mr={3} w="100px" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <FormButton
                w="100px"
                size="md"
                isLoading={checkoutMutation.isLoading}
                isSuccess={checkoutMutation.isSuccess}
              >
                Checkout
              </FormButton>
            </Flex>
          </Form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
