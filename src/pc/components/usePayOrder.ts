import {useState, useCallback} from "react";
import {
  PaySdk,
  PayAllProps,
  PCWxProps,
  PayOrderParams,
  h5WxProps,
  PayProps,
} from '@kkb/kmos-paysdk-utils'

interface PropsParams {
  start?: () => void,
  setLoading: (loading:boolean) => void
}

const usePayOrder = ({
  start,
  setLoading
}: PropsParams) => {

  const [getQRValue, setQRValue] = useState<string | undefined>(undefined)

  const getPayResponse = (res: object, payType: number) => {
    switch (payType) {
      case 1: // 微信
        res && setQRValue((res as PCWxProps).codeUrl )
        break
      case 5: // 信用卡分期
        res && setQRValue((res as h5WxProps).payUrl )
        break
      case 9: // 芝易学
        res && setQRValue((res as h5WxProps).payUrl )
        break
      case 16: // 京东支付
        res && setQRValue((res as PayProps).webUrl )
        break
      case 0: // 支付宝
        const url = (res as h5WxProps).payUrl
        setQRValue('')
        window.open(url)
        break
      default:
        ''
    }
  }

  const getPayOrder = useCallback(async (getPayOrderParams:PayOrderParams) => { // payType: PayTypeParams, orderNo
    if (getPayOrderParams?.orderNo) {
      const {payType} = getPayOrderParams
      // 支付二维码链接
        const data = await PaySdk.getPayorder<PayAllProps>({
          params: getPayOrderParams,
          options: {}
        })
        setLoading(false)
        getPayResponse(data, payType)
        start?.() // 启动定时器
    }
  }, [])

  return {
    getPayOrder,
    getQRValue
  }
}

export default usePayOrder
