import './toast.less';
import { clear, show } from './toastFn';

export type { ToastShowProps } from './toastFn';

const Toast = {
  show,
  clear,
};

export default Toast;
