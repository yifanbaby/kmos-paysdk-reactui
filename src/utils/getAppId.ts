import { KKbAppIdMap, EDUAppIdMap, MINGCHUNAppIdMap, WUWEIAppIdMap } from '../enum/appidEnum';
import { EnvName, LinkHost } from '../enum/configEnum';
import { PaySdk } from '@kkb/kmos-paysdk-utils';

export const getAppId = (): string => {
  const link = window.location.hostname;

  const env = PaySdk.getEnv();

  let tokenName: string | undefined;
  if (link.indexOf(LinkHost.EDU) !== -1) {
    tokenName = EDUAppIdMap.get(env as EnvName);
  }
  if (link.indexOf(LinkHost.KKB) !== -1) {
    tokenName = KKbAppIdMap.get(env as EnvName);
  }

  if (link.indexOf(LinkHost.MINGCHUN) !== -1) {
    tokenName = MINGCHUNAppIdMap.get(env as EnvName);
  }

  if (link.indexOf(LinkHost.WUWEI) !== -1) {
    tokenName = WUWEIAppIdMap.get(env as EnvName);
  }
  // 添加本地测试代码
  // start
  if (link.indexOf('localhost') !== -1) {
    tokenName = KKbAppIdMap.get(env as EnvName);
  }
  // end
  return tokenName || '';
};
