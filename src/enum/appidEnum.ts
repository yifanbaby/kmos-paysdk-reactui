import { EnvName } from './configEnum';

export enum KKBAppIdName {
  DEV = 'wxf47dff26f5a918f7',
  TEST = 'wxf47dff26f5a918f7',
  PRE = '',
  PROD = 'wx5046bc7413796142',
}

export enum EDUAppIdName {
  DEV = 'wx42e6f96e21752246',
  TEST = 'wx42e6f96e21752246',
  PRE = '',
  PROD = 'wxc224e1ac4cb50c22',
}

export enum MINGCHUNppIdName {
  DEV = 'wxf47dff26f5a918f7',
  TEST = 'wxf47dff26f5a918f7',
  PRE = '',
  PROD = 'wx5046bc7413796142',
}

export enum WUWEIAppIdName {
  DEV = 'wxd7213d81e70ff3c0',
  TEST = 'wxd7213d81e70ff3c0',
  PRE = '',
  PROD = 'wx60b4912fe450af21',
}


export const EDUAppIdMap: Map<EnvName, EDUAppIdName> = (() => {
  const map = new Map<EnvName, EDUAppIdName>();
  map.set(EnvName.DEV, EDUAppIdName.DEV);
  map.set(EnvName.TEST, EDUAppIdName.TEST);
  map.set(EnvName.PRE, EDUAppIdName.PRE);
  map.set(EnvName.PROD, EDUAppIdName.PROD);
  return map;
})();

export const KKbAppIdMap: Map<EnvName, KKBAppIdName> = (() => {
  const map = new Map<EnvName, KKBAppIdName>();
  map.set(EnvName.DEV, KKBAppIdName.DEV);
  map.set(EnvName.TEST, KKBAppIdName.TEST);
  map.set(EnvName.PRE, KKBAppIdName.PRE);
  map.set(EnvName.PROD, KKBAppIdName.PROD);
  return map;
})();

export const MINGCHUNAppIdMap: Map<EnvName, MINGCHUNppIdName> = (() => {
  const map = new Map<EnvName, MINGCHUNppIdName>();
  map.set(EnvName.DEV, MINGCHUNppIdName.DEV);
  map.set(EnvName.TEST, MINGCHUNppIdName.TEST);
  map.set(EnvName.PRE, MINGCHUNppIdName.PRE);
  map.set(EnvName.PROD, MINGCHUNppIdName.PROD);
  return map;
})();

export const WUWEIAppIdMap: Map<EnvName, WUWEIAppIdName> = (() => {
  const map = new Map<EnvName, WUWEIAppIdName>();
  map.set(EnvName.DEV, WUWEIAppIdName.DEV);
  map.set(EnvName.TEST, WUWEIAppIdName.TEST);
  map.set(EnvName.PRE, WUWEIAppIdName.PRE);
  map.set(EnvName.PROD, WUWEIAppIdName.PROD);
  return map;
})();
