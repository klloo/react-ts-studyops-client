import React, { ReactNode } from 'react';
import { CreateModal } from './style';

interface PropType {
  children: ReactNode;
  show: boolean;
  onCloseModal: () => void;
  backgroundFilter?: boolean;
}

const Modal = ({ children, show, onCloseModal }: PropType) => {
  if (!show) return null;

  return <CreateModal onClick={onCloseModal}>{children}</CreateModal>;
};

export default Modal;
