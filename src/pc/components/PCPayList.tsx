import React, {useState, useEffect, useMemo} from 'react';
import QRCode from 'qrcode.react'
import useCountDown from './useCountDown'
import usePayOrder from './usePayOrder'
import './PCPayList.less'
import {
  PaySdk,
  ApiCourseDetailResult,
  ApiGroupDetailResult,
  ApiPayWayListResult,
  CreateOrderParams,
  ApiCreateOrderResult,
  PayType as PayTypeParams,
  ApiDeskUrlResult
} from '@kkb/kmos-paysdk-utils'
import {Config} from '../../enum/configEnum'
import {getAppId} from '../../utils/getAppId'

export interface PCPayProps {
  orderNo: string,
  userId: number,
  openid: string,
  appid: string,
  unionid: string,
  mobile: string,
  channelCode: string,
  courseCode: string,
  sell?: string | undefined,
  checkedRightsCode: 0 | 1 | 2 | undefined,
  amount?: number,
  deskUrlData?: ApiDeskUrlResult
}

interface ChannelType {
  id: number,
  code: string,
  cls: string,
  icon: string,
  name: string,
  payType: PayTypeParams,
  sort: number
}

export interface DefineCreateOrder {
  code: number,
  data: ApiCreateOrderResult,
  msg: string
}

