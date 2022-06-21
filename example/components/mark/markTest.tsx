import * as React from 'react';
import { Mask } from '../../../src';

interface Props {}

const MarkTest = (props: Props) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <div>
      <button onClick={() => setVisible(true)}>显示mark</button>
      <Mask visible={visible} onMaskClick={() => setVisible(false)}></Mask>
    </div>
  );
};

export default MarkTest;
