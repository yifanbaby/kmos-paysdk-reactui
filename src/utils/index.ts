const toString = Object.prototype.toString;

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}

export function isString(val: unknown): val is string {
  return is(val, 'String');
}

export function isFunction(val: unknown): val is Function {
  return typeof val === 'function';
}

export function isBoolean(val: unknown): val is boolean {
  return is(val, 'Boolean');
}

// 判断是否为浏览器环境
export const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

// 浏览器
export const inBrowser: boolean = typeof window !== 'undefined';

// 获取相关浏览器信息
export const UA: string | boolean =
  inBrowser && window.navigator.userAgent.toLowerCase();

// 是否微信浏览器
export const isWeChat: boolean = !!UA && /micromessenger/g.test(UA);

// 钉钉浏览器
export const isPcDingTalkWS = () => {
  var userAgentInfo = navigator.userAgent;
  var Agents = [
    'Android',
    'iPhone',
    'SymbianOS',
    'Windows Phone',
    'iPad',
    'iPod',
  ];
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (
      userAgentInfo.indexOf(Agents[v]) > 0 &&
      userAgentInfo.indexOf('DingTalk') === -1
    ) {
      flag = false;
      break;
    }
  }
  return flag;
};

/**
 * @description 获取url参数
 *
 * @param {string} url location.search
 * @return {*}
 */
export const getUrlParams = (url: string) => {
  // 创建一个URLSearchParams实例
  const urlSearchParams = new URLSearchParams(url);
  // 把键值对列表转换为一个对象
  const params = Object.fromEntries(urlSearchParams.entries());
  return params;
};
/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = '';
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
  }
  parameters = parameters.replace(/&$/, '');
  return /\?$/.test(baseUrl)
    ? baseUrl + parameters
    : baseUrl.replace(/\/?$/, '?') + parameters;
}

/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com?c=5', obj)
 *  ==>www.baidu.com?c=5&a=3&b=4
 */
export function setObjToUrlParams2(baseUrl: string, obj: any): string {
  let url = '';
  for (var k in obj) {
    let value = obj[k] !== undefined ? obj[k] : '';
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  url = url ? url.substring(1) : '';

  return (baseUrl += (baseUrl.indexOf('?') < 0 ? '?' : '&') + url);
}
