import {
  VlcSuccessCallbackResult,
  goodDataParams,
  recvInfoParams,
} from '@kkb/kmos-paysdk-utils';

export interface PayCashierProps {
  visible: boolean; // true 开始加载组件
  goodsType: string; // virtual: 虚拟商品 matter: 实物商品
  mode?: 'left' | 'bottom'; // 支付方式弹框弹出方向
  appid: string; // 公众号appid
  openid: string;
  unionid: string;
  userId: number;
  mobile: string;
  courseCode: string; // 课程code
  channelCode: string; // 渠道code
  sell?: number; // 是否是组合商品 1
  openPayChannel?: boolean,
  passbackParams?: object; // 自定义参数
  payableAmount?: number, // 实物的应付金额
  orderItems?: goodDataParams[], // 实物的商品列表
  recvInfo?: recvInfoParams, // 实物的用户信息
  onSuccess?: (result: VlcSuccessCallbackResult) => void; // 支付完成回调
  wxPayConsole?: () => void; // 微信环境 取消微信支付
  onClose?: () => void; // 重置visible为false 回调
  onError?: (msg: string) => void;
  onGoodsType?: (goodsType: string) => void; // 回调传值 goodsType
}
