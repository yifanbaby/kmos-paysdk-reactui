import { sm } from './render';
import PayList from '../components/payList';
import React from 'react';

let newProps: Record<any, any>;
const vue_PayListH5 = {
  render: (id: any, props: any) => {
    newProps = { ...props };
    sm.render(id, <PayList {...props} />);
  },
  update: (id: any, props: any) => {
    newProps = { ...newProps, ...props };
    sm.update(id, <PayList {...props} />);
  },
};

export default vue_PayListH5;
