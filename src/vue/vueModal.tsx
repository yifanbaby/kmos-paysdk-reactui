import { sm } from './render';
import Modal from '../components/modal';
import React from 'react';
import PayConfirm from '../components/payConfirm';
let newProps: Record<any, any>;
const vue_modalH5 = {
  render: (id: any, props: any) => {
    newProps = { ...props };
    sm.render(
      id,
      <Modal {...props}>
        <PayConfirm {...props} />
      </Modal>
    );
  },
  update: (id: any, props: any) => {
    newProps = { ...newProps, ...props };
    sm.update(
      id,
      <Modal {...props}>
        <PayConfirm {...props} />
      </Modal>
    );
  },
};

export default vue_modalH5;
