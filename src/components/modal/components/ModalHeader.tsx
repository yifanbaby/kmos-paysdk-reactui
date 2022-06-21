import React from 'react';

interface ModalHeaderProps {
  onClose?: () => void;
  title?: string | React.ReactNode;
}
const classPrefix = 'kpui-modal';

const ModalHeader: React.FC<ModalHeaderProps> = ({ onClose, title }) => {
  return (
    <div className={`${classPrefix}-head`}>
      <span className={`${classPrefix}-head-btn`} onClick={onClose}>
        取消
      </span>
      <div className={`${classPrefix}-head-title`}>{title}</div>
      <span className={`${classPrefix}-head-btn`}></span>
    </div>
  );
};

export default ModalHeader;