const PCPayList: React.FC<PCPayProps> = (props) => {

  const {userId, openid, unionid, appid, mobile, courseCode, channelCode, orderNo, sell, checkedRightsCode, amount, deskUrlData} = props

  const [getOrderNo, setOrderNo] = useState<string>(orderNo)
  const [classInfo, setClassInfo] = useState<ApiCourseDetailResult | ApiGroupDetailResult | null>(null)
  const [channelList, setChannelList] = useState<ChannelType[]>([])
  const [payType, setPayType] = useState<PayTypeParams>(0)
  const [loading, setLoading] = useState<boolean>(true)

  const getSell = useMemo(() => { // getSell 值为2为组合商品
    // 是否是组合商品 1为组合商品 来源于组件传的
    return sell && Number(sell) === 1 ? 2 : 1
  }, [sell])

  const getPayOrderParams = useMemo(() => { // 获取支付url参数
    if (getSell === 2) { // 组合商品
      return { 
        openid,
        orderNo: getOrderNo,
        payType: payType,
        unionid,
        parts: '',
        userId,
        endpoint: 'PC',
        sell: getSell === 2 ? 1 : 2
      }
    }
    // 普通商品 sell
    return {
      openid,
      orderNo: getOrderNo,
      payType: payType,
    }
  }, [])

  const createOrder = async () => { // 创建订单 type: PayTypeParams
    const params:CreateOrderParams = {
      courseCode,
      channelCode,
      openid,
      unionid,
      user_id:userId,
      appid: appid ? appid : getAppId(),
      // appOpenid: openid ? openid : `channelParamsMB${mobile}`,
      appOpenid: appid ? appid : getAppId(),
      passback_params: '{}',
      mobile,
      buyerId: userId,
      orderStrategy: getSell,
      returnUrl: '',
      endpoint: 'PC',
      isVipUser: classInfo?.memberUser === 1 ? true : false,
      checkedRightsCode
    }
    const {code, data} = await PaySdk.postCreateOrder<DefineCreateOrder>({
      params: params,
      options: {
        isTransformRequestResult: false
      }
    })
    if (code === 0) {
      if (data?.orderNo) {
        setOrderNo(data.orderNo)
        getPayOrder({...getPayOrderParams, orderNo: data.orderNo})
      }
    } else {
      if (deskUrlData) {
        window.location.href = `${deskUrlData.failedUrl}`
      }
    }
  }

  const {
    count,
    start
  } = useCountDown(getOrderNo, deskUrlData)

  const {
    getPayOrder,
    getQRValue,
  } = usePayOrder({start, setLoading})

  const getClassInfo = async () => {
    // 课程详情
    const courseData = await PaySdk.getCourseDetail<ApiCourseDetailResult | ApiGroupDetailResult>({
      params: {
        openid,
        unionid,
        uid: `${userId}`,
        channelCode,
        courseCode,
        sell
      },
      options: {}
    })
    setClassInfo(courseData)
    window.$sensors.track('KMOS_payment_paymenttype_pv', {
      platform_type: 'Web',
      uid: userId,
      course_id: getSell === 2 ? (courseData as ApiGroupDetailResult).id : (courseData as ApiCourseDetailResult).courseId,
      course_name: getSell === 2 ? (courseData as ApiGroupDetailResult).name : (courseData as ApiCourseDetailResult).courseName,
      course_type: getSell === 2 ? '' : (courseData as ApiCourseDetailResult).courseType
    })
  }

  const getChannelData = (channelObj:ApiPayWayListResult) => {
    const payChannel = channelObj.payChannel
    setChannelList(payChannel)
    if (payChannel.length > 0) {
      const payChannelFirst = payChannel[0].payType
      const payType = payChannel.length > 1 && payChannelFirst === 0 ? payChannel[1].payType : payChannelFirst
      setPayType(payType)
      if (getOrderNo && getOrderNo !== undefined) { // props 入参orderNo
        getPayOrder({...getPayOrderParams, payType})
        return
      }
      // props 未传orderNo
      createOrder()
    }
  }

  const payWapParams = useMemo(() => {
    if (getSell === 2) {
      return {
        no: getOrderNo,
        openid,
        plantForm: 'pc',
        amount
      }
    }
    return {
      courseCode,
      plantForm: 'pc',
      amount
    }
  }, [])

  const getPayWayList = async () => {
    // 获取支付方式列表
    const res = await PaySdk.getPayWayList<ApiPayWayListResult>({
      params: payWapParams
    })
    res && getChannelData(res)
  }
  

  useEffect(() => {
    getClassInfo()
    getPayWayList() // 支付方式列表
  }, [])

  const handlePayType = (type: PayTypeParams, name: string) => {
    // 选择不同的支付方式
    window.$sensors.track('KMOS_payment_paymenttype_list_clk', {
      platform_type: 'Web',
      uid: userId,
      course_id: getSell === 2 ? (classInfo as ApiGroupDetailResult).id : (classInfo as ApiCourseDetailResult).courseId,
      course_name: getSell === 2 ? (classInfo as ApiGroupDetailResult).name : (classInfo as ApiCourseDetailResult).courseName,
      course_type: getSell === 2 ? '' : (classInfo as ApiCourseDetailResult).courseType,
      pay_type: name
    })
    setLoading(true)
    setPayType(type)
    const orderNo = props.orderNo && props.orderNo !== undefined ? props.orderNo : getOrderNo
    getPayOrder({...getPayOrderParams, payType: type, orderNo})
  }

  const rereshClick = () => {
    start()
  }

  return (
    <>
      <div className="pay-container">
        <p className="pay-title">支付方式</p>
        <div className="pay-content"
          // style={{alignItems: payType === 0 ? 'center' : 'inherit'}}
        >
          <div className="pay-list">
            <ul className="pay-type-list">
              {
                channelList.map(item => (
                  <li key={item.id} onClick={() => handlePayType(item.payType, item.name)} className={`${payType === item.payType ? 'active' : ''}`}>
                    {
                      <img className="checked-icon" src={
                        payType === item.payType ? `${Config.IMG_URL}/pay-sdk/33717102102202gtej.png` : `${Config.IMG_URL}/pay-sdk/85817102102202wssg.png`
                      }/>
                    }
                    <img className="pay-icon" src={`${Config.IMG_URL}/${item?.icon}`} />
                    <span>{item.name}</span>
                  </li>
                ))
              }
            </ul>
          </div>
          <div className="pay-wechat"
            // style={{paddingBottom: channelList.length <= 4 ? '30px' : 0}}
          >
            { payType > 0 &&
              <div className="wechat-container">
                <p>请扫描下方二维码完成支付</p>
                <div className="wechat-wrapper">
                  {
                    getQRValue && <QRCode
                      id="qrCode"
                      value={getQRValue}
                      size={135}
                      style={{
                        // borderWidth: 3,
                        // borderColor: '#eee',
                        // borderStyle: 'solid',
                        // borderRadius: 10
                        filter: count === 0 ? 'blur(3px)' : ''
                      }}
                    />
                  }
                  {/* { count === 0 && <div className="pay-modal"></div>} */}
                </div>
                {
                  count > 0 &&
                  <>
                    <p>距二维码过期还有<span>{count}</span>s</p>
                    {/* <p className="refresh-btn">刷新</p> */}
                  </>
                }
                { count === 0 &&
                  <p>二维码已过期，请刷新</p>
                }
                <p className="refresh-btn" onClick={rereshClick}>刷新</p>
              </div>
            }
            { payType === 0 &&
              <div className="apply-close">
                <p className="apply-title">请在新打开的页面上完成付款</p>
                <p>付款完成前不要关闭此窗口，付款完成后页面自动刷新</p>
              </div>
            }
          </div>
        </div>
      </div>
      { loading &&
        <div className="loading">
          <img src="https://img.kaikeba.com/pay-sdk/43905101202202upyl.gif" />
        </div>}
    </>
  )
}

export default PCPayList
