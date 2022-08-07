import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  ModalCloseButton,
  type UseDisclosureReturn
} from '@chakra-ui/react';
import { H2 } from '@common/components';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  CreateAirportForm,
  createAirportSchema,
  type CreateAirportFormData
} from '@modules/airports';
import React from 'react';
import { useForm } from 'react-hook-form';

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
