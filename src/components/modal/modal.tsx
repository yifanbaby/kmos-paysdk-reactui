import React, { useCallback, useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import classnames from 'classnames';

import ModalHeader from './components/ModalHeader';
import Mark from '../mask';

import { withNativeProps } from '../../utils/native-props';
import { mergeProps } from '../../utils/with-default-props';
import { useShouldRender } from '../../utils/use-should-render';

import type { ModalProps } from './modalTypes';

const defaultProps = {
  visible: false,
  mode: 'bottom',
  mask: true,
};
const classPrefix = 'kpui-modal';

const ModalBox: React.FC<ModalProps> = (p) => {
  const props = mergeProps(defaultProps, p);

  const {
    children,
    visible,
    header,
    title,
    onClose,
    markStyle,
    mode,
    mask,
    markClassName,
    bodyStyle,
    bodyClassName,
  } = props;

  const [active, setActive] = useState(visible);
  useEffect(() => {
    visible && setActive(true);
  }, [visible]);

  const shouldRender = useShouldRender(
    active,
    props.forceRender,
    props.destroyOnClose
  );

  const headerLoad = useCallback(() => {
    if (header) return header;
    if (header === null) return null;
    return <ModalHeader title={title} onClose={onClose} />;
  }, [header]);

  return withNativeProps(
    props,
    <div className={classPrefix} style={{ display: active ? 'unset' : 'none' }}>
      {mask && (
        <Mark
          onMaskClick={onClose}
          style={markStyle}
          visible={visible}
          classname={markClassName}
        />
      )}
      <CSSTransition
        timeout={300}
        classNames={`${classPrefix}-${mode}`}
        in={visible}
        key={'modal'}
        onExited={() => setActive(false)}
        appear
      >
        <div className={`${classPrefix}-cssBody`}>
          {headerLoad()}
          <div
            className={classnames(`${classPrefix}-context`, bodyClassName)}
            style={bodyStyle}
          >
            {shouldRender && children}
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default ModalBox;
