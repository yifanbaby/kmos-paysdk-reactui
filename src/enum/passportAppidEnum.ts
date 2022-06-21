import { EnvName } from './configEnum';

export enum KKBPassportAppIdName {
  DEV = 'hky8659205629467',
  TEST = 'hky8659205629467',
  PRE = 'hky4856309478123',
  PROD = 'hky8475638475664',
}

export enum EDUPassportAppIdName {
  DEV = 'hky8659205629467',
  TEST = 'hky8659205629467',
  PRE = '',
  PROD = 'hky8475638475664',
}

export enum MCPassportAppIdName {
  DEV = 'kkb0091002687005',
  TEST = 'kkb0091002687005',
  PRE = '',
  PROD = 'kkb1900120135867',
}

export enum WWPassportAppIdName {
  DEV = 'kkb0091002687006',
  TEST = 'kkb0091002687006',
  PRE = 'kkb2000101387292',
  PROD = 'kkb2000101387291',
}

export const KKbPassPortAppIdMap: Map<EnvName, KKBPassportAppIdName> = (() => {
  const map = new Map<EnvName, KKBPassportAppIdName>();
  map.set(EnvName.DEV, KKBPassportAppIdName.DEV);
  map.set(EnvName.TEST, KKBPassportAppIdName.TEST);
  map.set(EnvName.PRE, KKBPassportAppIdName.PRE);
  map.set(EnvName.PROD, KKBPassportAppIdName.PROD);
  return map;
})();

export const EDUPassportAppIdMap: Map<EnvName, EDUPassportAppIdName> = (() => {
  const map = new Map<EnvName, EDUPassportAppIdName>();
  map.set(EnvName.DEV, EDUPassportAppIdName.DEV);
  map.set(EnvName.TEST, EDUPassportAppIdName.TEST);
  map.set(EnvName.PRE, EDUPassportAppIdName.PRE);
  map.set(EnvName.PROD, EDUPassportAppIdName.PROD);
  return map;
})();

export const MCPassportAppIdMap: Map<EnvName, MCPassportAppIdName> = (() => {
  const map = new Map<EnvName, MCPassportAppIdName>();
  map.set(EnvName.DEV, MCPassportAppIdName.DEV);
  map.set(EnvName.TEST, MCPassportAppIdName.TEST);
  map.set(EnvName.PRE, MCPassportAppIdName.PRE);
  map.set(EnvName.PROD, MCPassportAppIdName.PROD);
  return map;
})();

export const WWPassportAppIdMap: Map<EnvName, WWPassportAppIdName> = (() => {
  const map = new Map<EnvName, WWPassportAppIdName>();
  map.set(EnvName.DEV, WWPassportAppIdName.DEV);
  map.set(EnvName.TEST, WWPassportAppIdName.TEST);
  map.set(EnvName.PRE, WWPassportAppIdName.PRE);
  map.set(EnvName.PROD, WWPassportAppIdName.PROD);
  return map;
})();

