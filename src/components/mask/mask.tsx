import React, { useRef, useEffect } from 'react';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { NativeProps } from '../../utils/native-props';
import { useLockScroll } from '../../utils/use-lock-scroll';

export type MaskProps = {
  visible: boolean;
  style?: React.CSSProperties;
  onMaskClick?: () => void;
  classname?: string;
  disableBodyScroll?: boolean;
} & NativeProps<'--z-index'>;

const classPrefix = `kpui-mask`;

const Mark: React.FC<MaskProps> = (props) => {
  const {
    style,
    visible,
    classname,
    onMaskClick,
    disableBodyScroll = true,
  } = props;
  const [active, setActive] = React.useState(visible);

  const ref = useRef<HTMLDivElement>(null);

  useLockScroll(ref, visible && disableBodyScroll);

  useEffect(() => {
    visible && setActive(true);
  }, [visible]);
  return (
    <CSSTransition
      classNames={`${classPrefix}-fade`}
      timeout={300}
      in={visible}
      onExited={() => setActive(false)}
    >
      <div
        className={classPrefix}
        ref={ref}
        style={{ display: active ? 'unset' : 'none' }}
      >
        {onMaskClick && (
          <div
            key={'mask'}
            onClick={onMaskClick}
            style={style}
            className={classnames(`${classPrefix}-button`, classname)}
          ></div>
        )}
        <div className={`${classPrefix}-content`}></div>
      </div>
    </CSSTransition>
  );
};

export default Mark;
