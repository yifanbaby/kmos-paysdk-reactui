import React, { useState, useMemo } from 'react';
import { PayList, Button, RightsList } from '../../index';
import PaySuccessModal from './components/PaySuccessModal';

import { withNativeProps, NativeProps } from '../../utils/native-props';
import { isWeChat } from '../../utils';
import useInit from './hooks/useInit';
import useCreateOrder from '../../hooks/useCreateOrder';
import { LinkHost } from '../../enum/configEnum';
import { getAppId } from '../../utils/getAppId';
import { sensorsTrack } from '../../utils/sensors';

import type {
  ApiCourseDetailResult,
  ApiCreateOrderResult,
  ApiGroupDetailResult,
  CreateOrderParams,
  RightsItem,
} from '@kkb/kmos-paysdk-utils';

export type PayConfirmProps = {
  onClickOrder?: () => void;
  courseName?: string;
  parts?: string;
  courseCode: string;
  channelCode: string;
  sell?: string; // 组合商品 1
  passbackParams?: string;
  onWxPaySuccess?: (orderNo: string) => void;
} & NativeProps;

const classPrefix = `kpui-payConfirm`;

// const openid = 'o0IXitx_lVGqIU0Q26qYojqv4pAs';
// const unionid = 'ocPQA1dkMB11rqsgUEktzVjISuQk';
// const userId = 55527299;
// const mobile = '13681000269';

const PayConfirm = (props: PayConfirmProps) => {
  const [isShowPayList, setIsShowPayList] = useState<boolean>(false);

  const [rightSelect, setRightSelect] = useState<RightsItem | null>(null);
  const [orderInfo, setOrderInfo] = useState<ApiCreateOrderResult | null>(null);

  const [paySucessVisible, setPaySucessVisible] = useState(false);

  // const urlParams = useMemo(() => {
  //   const params = getUrlParams(window.location.search);
  //   return params;
  // }, []);

  const {
    courseCode,
    channelCode,
    sell,
    passbackParams,
    courseName,
    parts,
    onWxPaySuccess,
  } = props;

  const { courseData, rightData, userData, deskUrlData } = useInit({
    courseCode,
    channelCode,
    sell,
    parts,
    setIsShowPayList,
    setRightSelect,
  });

  // const rightsCodeMemo = useMemo(() => {
  //   let rightsCode = rightSelect?.code;
  //   if (!rightsCode && rightData && rightData.rightsAmountList.length > 0) {
  //     rightsCode = 0;
  //   }
  //   return rightsCode;
  // }, [rightSelect, rightData]);

  const createOrderParams = useMemo(() => {
    if (userData && deskUrlData) {
      // const passbackParams = JSON.parse(urlParams.passbackParams) || {};
      // passbackParams.orderNo = '';

      let passback_params: any = '{}';
      if (window.location.hostname.indexOf(LinkHost.EDU) !== -1) {
        passback_params = JSON.parse(passbackParams || passback_params);
        passback_params.miduiType = 'md';
        passback_params = JSON.stringify(passback_params);
      }

      const params: CreateOrderParams = {
        courseCode,
        channelCode,
        openid: userData!.openid,
        unionid: userData!.unionid,
        user_id: userData!.uid,
        appid: getAppId(), // url传参获取
        appOpenid: getAppId(), // url传参获取
        passback_params: passback_params, // url获取
        mobile: userData!.mobile,
        buyerId: userData!.uid,
        orderStrategy: sell === '1' ? 2 : 1, // 根据  url 参数 sell 判断 sell =1 组合商品
        returnUrl: `${window.location.origin}/${deskUrlData.defaultSuccessUrl}`, //  接口 默认配置
        endpoint: isWeChat ? 'WX' : 'PE-H5',
        isCashier: 1,
        checkedRightsCode: rightSelect?.code,
        isVipUser: courseData?.memberUser === 1 ? true : false,
      };
      return params;
    } else {
      return undefined;
    }
  }, [userData, deskUrlData, rightSelect?.code, courseData]);

  // 点击确认下单
  const handleToOrder = () => {
    props.onClickOrder?.();
    // 点击确认下单  0元订单  创建订单要传 rightsSelect

    createOrderParams &&
      useCreateOrder({
        params: createOrderParams,
        callback: (data) => {
          // 埋点
          sensorsTrack({
            eventName: 'KMOS_payment_discount_confirm_clk',
            uid: userData!.uid,
            courseData,
            sell,
          });
          //  修改 判断是否是0元订单
          if (data.orderType === 0 && deskUrlData) {
            window.location.href = `${deskUrlData.successUrl}?orderNo=${data.orderNo}`;
          } else {
            setOrderInfo(data);
            // 0元 不显示 paylist
            setIsShowPayList(true);
          }
        },
      });
  };

  // 点击选择权益
  const handleRightsItem = (val: string[]) => {
    let item = val.length > 0 ? (JSON.parse(val[0]) as RightsItem) : null;
    setRightSelect(item);
  };

  // 点击去支付
  const handlePayOrder = () => {
    setTimeout(() => {
      setPaySucessVisible(true);
    }, 1000);
  };

  const renderPayList = () => {
    if (isShowPayList && userData && courseData && deskUrlData && rightData) {
      let amount = courseData.amount;
      if (rightData.rightsAmountList.length > 0) {
        amount = rightData.rightsAmountList[0].amount;
      }

      return (
        <PayList
          orderNo={orderInfo?.orderNo}
          openid={userData.openid}
          unionid={userData.unionid}
          channelCode={channelCode}
          courseCode={courseCode}
          userId={userData.uid}
          deskUrlData={deskUrlData.defaultSuccessUrl}
          bottom
          onClickPayOrder={handlePayOrder}
          sell={sell}
          amount={amount}
          mobile={userData.mobile}
          rightsCode={rightSelect?.code}
          onWxPaySuccess={onWxPaySuccess}
        />
      );
    }
    return null;
  };

  return withNativeProps(
    props,
    <div className={`${classPrefix}`}>
      <div className={`${classPrefix}-detail`}>
        <p className={`${classPrefix}-detail-price`}>
          <span className={`${classPrefix}-detail-price-symbol`}>￥</span>
          {rightSelect ? rightSelect.amount : rightData?.baseAmount.amount}
          {rightSelect && (
            <span className={`${classPrefix}-detail-price-del`}>
              ￥{courseData?.amount}
            </span>
          )}
        </p>
        <p className={`${classPrefix}-detail-title`}>
          {courseName ?? sell === '1'
            ? (courseData as ApiGroupDetailResult)?.name
            : (courseData as ApiCourseDetailResult)?.courseName}
        </p>
      </div>
      {rightData && rightData.rightsAmountList.length > 0 && !isShowPayList && (
        <RightsList
          rights={rightData.rightsAmountList}
          onClickItem={handleRightsItem}
          rightSelect={rightSelect}
        />
      )}
      {!isShowPayList && (
        <Button onClick={handleToOrder} block className={`${classPrefix}-btn`}>
          确认下单
        </Button>
      )}
      {renderPayList()}

      {deskUrlData && orderInfo?.orderNo && (
        <PaySuccessModal
          visible={paySucessVisible}
          onClose={() => {
            setPaySucessVisible(false);
          }}
          successUrl={deskUrlData.defaultSuccessUrl}
          orderNo={orderInfo?.orderNo}
        />
      )}
    </div>
  );
};

export default PayConfirm;
