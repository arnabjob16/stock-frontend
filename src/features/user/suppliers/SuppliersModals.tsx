import Modal from "../../common/Modal";
import ConfirmModal from "../../common/ConfirmModal";
import { ModalDataType, ModalConfirmDataType } from "../../../types/users.types";

interface Props {
  modalData: ModalDataType;
  modalConfirmData: ModalConfirmDataType;
  modalVisible: boolean;
  modalConfirmVisible: boolean;
  onCloseModal: () => void;
  onConfirmDelete: () => void;
  onCloseConfirm: () => void;
}

const SuppliersModals: React.FC<Props> = ({
  modalData,
  modalConfirmData,
  modalVisible,
  modalConfirmVisible,
  onCloseModal,
  onConfirmDelete,
  onCloseConfirm,
}) => {
  return (
    <>
      {modalVisible && (
        <Modal
          title={modalData.title}
          content={modalData.content}
          onClose={onCloseModal}
        />
      )}
      {modalConfirmVisible && (
        <ConfirmModal
          title={modalConfirmData.title}
          content={modalConfirmData.content}
          onClose={onCloseConfirm}
          onConfirm={onConfirmDelete}
        />
      )}
    </>
  );
};

export default SuppliersModals;
