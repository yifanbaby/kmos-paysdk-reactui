import type {
  CreateOrderParams,
  ApiCreateOrderResult,
  PayAllProps,
  PayType,
  PayTypeProps,
} from '@kkb/kmos-paysdk-utils';

import { PaySdk } from '@kkb/kmos-paysdk-utils';

type PayParams = CreateOrderParams & {
  payType: PayType;
  sell?: null | number;
  parts?: string;
  endpoint?: string;
  // 分期 期数
  emi?: number;
  onWxPaySuccess?: (orderNo: string) => void;
  deskUrlData?: string;
};

const pay = async (params: PayParams) => {
  const resOrder = await PaySdk.postCreateOrder<ApiCreateOrderResult>({
    params: params,
  });
  if (resOrder && resOrder.orderNo) {
    const { openid, payType, sell, unionid, parts, endpoint, emi, user_id } =
      params;
    const orderParams = {
      openid: openid,
      orderNo: resOrder.orderNo,
      payType: payType,
      sell: sell,
      unionid: unionid,
      parts: parts,
      endpoint: endpoint,
      // 分期 期数
      emi: emi,
      userId: user_id,
    };
    const resPay = await PaySdk.getPayorder<PayAllProps>({
      params: orderParams,
    });

    if (resPay) {
      const payParam: PayTypeProps = {
        type: payType,
        orderNo: resOrder.orderNo,
        openid: openid,
        ...(resPay as PayAllProps),
        onSuccess: params.onWxPaySuccess,
      };
      PaySdk.pay(payParam);
    }
  }
};

export default pay;
