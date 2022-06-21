import React, { useEffect } from 'react';
import { PayCashierProps } from '../payCashierTypes'
import MaterialGoods from './materialGoods'

const Index = (props: PayCashierProps) => {
  console.log(props, 'props')
  const {
    openid,
    unionid,
    visible,
    payableAmount,
    orderItems,
    recvInfo,
    onError
  } = props

  if (visible && openid && unionid  && orderItems && recvInfo && payableAmount) {
    return (
      <MaterialGoods {...props} />
    )
  }

  const getError = () => {
    onError?.('未获取到openid || unionid || 商品列表 || 用户信息 || 应付金额')
  }

  useEffect(() => {
    getError()
  }, [])

  return null
}

export default Index
