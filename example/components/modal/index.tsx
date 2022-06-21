import * as React from 'react';
import { Modal, Toast, PayConfirm } from '../../../src/index';
import { PayListTest } from '../payList';
import CheckListTest from '../checkList';
import { getUrlParams } from '../../utils';

export const ModalTest = () => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    console.log('SSSSSS');
    Toast.show('sssssss');
  }, []);

  const openModal = () => {
    setVisible(!visible);
    Toast.show('2222222');
  };

  const handleClose = () => {
    setVisible(false);
  };
  const urlParams = getUrlParams(window.location.search);
  return (
    <>
      <button onClick={openModal}>Open modal</button>
      <PayConfirm
        {...urlParams}
        channelCode={urlParams.channelCode}
        courseCode={urlParams.courseCode}
      />
      <Modal
        visible={visible}
        onClose={handleClose}
        mode="left"
        title="标题"
        markStyle={{ backgroundColor: 'red' }}
      >
        <PayListTest />
        <CheckListTest />
        hahahhahaha
        <br />
        hahahhahaha
        <br />
        hahahhahaha
        <br />
        hahahhahaha
        <br />
        hahahhahaha
        <br />
        hahahhahaha
        <br />
        hahahhahaha
        <br />
        hahahhahaha
        <br />
        hahahhahaha
        <br />
        hahahhahaha
        <br />
        hahahhahaha
        <br />
        hahahhahaha
        <br />
      </Modal>
    </>
  );
};
