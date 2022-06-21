import { sm } from './render';
import PayConfirm from '../components/payConfirm';
import React from 'react';

let newProps: Record<any, any>;
const vue_payConfirmH5 = {
  render: (id: any, props: any) => {
    newProps = { ...props };
    sm.render(id, <PayConfirm {...props} />);
  },
  update: (id: any, props: any) => {
    newProps = { ...newProps, ...props };
    sm.update(id, <PayConfirm {...props} />);
  },
};

export default vue_payConfirmH5;
