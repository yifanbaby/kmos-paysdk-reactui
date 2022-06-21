import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import Mark from '../../mask';
import './paySuccessModal.less';

interface PaySuccessModalProps {
  visible: boolean;
  onClose: () => void;
  successUrl:string;
  orderNo:string;
}

const classPrefix = `kpui-paysuccess-modal`;

const PaySuccessModal = ({
  visible,
  onClose,
  successUrl,
  orderNo
}: PaySuccessModalProps) => {
  const [active, setActive] = useState(visible);
  useEffect(() => {
    visible && setActive(true);
  }, [visible]);

  const handlePayItem = () => {
    window.location.href = `${window.location.origin}/${successUrl}?orderNo=${orderNo}`;
  };
  const handleReload =()=>{
    window.location.reload()
  }

  return (
    <div className={classPrefix} style={{ display: active ? 'unset' : 'none' }}>
      <Mark onMaskClick={onClose} visible={visible} />

      <div className={`${classPrefix}-wrap`}>
        <CSSTransition
          timeout={300}
          classNames={`${classPrefix}-fade`}
          in={visible}
          key={'modal2'}
          onExited={() => setActive(false)}
          appear
        >
          <ul className={`${classPrefix}-main`}>
            <li>是否已完成支付？</li>
            <li className={`${classPrefix}-payed`} onClick={handlePayItem}>
              已完成支付
            </li>
            <li className={`${classPrefix}-noPay`} onClick={handleReload}>支付遇到问题，重新支付</li>
          </ul>
        </CSSTransition>
      </div>
    </div>
  );
};

export default PaySuccessModal;
