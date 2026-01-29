import { useState } from "react";

type ModalType = "success" | "error" | "confirm";

interface ModalState {
  show: boolean;
  type: ModalType;
  title: string;
  message: string;
  onConfirm: () => void;
}

export function useModal() {
  const [modal, setModal] = useState<ModalState>({
    show: false,
    type: "success",
    title: "",
    message: "",
    onConfirm: () => {},
  });

  const showSuccessModal = (message: string) => {
    setModal({
      show: true,
      type: "success",
      title: "Success!",
      message,
      onConfirm: () => {},
    });
  };

  const showErrorModal = (message: string) => {
    setModal({
      show: true,
      type: "error",
      title: "Error",
      message,
      onConfirm: () => {},
    });
  };

  const showConfirmModal = (message: string, onConfirm: () => void) => {
    setModal({
      show: true,
      type: "confirm",
      title: "Confirm",
      message,
      onConfirm,
    });
  };

  const closeModal = () => {
    setModal((prev) => ({ ...prev, show: false }));
  };
  return {
    modal,
    showSuccessModal,
    showErrorModal,
    showConfirmModal,
    closeModal,
  };
}
