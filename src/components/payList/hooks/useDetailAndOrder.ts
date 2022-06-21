import { useState, useEffect } from 'react';
import type {
  PayType,
  PayChannel,
  ApiPayWayListResult,
  ApiCourseDetailResult,
  ApiGroupDetailResult,
  CreateOrderParams,
} from '@kkb/kmos-paysdk-utils';
import { PaySdk } from '@kkb/kmos-paysdk-utils';

import { createOrderParamsProps } from '../payList';
import useCreateOrder from '../../../hooks/useCreateOrder';
import { getAppId } from '../../../utils/getAppId';
import { LinkHost } from '../../../enum/configEnum';
import { isWeChat, isPcDingTalkWS } from '../../../utils';
import { Config } from '../../../enum/configEnum';

type DetailAndOrderProps = {
  orderNo?: string;
  createOrderParams?: createOrderParamsProps;
  onChangePayOrderP: (type: PayType) => void;
  list?: PayChannel[];
  sell?: string;
  deskUrlData?: string;
  openid: string;
  courseCode: string;
  channelCode: string;
  amount: number;
  userId: number;
  unionid: string;
  passbackParams?: string;
  mobile: string;
  rightsCode?: 0 | 1 | 2;
};

export function useDetailAndOrder(props: DetailAndOrderProps) {
  const [payChannelList, setPayChannelList] = useState<PayChannel[] | null>(
    null
  );
  const [orderNo, setOrderNo] = useState<string | undefined>(props.orderNo);
  const [agreeInfo, setAgreeInfo] = useState<string>('');
  const [courseData, setcourseData] = useState<
    ApiCourseDetailResult | ApiGroupDetailResult | null
  >(null);
  const {
    openid,
    courseCode,
    channelCode,
    onChangePayOrderP,
    list,
    sell,
    amount,
    deskUrlData,
    unionid,
    userId,
    passbackParams,
    mobile,
    rightsCode,
  } = props;

  useEffect(() => {
    const load = async () => {
      // 课程详情
      const courseRes = await PaySdk.getCourseDetail<
        ApiCourseDetailResult | ApiGroupDetailResult
      >({
        params: {
          openid,
          unionid,
          channelCode,
          courseCode,
          uid: `${userId}`,
          sell,
        },
      });

      setcourseData(courseRes);
      createOrderFn(courseRes, orderNo);
    };

    load();
  }, []);

  const createOrderFn = (
    course?: ApiCourseDetailResult | ApiGroupDetailResult | null,
    orderNo?: string
  ) => {
    if (!orderNo) {
      let passback_params: any = '{}';
      if (window.location.hostname.indexOf(LinkHost.EDU) !== -1) {
        passback_params = JSON.parse(passbackParams || passback_params);
        passback_params.miduiType = 'md';
        passback_params = JSON.stringify(passback_params);
      }

      const createOrderParams: CreateOrderParams = {
        courseCode,
        channelCode,
        openid,
        unionid,
        user_id: userId,
        appid: getAppId(), // url传参获取
        appOpenid: getAppId(), // url传参获取
        passback_params: passbackParams || passback_params, // url获取
        mobile,
        buyerId: userId,
        orderStrategy: sell === '1' ? 2 : 1, // 根据  url 参数 sell 判断 sell =1 组合商品
        returnUrl: `${window.location.origin}/${deskUrlData}`, //  接口 默认配置
        endpoint: isWeChat ? 'WX' : 'PE-H5',
        isCashier: 1,
        checkedRightsCode: rightsCode,
        isVipUser: course?.memberUser === 1 ? true : false,
      };
      useCreateOrder({
        params: createOrderParams,
        callback: (data) => {
          if (data.orderType === 0 && deskUrlData) {
            window.location.href = `${window.location.origin}/${deskUrlData}?orderNo=${data.orderNo}`;
          } else {
            setOrderNo(data.orderNo);
            // 0元 不显示 paylist
          }
        },
      });
    }
  };

  useEffect(() => {
    const load = async () => {
      const params = {
        courseCode: sell === '1' ? '' : courseCode,
        no: sell === '1' ? orderNo : '',
        openid: sell === '1' ? openid : '',
        plantForm: 'h5',
        amount,
      };
      const res = await PaySdk.getPayWayList<ApiPayWayListResult>({
        params,
      });

      setAgreeInfo(res.protocol);
      if (!list) {
        let payList = res.payChannel;
        if (isPcDingTalkWS()) {
          payList = payList.filter((item) => item.payType !== Config.WX_TYPE);
        }
        setPayChannelList(payList);
        onChangePayOrderP(payList[0].payType);
      } else {
        setPayChannelList(list);
        onChangePayOrderP(list[0].payType);
      }
    };
    orderNo && load();
  }, [orderNo]);

  return { payChannelList, orderNo, agreeInfo, courseData, createOrderFn };
}
