import type { ApiUserInfoResult } from '@kkb/kmos-paysdk-utils';
import { PaySdk } from '@kkb/kmos-paysdk-utils';

interface Props {
  token?: string;
  callback: (data: ApiUserInfoResult) => void;
}

async function useCreateOrder({ token, callback }: Props) {
  const tokenInfo = token || localStorage.getItem('token');
  const headers: Record<string, any> = { lpsAuthorization: tokenInfo };
  const res = await PaySdk.getUserInfo<ApiUserInfoResult>({
    headers,
  });
  callback(res);
}

export default useCreateOrder;
