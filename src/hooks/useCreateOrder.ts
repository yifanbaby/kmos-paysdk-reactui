import type { ApiCreateOrderResult } from '@kkb/kmos-paysdk-utils';
import { PaySdk } from '@kkb/kmos-paysdk-utils';
import { createOrderParamsProps } from '../components/payList/payList';

interface Props {
  params: createOrderParamsProps;
  callback: (data: ApiCreateOrderResult) => void;
}

async function useCreateOrder({ params, callback }: Props) {
  if (Reflect.has(params, 'customParams')) {
    let JsP = JSON.parse(params.passback_params);
    let allP = { ...JsP, ...params.customParams };
    params.passback_params = allP;
    Reflect.deleteProperty(params, 'customParams');
  }
  const res = await PaySdk.postCreateOrder<ApiCreateOrderResult>({
    params: params,
  });
  if (res) {
    callback(res);
  }
}

export default useCreateOrder;
