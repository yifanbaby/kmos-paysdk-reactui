import React, { useState, useEffect, useMemo } from 'react';
import { PayCashierProps } from '../payCashierTypes'
import MaterialGoodsPay from '../PayCashierChild'
import { isWeChat } from '../../utils'
import {
  PaySdk,
  MatterOrderResult
} from '@kkb/kmos-paysdk-utils';

const MaterialGoods = (props: PayCashierProps) => {

  const {
    visible,
    openid,
    unionid,
    appid,
    userId,
    payableAmount,
    orderItems,
    recvInfo,
    mobile,
    passbackParams,
    onClose,
    onSuccess,
    wxPayConsole
  } = props

  const [orderNo, setOrderNo] = useState('')

  const getWXUrl = useMemo(() => {
    return PaySdk.getEnv() === 'prod' ? 'https://wx.kaikeba.com/ctp/paySuccess' : 'https://wxtest.kaikeba.com/ctp/paySuccess'
  }, [])

  const passback_params = useMemo(() => {
    let passbackObj: any = {
      ...passbackParams,
      livePlayUrl: window.location.href,
      content_extend: window.location.href,
      returnUrl: getWXUrl
    }
    return JSON.stringify(passbackObj)
  }, [])

  const getInit = async () => {
    try {
      const data = await PaySdk.matterCreateOrder<MatterOrderResult>({
        params: {
          orderSource: 2,
          payableAmount,
          endPoint: isWeChat ? 'WX' : 'PE-H5',
          orderItems,
          passbackParams: passback_params,
          recvInfo,
          userInfo: {
            userId,
            mobile,
            openId: openid,
            unionId: unionid,
            appId: appid,
            appOpenId: openid
          }
        }
      })
      setOrderNo(data.orderUserNo)
    } catch (err) {
      onClose?.()
    }
  }

  useEffect(() => {
    getInit()
  }, [visible])

  return (
    <>
      {
        visible && orderNo &&
        <MaterialGoodsPay
          amount={undefined}
          orderNo={orderNo}
          onSuccessVlcPay={onSuccess}
          onCancelVlcPay={wxPayConsole}
          onCloseModal={onClose}
          {...props}
        />
      }
    </>
  )
}

export default MaterialGoods
