import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Toast, ToastProps } from './toast';
import { mergeProps } from '../../utils/with-default-props';

const containers = [] as HTMLDivElement[];

function unmount(container: HTMLDivElement) {
  const unmountResult = ReactDOM.unmountComponentAtNode(container);
  if (unmountResult && container.parentNode) {
    container.parentNode.removeChild(container);
  }
}

export type ToastShowProps = Omit<ToastProps, 'visible'>;

const defaultProps = {
  duration: 3000,
};

export function show(p: ToastShowProps | string) {
  const props = mergeProps(
    defaultProps,
    typeof p === 'string' ? { content: p } : p
  );

  let timer = 0;
  const container = document.createElement('div');
  document.body.appendChild(container);
  clear();
  containers.push(container);

  const TempToast = () => {
    const [visible, setVisible] = useState(true);
    useEffect(() => {
      if (props.duration === 0) {
        return;
      }
      timer = window.setTimeout(() => {
        setVisible(false);
        unmount(container);
      }, props.duration);
      return () => {
        window.clearTimeout(timer);
      };
    }, []);

    return <Toast {...props} visible={visible} />;
  };
  ReactDOM.render(<TempToast />, container);
}

export function clear() {
  while (true) {
    const container = containers.pop();
    if (!container) break;
    unmount(container);
  }
}
