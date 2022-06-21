import React, { useState } from 'react'
import {
  CheckList,
  Toast
} from '../index'
import { Config } from '../enum/configEnum'
import { PayChannel, PayType, EmiAmounts } from '@kkb/kmos-paysdk-utils';
import HuabeiModal from '../components/payList/components/HuabeiModal'
import { NativeProps, withNativeProps } from '../utils/native-props'
import './PayList.less'

const classPrefix = 'kpui-payList';
export interface PayOrderParams {
  payType: PayType | null;
  emi?: number;
}

type PayListProps = {
  getChannelList: PayChannel[],
  onClickPayWay?: (item:PayChannel) => void,
  onClickHuaBeiPay?: (item: any) => void,
  isFromVlc?: boolean
} & NativeProps

const VlcPayList:React.FC<PayListProps> = (props) => {

  const {
    getChannelList,
    onClickHuaBeiPay,
    onClickPayWay,
    isFromVlc
  } = props

  const [huabeiVisbile, setHuabeiVisbile] = useState<boolean>(false);
  const [huabeiInfo, setHuabeiInfo] = useState<PayChannel | null>(null);
  const [getPayWayItem, setPayWayItem] = useState<PayOrderParams>({
    payType: null,
    emi: undefined,
  })

  const handleHuabeiClose = () => {
    setHuabeiVisbile(false)
  }

  const handleHuaBeiPay = (item: EmiAmounts) => {
    // 点击花呗分期支付
    if (item.emi) {
      getPayWayItem && onClickHuaBeiPay?.({
        payType: getPayWayItem?.payType,
        emi: item.emi
      })
    } else {
      Toast.show('请勾选分期期数');
    }
  }

  const handlePayItem = (item: PayChannel, index: number) => {
    console.log(index, 'index')
    // 点击支付方式
    setPayWayItem({payType: item.payType})
    if (Config.HUABEI_TYPE === item.payType) { // 花呗分期支付方式
      getChannelList && setHuabeiInfo(getChannelList[index]);
      setHuabeiVisbile(true);
      return
    }
    onClickPayWay?.(item)
  }

  return (
    withNativeProps(
      props,
      <div className={`${classPrefix}`}>
        <CheckList
          // style={{
          //   '--border-inner': 'none',
          //   '--border-bottom': 'none',
          //   '--border-top': 'none',
          // }}
          className={`${classPrefix}-vlc-list`}
          activeIcon={
            <img
              src={`${Config.IMG_URL}/pay-sdk/33717102102202gtej.png`}
              className={`${classPrefix}-checkout`}
            />
          }
          unCheckIcon={
            <img
              src={`${Config.IMG_URL}/pay-sdk/85817102102202wssg.png`}
              className={`${classPrefix}-unCheckout`}
            />
          }
        >
          {
            getChannelList && getChannelList.map((item, index) => (
              <CheckList.Item
                key={item.id}
                value={`${item.payType}`}
                prefix={
                  <img
                    style={{ width: '23px', height: '23px' }}
                    src={Config.IMG_URL + item.icon}
                  />
                }
                isFromVlc={isFromVlc}
                onClick={() => handlePayItem(item, index)}
                className={`${classPrefix}-list-item ${classPrefix}-vlc-list-item`}
              >
                {item.name}
              </CheckList.Item>
            ))
          }
        </CheckList>

        {huabeiInfo && (
          <HuabeiModal
            visible={huabeiVisbile}
            info={huabeiInfo}
            onClose={handleHuabeiClose}
            onClickHuabeiPay={handleHuaBeiPay}
          />
        )}
      </div>
    )
  )
}

export default VlcPayList
