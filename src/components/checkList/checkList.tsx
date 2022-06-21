import React, { ReactNode, FC, useState, useEffect } from 'react';
import List, { ListProps } from '../list';

import { CheckListContext } from './context';
import { mergeProps } from '../../utils/with-default-props';
import { NativeProps, withNativeProps } from '../../utils/native-props';

export type CheckListProps = ListProps & {
  defaultValue?: string[];
  value?: string[];
  onChange?: (val: string[]) => void;
  multiple?: boolean;
  activeIcon?: ReactNode;
  unCheckIcon?: boolean | ReactNode;
  disabled?: boolean;
  readOnly?: boolean;
  isCancel?: boolean;
} & NativeProps;

const defaultProps = {
  multiple: false,
  defaultValue: [],
  unCheckIcon: false,
  isCancel:true
};

const CheckList: FC<CheckListProps> = (p) => {
  const props = mergeProps(defaultProps, p);

  const [value, setValue] = useState<string[]>(props.defaultValue);

  function check(val: string) {
    if (props.multiple) {
      setValue([...value, val]);
    } else {
      setValue([val]);
    }
  }

  function uncheck(val: string) {
    setValue(value.filter((item) => item !== val));
  }

  useEffect(() => {
    props.onChange?.(value);
  }, [value]);

  const { activeIcon, disabled, readOnly, unCheckIcon,isCancel } = props;
  return (
    <CheckListContext.Provider
      value={{
        value,
        check,
        uncheck,
        activeIcon,
        disabled,
        readOnly,
        unCheckIcon,
        isCancel,
      }}
    >
      {withNativeProps(props, <List>{props.children}</List>)}
    </CheckListContext.Provider>
  );
};

export default CheckList;
