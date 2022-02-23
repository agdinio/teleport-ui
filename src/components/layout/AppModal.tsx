import {
  ModalOverlay,
  Modal,
  ModalContent,
  ModalBody,
  UseDisclosureProps,
} from "@chakra-ui/react";

const AppModal: React.FC<UseDisclosureProps> = ({
  children,
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backgroundColor="blackAlpha.800" />
      <ModalContent backgroundColor="transparent" maxW="1000px">
        <ModalBody backgroundColor="transparent" maxW="1000px">
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export { AppModal };
