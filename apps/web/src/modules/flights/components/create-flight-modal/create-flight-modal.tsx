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
import { H2, FormButton } from '@common/components';

import { CreateFlightForm, CreateFlightFormData } from '@modules/flights';
import { useState } from 'react';

export type CreateFlightModalProps = {};

export const CreateFlightModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [previousFormState, setPreviousFormState] = useState<
    Partial<CreateFlightFormData>
  >({});

  const backgroundColor = useColorModeValue('brandGray.50', 'brandGray.800');

  return (
    <>
      <Button colorScheme="brandGold" onClick={onOpen}>
        Add Flight
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent backgroundColor={backgroundColor} p={4}>
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
