import {
  KKBNameMap,
  EDUNameMap,
  MingChunNameMap,
  WuWeiNameMap,
} from '../enum/tokenEnum';
import { EnvName, LinkHost } from '../enum/configEnum';
import { PaySdk } from '@kkb/kmos-paysdk-utils';

export const getToken = (): string => {
  const link = window.location.hostname;

  const env = PaySdk.getEnv();

  let tokenName: string | undefined;
  if (link.indexOf(LinkHost.EDU) !== -1) {
    tokenName = EDUNameMap.get(env as EnvName);
  }
  if (link.indexOf(LinkHost.MINGCHUN) !== -1) {
    tokenName = MingChunNameMap.get(env as EnvName);
  }
  if (link.indexOf(LinkHost.WUWEI) !== -1) {
    tokenName = WuWeiNameMap.get(env as EnvName);
  }
  if (link.indexOf(LinkHost.KKB) !== -1) {
    tokenName = KKBNameMap.get(env as EnvName);
  }
  // 添加本地测试代码
  // start
  if (link.indexOf('localhost') !== -1) {
    tokenName = EDUNameMap.get(env as EnvName);
  }
  // end
  return getCookie(tokenName);
};

export const getCookie = (c_name: string | undefined) => {
  if (document.cookie.length > 0 && c_name) {
    let c_start = document.cookie.indexOf(c_name + '=');
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1;
      let c_end = document.cookie.indexOf(';', c_start);
      if (c_end == -1) {
        c_end = document.cookie.length;
      }
      return decodeURI(document.cookie.substring(c_start, c_end));
    }
  }
  return '';
};
