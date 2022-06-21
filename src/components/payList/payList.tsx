import React, { MouseEvent, useCallback, useState } from 'react';
import { useDebounceFn } from 'ahooks';
import { CheckList, Button, Toast } from '../../index';
import HuabeiModal from './components/HuabeiModal';
import AgreeModal from './components/AgreeModal';

import { NativeProps, withNativeProps } from '../../utils/native-props';

import { useDetailAndOrder } from './hooks/useDetailAndOrder';
import { usePayOrder } from './hooks/usePayOrder';
import { sensorsTrack } from '../../utils/sensors';

import type {
  PayChannel,
  EmiAmounts,
  PayType,
  CreateOrderParams,
} from '@kkb/kmos-paysdk-utils';

import { Config } from '../../enum/configEnum';

export type createOrderParamsProps = CreateOrderParams & {
  /**  自定义参数 */
  customParams?: Record<string, any>;
};

const classPrefix = 'kpui-payList';

interface PayOrderParams {
  payType: PayType | null;
  emi?: number;
}

export type PayListProps = {
  list?: PayChannel[];
  orderNo?: string;
  userId: number;
  onClickListItem?: (item: PayChannel) => void;
  bottom?: boolean | React.ReactNode;
  sell?: string; // 组合商品 1
  deskUrlData?: string;
  onClickPayOrder?: () => void;
  openid: string;
  courseCode: string;
  channelCode: string;
  amount: number;
  unionid: string;
  passbackParams?: string;
  mobile: string;
  rightsCode?: 0 | 1 | 2;
  onWxPaySuccess?: (orderNo: string) => void;
} & NativeProps;

