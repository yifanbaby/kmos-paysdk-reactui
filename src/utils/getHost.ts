import { LinkHost } from '../enum/configEnum';

export const getHostName = (): string => {

  const link = window.location.hostname;

  let tokenName: string | undefined;

  if (link.indexOf(LinkHost.KKB) !== -1) {
    tokenName = 'kkb'
  }

  if (link.indexOf(LinkHost.EDU) !== -1) {
    tokenName = 'md'
  }

  if (link.indexOf(LinkHost.MINGCHUN) !== -1) {
    tokenName = 'mc'
  }

  if (link.indexOf(LinkHost.WUWEI) !== -1) {
    tokenName = 'wwsx'
  }

  // 添加本地测试代码
  if (link.indexOf('localhost') !== -1) {
    tokenName = 'kkb'
  }

  return tokenName || ''

}