import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';

const classPrefix = `kpui-toast`;

export interface ToastProps {
  type?: 'info' | 'success' | 'error' | 'warning';
  position?: 'top' | 'bottom' | 'center';
  content: React.ReactNode;
  onClose?: () => void;
  duration?: number;
  visible: boolean;
}

export const Toast: React.FC<ToastProps> = ({ content, position, visible }) => {
  // React.useEffect(() => {
  //   visible;
  // }, [visible]);

  const top: string = React.useMemo(() => {
    switch (position) {
      case 'top':
        return '20%';
      case 'bottom':
        return '80%';
      default:
        return '50%';
    }
  }, [position]);
  return (
    <CSSTransition
      timeout={300}
      classNames={`${classPrefix}-fade`}
      unmountOnExit
      in={visible}
      key={'toast'}
      // onExited={() => setActive(false)}
      appear
    >
      <div
        className={classNames(
          `${classPrefix}-wrap`,
          `${classPrefix}-wrap-text`
        )}
        style={{ top }}
      >
        {content}
      </div>
    </CSSTransition>
  );
};
