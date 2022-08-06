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
  useColorModeValue
} from '@chakra-ui/react';
import { H2, FormButton, Hide } from '@common/components';

import { CreateFlightForm, CreateFlightFormData } from '@modules/flights';
import { useState } from 'react';

export type CreateFlightModalProps = {
  hideButton?: boolean;
  disclosure?: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
  };
};

export const CreateFlightModal = ({
  disclosure,
  hideButton
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
      <Hide hide={hideButton}>
        <Button colorScheme="brandGold" onClick={onOpen}>
          Add Flight
        </Button>
      </Hide>

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
    </>
  );
};
