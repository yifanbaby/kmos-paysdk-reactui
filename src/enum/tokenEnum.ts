import { EnvName } from './configEnum';



export enum KKBTokenName {
  DEV = 'access-edu_test',
  TEST = 'access-edu_test',
  PRE = 'access-edu_pre',
  PROD = 'access-edu_online',
}

export enum EDUTokenName {
  DEV = 'access-edu_test',
  TEST = 'access-edu_test',
  PRE = 'access-edu_pre',
  PROD = 'access-edu_online',
}
export enum MingchunTokenName {
  DEV = 'access-mingchun_test',
  TEST = 'access-mingchun_test',
  PRE = 'access-mingchun_pre',
  PROD = 'access-mingchun_online',
}

export enum WuweiTokenName {
  DEV = 'access-wuwei_test',
  TEST = 'access-wuwei_test',
  PRE = 'access-wuwei_pre',
  PROD = 'access-wuwei_online',
}

export const KKBNameMap: Map<EnvName, KKBTokenName> = (() => {
  const map = new Map<EnvName, KKBTokenName>();
  map.set(EnvName.DEV, KKBTokenName.DEV);
  map.set(EnvName.TEST, KKBTokenName.TEST);
  map.set(EnvName.PRE, KKBTokenName.PRE);
  map.set(EnvName.PROD, KKBTokenName.PROD);
  return map;
})();

export const EDUNameMap: Map<EnvName, EDUTokenName> = (() => {
  const map = new Map<EnvName, EDUTokenName>();
  map.set(EnvName.DEV, EDUTokenName.DEV);
  map.set(EnvName.TEST, EDUTokenName.TEST);
  map.set(EnvName.PRE, EDUTokenName.PRE);
  map.set(EnvName.PROD, EDUTokenName.PROD);
  return map;
})();

export const MingChunNameMap: Map<EnvName, MingchunTokenName> = (() => {
  const map = new Map<EnvName, MingchunTokenName>();
  map.set(EnvName.DEV, MingchunTokenName.DEV);
  map.set(EnvName.TEST, MingchunTokenName.TEST);
  map.set(EnvName.PRE, MingchunTokenName.PRE);
  map.set(EnvName.PROD, MingchunTokenName.PROD);
  return map;
})();

export const WuWeiNameMap: Map<EnvName, WuweiTokenName> = (() => {
  const map = new Map<EnvName, WuweiTokenName>();
  map.set(EnvName.DEV, WuweiTokenName.DEV);
  map.set(EnvName.TEST, WuweiTokenName.TEST);
  map.set(EnvName.PRE, WuweiTokenName.PRE);
  map.set(EnvName.PROD, WuweiTokenName.PROD);
  return map;
})();
