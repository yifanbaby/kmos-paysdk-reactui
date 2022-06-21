import * as React from 'react';
import PCPaylist from '../../../src/pc/components/PCPayList'
import { getListAPI } from '../../api';

// PaySdk.init('test');
export const PCPayList = () => {
  const [data, setdata] = React.useState<any>(null);

  const openModal = async () => {
    let params = {
      courseCode: 'f3m2x7rel5', //0307l3nhxh
      channelCode: 'k3v2ciq822', //9zd1lmrs9i
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
      endpoint: 'PC'
      // endPoint: isWx() ? 'WX' : 'PE-H5',
    };

    let res = await getListAPI(params);
    setdata(res.data.data);
  };

  React.useEffect(() => {
    // openModal()
  }, [])

  // orderNo={643383714374115328}
  return (
    <>
      <PCPaylist
        // orderNo={'643698239697809408'} // 643698239697809408
        openid={'o0IXit2_j575969Coiy-cZVwIqPU'}
        unionid={'ocPQA1VcrMOXhlqk2tPZvdlGgCK8'}
        channelCode={'ilmc3f63r6'}
        courseCode={'6xnhj3odq3'}
        // channelCode={'platovxocima6j'}
        // courseCode={'4uddffs0iy'}
        // channelCode={'590350821148778496'}
        // courseCode={'6xnhj3odq3'}
        mobile={'13699104154'}
        userId={10190212}
        // sell={1}
      />
    </>
  );
};
