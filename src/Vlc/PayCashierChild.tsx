import React, { useState, useEffect } from 'react';
import VlcPayList from './PayList';
import Modal from '../components/modal'
import { PaySdk, PayType, ApiPayWayListResult, PayChannel, VlcSuccessCallbackResult} from '@kkb/kmos-paysdk-utils';
import { usePayOrder } from '../components/payList/hooks/usePayOrder'
import { VlcSensorsTrack } from '../utils/sensors'
// import { getPayChannelList } from './consts/index'
interface PayCashierChildProps {
  visible: boolean;
  goodsType: string;
  mode?: 'left' | 'bottom';
  courseCode: string;
  amount: number | undefined;
  openid: string;
  unionid: string;
  userId: number;
  orderType?: number | undefined;
  orderNo: string | undefined;
  openPayChannel?: boolean,
  onSuccessVlcPay?: (result: VlcSuccessCallbackResult) => void;
  onCancelVlcPay?: () => void;
  onCloseModal?: () => void;
}

const PayCashierChild:React.FC<PayCashierChildProps> = (props) => {

  const {
    visible,
    goodsType,
    mode,
    orderType,
    courseCode,
    amount,
    openid,
    unionid,
    userId,
    orderNo,
    openPayChannel,
    onSuccessVlcPay,
    onCancelVlcPay,
    onCloseModal
  } = props

  const [visibleModal, setVisibleModal] = useState<boolean>(false)
  const [payChannelList, setPayChannelList] = useState<PayChannel[] | null>(null)

  const getPayList = async () => { // 获取支付方式列表
    const payWayData = await PaySdk.getPayWayList<ApiPayWayListResult>({
      params: {
        courseCode,
        plantForm: 'h5',
        amount
      }
    })
    setPayChannelList(payWayData.payChannel)
  }

  const getChannelList = () => { // 获取支付方式列表
    if (goodsType === 'matter') {
      setPayChannelList([{
        cls: "wechat-pay",
        code: "WECHAT",
        emiAmounts: null,
        icon: "pay_wechat73108192700202vvdu.png",
        id: 2,
        name: "微信",
        online: 1,
        payType: 1,
        sort: 1,
        status: null
      }, {
        cls: "apli-pay",
        code: "ALIPAY",
        emiAmounts: null,
        icon: "pay_apli80957192700202wchx.png",
        id: 1,
        name: "支付宝",
        online: 1,
        payType: 0,
        sort: 2,
        status: null
      }])
    } else {
      getPayList()
    }
  }

  const onCloseWxPay = () => {
    // 取消微信支付
    orderNo && getChannelList()
    setVisibleModal(true)
    onCancelVlcPay?.()
  }

  const { parOrderFn } = usePayOrder({
    orderNo,
    openid,
    unionid,
    userId,
    onSuccessVlcPay,
    onCloseWxPay,
    isFromVlc: true,
    goodsType,
    env: PaySdk.getEnv(),
    onCloseModal,
  })

  // const closePayWechat = () => {
  //   orderNo && getChannelList()
  //   setVisibleModal(true)
  // }

  const handlePayWay = (item:PayChannel) => {
    // 点击支付方式
    VlcSensorsTrack({
      eventName: 'KMOS_payment_paymenttype_list_clk',
      uid: userId,
      payType: item.payType
    })
    parOrderFn(item.payType)
  }

  const handleHuaBeiPayWay = (item: {
    payType: PayType,
    emi: number
  }) => {
    // 花呗分期支付
    item && parOrderFn(item.payType, item.emi)
  }

  const handleCloseModal = () => {
    // 关闭modal
    setVisibleModal(false)
    onCloseModal?.()
  }

  useEffect(() => {
    // 创建订单 response orderType 为0 为0元订单
    if (visible) {
      if (orderType === 0) {
        onCloseModal?.()
        onSuccessVlcPay?.({
          code: 1,
          data: {
            orderNo,
            goodsType
          }
        })
      } else {
        if (openPayChannel) { // 直接打开支付方式弹框
          orderNo && getChannelList()
          setVisibleModal(true)
          return
        }
        // 直接调取微信支付
        parOrderFn(1)
        VlcSensorsTrack({
          eventName: 'KMOS_payment_paymenttype_wx_call',
          uid: userId
        })
      }
    } else {
      setVisibleModal(false)
    }
  }, [visible])

  return (
    <>
      {/* <button onClick={closePayWechat}>关闭</button> */}
      {
        visibleModal && payChannelList &&
        <Modal
          visible={visibleModal}
          onClose={handleCloseModal}
          title={'请选择支付方式'}
          mode={mode}
        >
          <VlcPayList
            getChannelList={payChannelList}
            onClickPayWay={handlePayWay}
            onClickHuaBeiPay={handleHuaBeiPayWay}
            isFromVlc={true}
          />
        </Modal>
      }
    </>
  )
}

export default PayCashierChild
