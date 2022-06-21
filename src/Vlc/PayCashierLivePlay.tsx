import React, { useState, useEffect, useMemo } from 'react';
import { isWeChat } from '../utils'
import { PayCashierProps } from './payCashierTypes'
import PayCahierChild from './PayCashierChild'
import {
  PaySdk,
  ApiUserCourseIsBuyResult,
  IsVipUserResult,
  ApiOrderRightResult,
  ApiCreateOrderResult,
  RightsItem
} from '@kkb/kmos-paysdk-utils';
interface CreateOrderResult {
  code: number;
  data: ApiCreateOrderResult,
  msg: string;
}

const PayCashierLivePlay:React.FC<PayCashierProps> = (props) => {

  const {
    visible,
    appid,
    openid,
    unionid,
    courseCode,
    channelCode,
    userId,
    mobile,
    sell,
    onSuccess,
    wxPayConsole,
    onClose
  } = props;

  const [getOrderObj, setOrderObj] = useState<ApiCreateOrderResult | null>(null);

  const getBuyCourse = async () => {
    // 是否购买过课程
    const data = await PaySdk.getUserCourseIsBuy<ApiUserCourseIsBuyResult>({
      params: {
        userId,
        type: 1, // sell === 1 ? 2 : 1
        courseCode,
        // parts, // 定金模式
      }
    })
    const {status} = data
    if (status === 2) {
      onSuccess?.({
        code: 2
      })
    } else {
      getInit()
    }
  }

  const getWXUrl = useMemo(() => {
    return PaySdk.getEnv() === 'prod' ? 'https://wx.kaikeba.com/paysuccess' : 'https://wxtest.kaikeba.com/paysuccess'
  }, [])

  const passback_params = useMemo(() => {
    let passback_params: any = '{}'
    passback_params = JSON.parse(passback_params)
    passback_params.livePlayUrl = window.location.href
    passback_params.content_extend = window.location.href
    passback_params = JSON.stringify(passback_params)
    return passback_params
  }, [])

  const getInit = async() => {
    // 是否是会员
    const isVipData = await PaySdk.getIsVipUser<IsVipUserResult>({
      params: {
        userId
      }
    })
    const isVipUser = isVipData && isVipData.status === 0 ? true : false
    // 权益列表
    const rightData = await PaySdk.getOrderRights<ApiOrderRightResult>({
      params: {
        userId,
        orderStrategy: 1,
        isVipUser: isVipUser ? 1 : 0,
        courseCode,
        channelCode
      }
    })
    let checkedRightsCode: 0 | 1 | 2 | undefined = 0
    const rightList = rightData.rightsAmountList
    if (rightList.length > 0) {
      checkedRightsCode = (rightList[0] as RightsItem).code
    }
    try {
      // 创建订单号
      const {code, data} = await PaySdk.postCreateOrder<CreateOrderResult>({
        params: {
          courseCode,
          channelCode,
          openid,
          unionid,
          user_id: userId,
          appid,
          appOpenid: openid,
          passback_params: passback_params,
          mobile,
          buyerId: userId,
          orderStrategy: sell && Number(sell) === 1 ? 2 : 1,
          returnUrl: getWXUrl,
          endpoint: isWeChat ? 'WX' : 'PE-H5',
          isCashier: 1,
          checkedRightsCode,
          isVipUser
        },
        options: {
          isTransformRequestResult: false
        }
      })
      if (code === 0 && data) {
        setOrderObj(data)
        return
      }
      onClose?.()
    } catch (error) {
      console.log(error)
      onClose?.()
    }
  }

  useEffect(() => {
    if (visible) {
      getBuyCourse()
    }
    return () => {
      setOrderObj(null)
    }
  }, [visible])

  return (
    <>
      {
        visible && getOrderObj && <PayCahierChild
          amount={getOrderObj?.price}
          orderType={getOrderObj?.orderType}
          orderNo={getOrderObj?.orderNo}
          onSuccessVlcPay={onSuccess}
          onCancelVlcPay={wxPayConsole}
          onCloseModal={onClose}
          {...props}
        />
      }
    </>
  )
}

export default PayCashierLivePlay
