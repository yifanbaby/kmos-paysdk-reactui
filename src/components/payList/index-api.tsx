import React from 'react';
// import React, { useEffect, useState } from 'react';
import Modal from '../modal';
import List from '../list';
// import { getCourseDetail, ApiCourseDetailResult } from 'kmos-paysdk-utils';

import type { ModalProps } from '../modal/modalTypes';
// const imgUrl = 'https://img.kaikeba.com/';
export type PayListProps = {
  list?: any[];
} & Omit<ModalProps, 'children'>;

const PayList: React.FC<PayListProps> = (props) => {
  // const [data, setdata] = useState<ApiCourseDetailResult | null>(null);
  // useEffect(() => {
  //   const load = async () => {
  //     //?openid=o0IXitx_lVGqIU0Q26qYojqv4pAs&unionid=ocPQA1dkMB11rqsgUEktzVjISuQk
  //     const res = await getCourseDetail({
  //       openid: 'o0IXitx_lVGqIU0Q26qYojqv4pAs',
  //       unionid: 'ocPQA1dkMB11rqsgUEktzVjISuQk',
  //     });
  //     console.log(res);
  //     setdata(res);
  //   };
  //   load();
  // }, []);
  // console.log(data);
  return (
    <Modal {...props}>
      <List>
      <List.Item
            arrow={true}
            key={1}
            prefix={
              <img
                style={{ width: '23px', height: '23px' }}
                src={'https://img.kaikeba.com/pay_apli80957192700202wchx.png'}
              />
            }
            onClick={() => {
              console.log('1');
            }}
          >
            支付宝
          </List.Item>
        {/* {data?.payChannel.map((item) => (
          <List.Item
            arrow={true}
            key={item.id}
            prefix={
              <img
                style={{ width: '23px', height: '23px' }}
                src={imgUrl + item.icon}
              />
            }
            onClick={() => {
              console.log('1');
            }}
          >
            {item.name}
          </List.Item>
        ))} */}
      </List>
    </Modal>
  );
};

export default PayList;
