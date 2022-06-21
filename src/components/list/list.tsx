import * as React from 'react';
import classNames from 'classnames';
import { NativeProps, withNativeProps } from '../../utils/native-props';

const classPrefix = `kpui-list`;
export type ListProps = {
  children: React.ReactNode;
} & NativeProps<
  | '--prefix-width'
  | '--align-items'
  | '--active-background-color'
  | '--border-inner'
  | '--border-top'
  | '--border-bottom'
  | '--padding-left'
>;

export const List: React.FC<ListProps> = (props) => {
  return withNativeProps(
    props,
    <div className={classNames(`${classPrefix}`, `${classPrefix}-default`)}>
      <div className={`${classPrefix}-inner`}>{props.children}</div>
    </div>
  );
};
