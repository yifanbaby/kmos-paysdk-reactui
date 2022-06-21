import React, { FC } from 'react';
import classNames from 'classnames';
import { mergeProps } from '../../utils/with-default-props';
import { NativeProps, withNativeProps } from '../../utils/native-props';

export type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  type?: string;
  color?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  block?: boolean;
} & NativeProps<
  | '--text-color'
  | '--background-color'
  | '--border-radius'
  | '--border-width'
  | '--border-style'
  | '--border-color'
>;

const defaultProps = {
  color: 'default',
  block: false,
  type: 'button',
};

const classPrefix = `kpui-button`;

const Button: FC<ButtonProps> = (p) => {
  const props = mergeProps(defaultProps, p);
  return withNativeProps(
    props,
    <button
      onClick={props.onClick}
      className={classNames(
        classPrefix,
        props.color ? `${classPrefix}-${props.color}` : null,
        {
          [`${classPrefix}-block`]: props.block,
          [`${classPrefix}-disabled`]: props.disabled,
        }
      )}
    >
      {props.children}
    </button>
  );
};

export default Button;
