import * as React from 'react';
import { CheckList } from '../../../src';

interface Props {}

const CheckListTest = (props: Props) => {
  return (
    <CheckList defaultValue={['1']}>
      <CheckList.Item value={'1'}>ssss</CheckList.Item>
      <CheckList.Item value={'2'}>ssss111</CheckList.Item>
      <CheckList.Item value={'3'}>ssss2222</CheckList.Item>
    </CheckList>
  );
};

export default CheckListTest;
