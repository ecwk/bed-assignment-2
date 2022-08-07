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
import { H2, Select } from '@common/components';
import { yupResolver } from '@hookform/resolvers/yup';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  createUserSchema,
  CreateUserForm,
  type CreateUserFormData
} from '@modules/users';

export type CreateUserModalProps = {
  button?: JSX.Element;
  disclosure?: UseDisclosureReturn;
};

export const CreateUserModal = ({
  button,
  disclosure
}: CreateUserModalProps) => {
  const [mobileCode, setMobileCode] = useState('+65');
  const methods = useForm<CreateUserFormData>({
    resolver: yupResolver(createUserSchema(mobileCode))
  });

  const defaultDisclosure = useDisclosure();
  const { isOpen, onOpen, onClose } = disclosure || defaultDisclosure;

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
            <H2>Add User</H2>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateUserForm
              methods={methods}
              onClose={onClose}
              mobileCode={mobileCode}
              setMobileCode={setMobileCode}
            />
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
