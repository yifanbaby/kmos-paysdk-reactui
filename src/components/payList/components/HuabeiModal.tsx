import React, { useState, memo } from 'react';
import Modal from '../../modal';
import CheckList from '../../checkList';
import Button from '../../button';

import { PayChannel, EmiAmounts } from '@kkb/kmos-paysdk-utils';

import { Config } from '../../../enum/configEnum';

import type { ModalProps } from '../../modal/modalTypes';

const classPrefix = `kpui-huabei-list`;

type PayListProps = {
  info: PayChannel;
  onClickHuabeiPay: (item: EmiAmounts) => void;
} & Omit<ModalProps, 'children'>;

const HuabeiModal: React.FC<PayListProps> = (props) => {
  const {
    info: { emiAmounts },
    onClickHuabeiPay,
    onClose,
  } = props;

  const [item, setItem] = useState<EmiAmounts>({} as EmiAmounts);

  const handleCheckItem = (emiItem: EmiAmounts) => {
    if (item.emi === emiItem.emi) {
      setItem({} as EmiAmounts);
    } else {
      setItem(emiItem);
    }
  };

  const handleClose = () => {
    console.log('ssssss   close');
    setItem({} as EmiAmounts);
    onClose();
  };

  const handleToPay = () => {
    onClickHuabeiPay(item);
  };

  return (
    <Modal
      {...props}
      onClose={handleClose}
      mode="left"
      title={'选择分期期数'}
      destroyOnClose={true}
    >
      <CheckList
        // defaultValue={[]}
        style={{
          '--border-inner': 'none',
          '--border-bottom': 'none',
          '--border-top': 'none',
        }}
        activeIcon={
          <img
            src={`${Config.IMG_URL}/pay-sdk/33717102102202gtej.png`}
            className={`${classPrefix}-checkout`}
          />
        }
        unCheckIcon={
          <img
            src={`${Config.IMG_URL}/pay-sdk/85817102102202wssg.png`}
            className={`${classPrefix}-checkout`}
          />
        }
        value={item.emi ? [item.emi.toString()] : []}
      >
        <CheckList.Item
          key={'1'}
          value={''}
          readOnly={true}
          prefix={
            <img
              style={{ width: '23px', height: '23px' }}
              src={Config.IMG_URL + props.info.icon}
            />
          }
          extra={false}
        >
          {props.info.name}
        </CheckList.Item>
        {emiAmounts &&
          emiAmounts.map((item: EmiAmounts) => (
            <CheckList.Item
              key={item.emi}
              onClick={() => handleCheckItem(item)}
              value={item.emi.toString()}
            >
              <p className={`${classPrefix}-emi`}>
                ￥{item.amount} x {item.emi}期
              </p>
              <p className={`${classPrefix}-emi-tips`}>免手续费</p>
            </CheckList.Item>
          ))}
      </CheckList>
      <Button
        onClick={handleToPay}
        color="primary"
        block
        style={{ marginBottom: '20px' }}
      >
        确认付款
      </Button>
    </Modal>
  );
};

export default memo(HuabeiModal);
