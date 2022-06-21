import React from 'react';
import { Modal } from '../../../index';

interface AgreeProps {
  protocol: string;
  visible: boolean;
  onClose: () => void;
}

const AgreeModal = ({ protocol, visible, onClose }: AgreeProps) => {
  return (
    <Modal visible={visible} onClose={onClose}>
      <div dangerouslySetInnerHTML={{ __html: protocol }}></div>
    </Modal>
  );
};

export default AgreeModal;
