import React, { useState } from 'react';
import classnames from 'classnames';
import { CheckList } from '../../index';
import { withNativeProps, NativeProps } from '../../utils/native-props';
import type { RightsItem } from '@kkb/kmos-paysdk-utils';
import { Config } from '../../enum/configEnum';

export type RightsListProps = {
  rights: RightsItem[];
  onClickItem?: (val: string[]) => void;
  rightSelect: RightsItem | null;
} & NativeProps;

const classPrefix = 'kpui-rightsList';

const RightsList = (props: RightsListProps) => {
  const [checkList, setCheckList] = useState<string[]>([]);

  const handleCheck = (val: string[]) => {
    setCheckList(val);
    const { onClickItem } = props;
    onClickItem?.(val);
  };

  const isActive = (index: string): string => {
    return checkList.indexOf(index) > -1 ? 'active' : '';
  };
  const { rights, rightSelect } = props;
  return withNativeProps(
    props,
    <CheckList
      onChange={handleCheck}
      activeIcon={
        <img
          src={`${Config.IMG_URL}/pay-sdk/33717102102202gtej.png`}
          className={`${classPrefix}-checkout`}
        />
      }
      unCheckIcon={
        <img
          src={`${Config.IMG_URL}/pay-sdk/85817102102202wssg.png`}
          className={`${classPrefix}-unCheckout`}
        />
      }
      style={{
        '--border-inner': 'none',
        '--border-bottom': 'none',
        '--border-top': 'none',
      }}
      className={`${classPrefix}-member`}
      defaultValue={[JSON.stringify(rightSelect)]}
    >
      {rights.map((item: RightsItem) => (
        <CheckList.Item
          key={item.code}
          value={JSON.stringify(item)}
          className={`${classPrefix}-member-item`}
        >
          <div
            className={classnames(
              `${classPrefix}-member-item-info`,
              `${isActive(JSON.stringify(item))}`
            )}
          >
            <div className={`${classPrefix}-member-item-info-l`}>
              <h2>{item.rightsRemark}</h2>
              {item.rightsNum > 0 && <p>权益剩余: {item.rightsNum}次</p>}
            </div>
            <div className={`${classPrefix}-member-item-info-r`}>
              {item.rightsName}
            </div>
          </div>
        </CheckList.Item>
      ))}
    </CheckList>
  );
};

export default RightsList;
