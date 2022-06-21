import React, { useEffect } from 'react';
import { PayCashierProps } from './payCashierTypes'
import PayCashierLivePlay from './PayCashierLivePlay';
import MaterialGoods from './materialGoods/materialGoods'

const Index = (props: PayCashierProps) => {
  const {
    openid,
    unionid,
    visible,
    goodsType,
    onError
  } = props

  if (visible && openid && unionid) {
    if (goodsType === 'matter') { // 实物商品
      return (
        <MaterialGoods {...props} />
      )
    }
    // 虚拟商品
    return (
      <PayCashierLivePlay {...props} />
    )
  }

  const getError = () => {
    onError?.('未获取到openid或unionid')
  }

  useEffect(() => {
    getError()
  }, [])

  return null
}

export default Index
