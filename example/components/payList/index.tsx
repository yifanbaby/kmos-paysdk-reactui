import * as React from 'react';
import { PayList } from '../../../src';
import { getListAPI } from '../../api';
import { isWx } from '../../utils';

// PaySdk.init('test');
export const PayListTest = () => {
  const [visible, setVisible] = React.useState(false);
  const [data, setdata] = React.useState<any>(null);

  const openModal = async () => {
    let params = {
      courseCode: '0307l3nhxh',
      channelCode: '9zd1lmrs9i',
      openid: 'o0IXitx_lVGqIU0Q26qYojqv4pAs',
      unionId: `ocPQA1dkMB11rqsgUEktzVjISuQk`,
      userId: 55527299,
      appId: 'wxf47dff26f5a918f7',
      appOpenId: 'o0IXitx_lVGqIU0Q26qYojqv4pAs',
      passbackParams: '{}',
      mobile: 13681000269,
      buyerId: 55527299,
      orderStrategy: 1,
      returnUrl: 'https://wxtest.kaikeba.com/paysuccess',
      // endPoint: isWx() ? 'WX' : 'PE-H5',
    };

    // let res = await getListAPI(params);
    // setdata(res.data.data);
    setVisible(!visible);
  };

  const handleClose = () => {
    setVisible(false);
  };
  return (
    <>
      <button onClick={openModal}>Open payList</button>
      {data && (
        <PayList
          visible={visible}
          onClose={handleClose}
          title={'请选择支付方式'}
          // orderNo={data?.orderNo}
          markStyle={{ backgroundColor: 'red' }}
          openid="o0IXitx_lVGqIU0Q26qYojqv4pAs"
          unionid="ocPQA1dkMB11rqsgUEktzVjISuQk"
          channelCode="9zd1lmrs9i"
          courseCode="0307l3nhxh"
          userId="55527299"
          createOrderParams={{
            courseCode: '0307l3nhxh',
            channelCode: '9zd1lmrs9i',
            openid: 'o0IXitx_lVGqIU0Q26qYojqv4pAs',
            unionId: `ocPQA1dkMB11rqsgUEktzVjISuQk`,
            userId: 55527299,
            appId: 'wxf47dff26f5a918f7',
            appOpenId: 'o0IXitx_lVGqIU0Q26qYojqv4pAs',
            passbackParams: '{}',
            mobile: 13681000269,
            buyerId: 55527299,
            orderStrategy: 1,
            returnUrl: 'https://wxtest.kaikeba.com/paysuccess',
          }}
        />
      )}
    </>
  );
};
