import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  type UseDisclosureReturn,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react';
import { H2, FormButton, Hide } from '@common/components';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  createAirportSchema,
  CreateAirportForm,
  type CreateAirportFormData
} from '@modules/airports';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const DEFAULT_FORM_VALUES: Partial<CreateAirportFormData> = {};

export type CreateAirportModalProps = {
  button?: JSX.Element;
  disclosure?: UseDisclosureReturn;
};

export const CreateAirportModal = ({
  button,
  disclosure
}: CreateAirportModalProps) => {
  const defaultDisclosure = useDisclosure();
  const { isOpen, onOpen, onClose } = disclosure || defaultDisclosure;

  const methods = useForm<CreateAirportFormData>({
    resolver: yupResolver(createAirportSchema)
  });

  return (
    <>
      {button &&
        React.cloneElement(button, {
          onClick: onOpen
        })}
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent backgroundColor="modal-bg" p={4}>
          <ModalHeader>
            <H2>Add Airport</H2>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateAirportForm methods={methods} onClose={onClose} />
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
