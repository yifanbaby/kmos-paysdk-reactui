import * as React from 'react';
import { NativeProps, withNativeProps } from '../../utils/native-props';

const classPrefix = `kpui-list-item`;

export type ListItemProps = {
  children: string | React.ReactNode;
  prefix?: React.ReactNode;
  arrow?: boolean | React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  extra?: React.ReactNode;
  isFromVlc?: boolean | React.ReactNode;
} & NativeProps;

export const Item: React.FC<ListItemProps> = (props) => {
  const { children, prefix, arrow = false, onClick = () => {}, extra, isFromVlc} = props;
  return withNativeProps(
    props,
    <div className={`${classPrefix}-content`} onClick={onClick}>
      {prefix && (
        <div className={`${classPrefix}-content-prefix`}>{prefix}</div>
      )}
      <div className={`${classPrefix}-content-main`}>{children}</div>
      {
        !isFromVlc && (
          <>
            {extra && <div className={`${classPrefix}-content-extra`}>{extra}</div>}
            {arrow && (
              <div className={`${classPrefix}-content-arrow`}>
                {arrow === true ? '>' : arrow}
              </div>
            )}
          </>
        )
      }
    </div>
  );
};
