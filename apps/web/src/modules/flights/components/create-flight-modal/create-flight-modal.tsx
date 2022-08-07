import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Portal,
  UseDisclosureReturn
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { H2, FormButton } from '@common/components';

import { CreateFlightForm, CreateFlightFormData } from '@modules/flights';

export type CreateFlightModalProps = {
  button?: JSX.Element;
  disclosure?: UseDisclosureReturn;
};

export const CreateFlightModal = ({
  button,
  disclosure
}: CreateFlightModalProps) => {
  const defaultDisclosure = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [previousFormState, setPreviousFormState] = useState<
    Partial<CreateFlightFormData>
  >({});

  const { isOpen, onOpen, onClose } = disclosure || defaultDisclosure;

  return (
    <>
      {button &&
        React.cloneElement(button, {
          onClick: onOpen
        })}

      <Portal>
        <Modal isOpen={isOpen} onClose={onClose} size="3xl">
          <ModalOverlay />
          <ModalContent backgroundColor={'modal-bg'} p={4}>
            <ModalHeader>
              <H2>Add Flight</H2>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <CreateFlightForm
                previousFormState={previousFormState}
                setPreviousFormState={setPreviousFormState}
                onClose={onClose}
                setIsLoading={setIsLoading}
                setIsSuccess={setIsSuccess}
              />
            </ModalBody>

            <ModalFooter>
              <Button mr={3} variant="outline" onClick={onClose} width="100px">
                Cancel
              </Button>
              <FormButton
                type="submit"
                form="flight-create-form"
                isLoading={isLoading}
                isSuccess={isSuccess}
                width="100px"
                size="md"
              >
                Add
              </FormButton>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Portal>
    </>
  );
};