const PayList: React.FC<PayListProps> = (props) => {
  const [huabeiVisbile, setHuabeiVisbile] = useState<boolean>(false);
  const [huabeiInfo, setHuabeiInfo] = useState<PayChannel | null>(null);
  const [payOrderP, setPayOrderP] = useState<PayOrderParams>({
    payType: null,
    emi: undefined,
  });
  const [agreeVisible, setAgreeVisible] = useState<boolean>(false);
  const [isAgree, setIsAgree] = useState<boolean>(false);

  const [isShowList, setIsShowList] = useState<boolean>(false);

  const {
    orderNo: orderId,
    courseCode,
    channelCode,
    openid,
    list,
    onClickListItem,
    bottom,
    sell,
    deskUrlData,
    onClickPayOrder,
    amount,
    unionid,
    userId,
    passbackParams,
    mobile,
    rightsCode,
    onWxPaySuccess,
  } = props;

  const onChangePayOrderP = (type: PayType) => {
    setPayOrderP({ payType: type });
    setIsShowList(true);
  };

  // 课程详情和 订单编号
  const { payChannelList, orderNo, agreeInfo, courseData, createOrderFn } =
    useDetailAndOrder({
      orderNo: orderId,
      courseCode,
      channelCode,
      openid,
      onChangePayOrderP,
      list,
      sell,
      deskUrlData,
      amount,
      userId,
      unionid,
      passbackParams,
      mobile,
      rightsCode,
    });

  // 调取支付api
  const { parOrderFn } = usePayOrder({
    orderNo,
    openid,
    userId: props.userId,
    sell,
    unionid,
    onClickPayOrder,
    onWxPaySuccess,
  });

  const { run } = useDebounceFn(
    () => {
      if (!orderNo) {
        createOrderFn(courseData, orderNo);
      } else {
        if (!isAgree && agreeInfo) {
          Toast.show('请勾选协议后支付');
          return;
        }
        if (payOrderP.payType !== null) {
          // 埋点
          sensorsTrack({
            eventName: 'KMOS_payment_paymenttype_confirm_clk',
            uid: props.userId,
            courseData: courseData,
            sell: sell,
          });
          if (payOrderP.payType === Config.HUABEI_TYPE) {
            if (!payOrderP.emi) {
              Toast.show('请勾选分期期数');setHuabeiVisbile(true);
              return;
            }
          }
          parOrderFn(payOrderP?.payType, payOrderP?.emi);
        } else {
          Toast.show('请勾选支付方式');
          return;
        }
      }
    },
    {
      wait: 500,
    }
  );

  // 点击支付方式
  const handlePayItem = useCallback(
    async (item: PayChannel, index: number) => {
      // 埋点
      sensorsTrack({
        eventName: 'KMOS_payment_paymenttype_list_clk',
        uid: props.userId,
        courseData: courseData,
        sell: sell,
        payType: payOrderP.payType,
      });
      if (Config.HUABEI_TYPE === item.payType) {
        payChannelList && setHuabeiInfo(payChannelList[index]);
        setHuabeiVisbile(true);
      } 
      setPayOrderP({ payType: item.payType });
      onClickListItem?.(item);
    },
    [payChannelList, orderNo, payOrderP,courseData]
  );

  const handleHuabeiClose = () => {
    setHuabeiVisbile(false);
  };

  const handleHuabeiPay = (item: EmiAmounts) => {
    // parOrderFn(HUABEI_TYPE, item.emi);
    if (item.emi) {
      setPayOrderP({ payType: Config.HUABEI_TYPE, emi: item.emi });
      run();
    } else {
      Toast.show('请勾选分期期数');
    }
  };

  const handleAgree = () => {
    if (isAgree) {
      // 埋点
      sensorsTrack({
        eventName: 'KMOS_payment_paymenttype_agreement_pv',
        uid: props.userId,
        courseData: courseData,
        sell: sell,
      });
    }
    setIsAgree(!isAgree);
  };

  const handleAgreeClose = () => {
    setAgreeVisible(false);
  };

  const handleAgreeModal = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    // 埋点
    sensorsTrack({
      eventName: 'KMOS_payment_paymenttype_agreement_clk',
      uid: props.userId,
      courseData: courseData,
      sell: sell,
    });
    setAgreeVisible(true);
  };

  const agreeClass = () => {
    return isAgree ? 'active' : '';
  };

  return withNativeProps(
    props,
    <div className={`${classPrefix}`}>
      {isShowList && (
        <CheckList
          style={{
            '--border-inner': 'none',
            '--border-bottom': 'none',
            '--border-top': 'none',
          }}
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
          defaultValue={[`${payOrderP.payType}`]}
          isCancel={false}
        >
          {payChannelList &&
            payChannelList.map((item, index) => (
              <CheckList.Item
                key={item.id}
                value={`${item.payType}`}
                prefix={
                  <img
                    style={{ width: '23px', height: '23px' }}
                    src={Config.IMG_URL + item.icon}
                  />
                }
                onClick={() => handlePayItem(item, index)}
                className={`${classPrefix}-list-item`}
              >
                {item.name}
              </CheckList.Item>
            ))}
        </CheckList>
      )}

      {bottom &&
        (bottom === true ? (
          <div className={`${classPrefix}-bottom`}>
            {agreeInfo && (
              <div
                className={`${classPrefix}-agree ${agreeClass()}`}
                onClick={handleAgree}
              >
                <i className={`${classPrefix}-agree-icon`} />
                <span className={`${classPrefix}-agree-label`}>
                  我已阅读并同意
                  <span
                    className={`${classPrefix}-agree-a`}
                    onClick={handleAgreeModal}
                  >
                    《培训协议》
                  </span>
                </span>
              </div>
            )}
            <Button onClick={run} block className={`${classPrefix}-btn`}>
              立刻支付
            </Button>
          </div>
        ) : (
          bottom
        ))}
      {huabeiInfo && (
        <HuabeiModal
          visible={huabeiVisbile}
          info={huabeiInfo}
          onClose={handleHuabeiClose}
          onClickHuabeiPay={handleHuabeiPay}
        />
      )}
      {agreeInfo && (
        <AgreeModal
          visible={agreeVisible}
          protocol={agreeInfo}
          onClose={handleAgreeClose}
        />
      )}
    </div>
  );
};

export default PayList;
