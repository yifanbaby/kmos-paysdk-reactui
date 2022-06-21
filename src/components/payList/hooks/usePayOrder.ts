import type {
  PayType,
  PayOrderParams,
  PayAllProps,
  PayTypeProps,
  VlcSuccessCallbackResult,
} from '@kkb/kmos-paysdk-utils';
import { PaySdk } from '@kkb/kmos-paysdk-utils';

import { isWeChat } from '../../../utils';
interface PayOrderProps {
  orderNo?: string;
  unionid?: string;
  openid: string;
  userId?: number;
  sell?: string;
  onClickPayOrder?: () => void;
  onWxPaySuccess?:(orderNo:string)=>void;
  isFromVlc?: boolean, // 来源于vlc直播间
  env?: string, // 环境变量  test prod
  goodsType?: string,
  onCloseModal?: () => void; // vlc直播间重置visible 可以再次调取支付
  onSuccessVlcPay?:(result: VlcSuccessCallbackResult) => void; // vlc 微信环境支付成功回调
  onCloseWxPay?: () => void; // vlc 微信环境 取消支付回调
}

export function usePayOrder({
  orderNo,
  openid,
  userId,
  sell,
  unionid,
  onClickPayOrder,
  onWxPaySuccess,
  isFromVlc,
  env,
  goodsType,
  onCloseModal,
  onSuccessVlcPay,
  onCloseWxPay
}: PayOrderProps) {
  const parOrderFn = async (payType: PayType, emi?: number) => {
    console.log('orderNo', orderNo);
    if (orderNo) {
      const params: PayOrderParams = {
        openid: openid,
        orderNo: orderNo,
        payType: payType === 1 ? (isWeChat ? payType : 13) : payType,
        sell: sell ? parseInt(sell) : null,
      };
      emi && (params.emi = emi);
      emi && (params.userId = userId);
      if (sell === '1') {
        params.parts = '';
        params.endpoint = isWeChat ? 'WX' : 'PE-H5';
        params.unionid = unionid;
        params.userId = userId;
      }
      try {
        let res: PayAllProps
        if (goodsType === 'matter') {
          res = await PaySdk.matterGetPayorder<PayAllProps>({
            params: {
              orderNo,
              payType,
              endpoint: isWeChat ? 'WX' : 'PE-H5',
              openid
            },
          });
        } else {
          res = await PaySdk.getPayorder<PayAllProps>({
            params,
          });
        }
        const payParam: PayTypeProps = {
          type: payType,
          orderNo: orderNo,
          openid: openid,
          isFromVlc: isFromVlc,
          goodsType,
          env,
          ...(res as PayAllProps),
          onSuccess:onWxPaySuccess,
          onSuccessVlc: onSuccessVlcPay,
          onCloseWechat: onCloseWxPay,
        };
        onClickPayOrder?.();
        PaySdk.pay(payParam);
      } catch (err) {
        // vlc 异常重置visble 回调onCloseModal
        isFromVlc && onCloseModal?.()
      }
    }
  }
  return { parOrderFn };
}
