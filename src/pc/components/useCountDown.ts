import {useEffect, useRef, useState } from 'react'
import { 
  PaySdk,
  ApiOrderDetailResult,
  ApiDeskUrlResult
 } from '@kkb/kmos-paysdk-utils'

const useCountDown =  (
  orderNo:string,
  deskUrlData?: ApiDeskUrlResult,
  initCount = 60,
  // callback = () => {}
) => {

  const [count, setcount] = useState<number>(initCount)

  // 使用useRef清除定时器
  const timeID = useRef<ReturnType<typeof setTimeout> | null>(null)

  const getPayResult = async () => {
    const data = await PaySdk.getOrderDetail<ApiOrderDetailResult>({
      params: {
        orderNo
      },
      // options: {}
    })
    if (data) {
      timeID.current && clearInterval(timeID.current)
      if (deskUrlData?.successUrl) {
        window.location.href = `${deskUrlData?.successUrl}`
      } else {
        window.location.href = `${window.location.origin}/${deskUrlData?.defaultSuccessUrl}?orderNo=${orderNo}`
      }
    }
  }

  // 设置启动函数
  const start = () => {
    // 清除定时器
    timeID.current && clearInterval(timeID.current)
    timeID.current = null
    // 设置倒计时时间
    setcount(initCount)
    // 开启定时器
    timeID.current = setInterval(() => {
      getPayResult()
      setcount((count) => count >= 1 ? count - 1 : 0)
    }, 1000)
  }

  // useEffect(() => {
  //   if (count === 0) {
  //     callback()
  //     timeID.current && clearInterval(timeID.current)
  //   }
  // }, [count, callback])

  // 组件销毁的钩子,避免意外销毁组件,而定时器却没停止
  useEffect(() => {
    return () => {
      timeID.current && clearInterval(timeID.current)
    }
  }, [])

  return {
    count,
    setcount,
    start
  }
}

export default useCountDown
