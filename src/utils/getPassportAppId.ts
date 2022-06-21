import {
  KKbPassPortAppIdMap,
  EDUPassportAppIdMap,
  MCPassportAppIdMap,
  WWPassportAppIdMap
} from '../enum/passportAppidEnum';
import { EnvName, LinkHost } from '../enum/configEnum';
import { PaySdk } from '@kkb/kmos-paysdk-utils';


export const getPassportAppId = (): string => {
  const link = window.location.hostname;

  const env = PaySdk.getEnv();

  let tokenName: string | undefined;
  if (link.indexOf(LinkHost.EDU) !== -1) {
    tokenName = EDUPassportAppIdMap.get(env as EnvName);
  }
  if (link.indexOf(LinkHost.KKB) !== -1) {
    tokenName = KKbPassPortAppIdMap.get(env as EnvName);
  }

  if (link.indexOf(LinkHost.MINGCHUN) !== -1) {
    tokenName = MCPassportAppIdMap.get(env as EnvName);
  }

  if (link.indexOf(LinkHost.WUWEI) !== -1) {
    tokenName = WWPassportAppIdMap.get(env as EnvName);
  }
  // 添加本地测试代码
  // start
  if (link.indexOf('localhost') !== -1) {
    tokenName = KKbPassPortAppIdMap.get(env as EnvName);
  }
  // end
  return tokenName || '';
};
