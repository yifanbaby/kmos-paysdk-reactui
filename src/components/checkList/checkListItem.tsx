import React, { FC, useContext } from 'react';
import List, { ListItemProps } from '../list';

import { CheckListContext } from './context';
import { NativeProps, withNativeProps } from '../../utils/native-props';

export type CheckListItemProps = Pick<
  ListItemProps,
  'children' | 'prefix' | 'onClick' | 'extra' | 'isFromVlc'
> & {
  value: string;
  readOnly?: boolean;
} & NativeProps;

const classPrefix = `kpui-check-list-item`;

export const CheckListItem: FC<CheckListItemProps> = (props) => {
  const context = useContext(CheckListContext);
  if (context === null) {
    console.warn(
      'CheckList.Item',
      'CheckList.Item can only be used inside CheckList.'
    );
    return null;
  }
  const active = context.value.includes(props.value);
  const readOnly = props.readOnly || context.readOnly;
  const extra = (
    <div className={`${classPrefix}-extra`}>
      {active ? context.activeIcon : context.unCheckIcon}
    </div>
  );

  return withNativeProps(
    props,
    <List.Item
      prefix={props.prefix}
      onClick={(e) => {
        if (readOnly) return;
        if (active) {
          context.isCancel && context.uncheck(props.value);
        } else {
          context.check(props.value);
        }
        props.onClick?.(e);
      }}
      arrow={false}
      isFromVlc={props.isFromVlc}
      extra={props.extra ?? extra}
    >
      {props.children}
    </List.Item>
  );
};
