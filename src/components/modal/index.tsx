import * as React from 'react';
import ReactDOM from 'react-dom';
import ModalBox from './modal';

import './modal.less';

import type { ModalProps } from './modalTypes';

import { canUseDom } from '../../utils/can-use-dom';

export type { ModalProps };

const Modal = (props: ModalProps) => {
  const { visible } = props;
  const [animatedVisible, setAnimatedVisible] = React.useState<boolean>(
    visible
  );

  React.useEffect(() => {
    if (visible) {
      setAnimatedVisible(true);
    }
  }, [visible]);

  const modal = <ModalBox {...props} />;
  if (!animatedVisible) {
    return null;
  }
  if (canUseDom) {
    return ReactDOM.createPortal(modal, document.body);
  }
  return modal;
};

export default Modal;
