import ReactDOM from 'react-dom';
import React from 'react';

export const sm = {
  render: (container: string, components: React.ReactElement) => {
    ReactDOM.render(components, document.getElementById(container));
  },
  update: (container: string, components: React.ReactElement) => {
    const div: any = document.getElementById(container);
    ReactDOM.unmountComponentAtNode(div); // 卸载组件
    ReactDOM.render(components, div);
  },
};
