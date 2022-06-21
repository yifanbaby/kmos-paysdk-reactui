import myAxios from '../utils/axios';

export function getListAPI(params) {
  return myAxios({ url: `/vipcourse/order`, method: 'post', data: params });
}
