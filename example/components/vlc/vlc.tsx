import * as React from 'react';
// import PayCashier from '../../../src/Vlc/PayCashierLivePlay'
import VlcPayCashier from '../../../src/Vlc/index'
// import { PaySdk } from '@kkb/kmos-paysdk-utils'

interface CourseType {
  courseCode: string;
  channelCode: string;
}

const payCashier = () => {

  const [visible, setVisible] = React.useState<boolean | undefined>(false)
  const [getCourse, setCourse] = React.useState<CourseType>({
    courseCode: '6dkaphu0hu',
    channelCode: 'ktfcedqarf'
  })

  const [goodsType, setGoodsType] = React.useState<string>('virtual')

  const handleSuccess = (data) => {
    console.log(data, 'data')
  }

  const handleCancel = () => {
    // 取消支付
  }

  const startRun = () => {
    setVisible(true)
    setGoodsType('virtual')
    // setTimeout(() => {
    //   console.log('挂壁')
    //   handleModal()
    // }, 5000)
  }
  const handleMatter = () => {
    setVisible(true)
    setGoodsType('matter')
  }

  const startRun2 = () => {
    setVisible(true)
    setCourse({
      courseCode: 'b889gxbbvt',
      channelCode: 'cwr57e4obz'
    })
  }

  // const reloadRun = () => {
  //   setVisible(false)
  // }

  const handleModal = () => {
    console.log('222')
    setVisible(false)
    // setVisible(false)
  }

  const handleError = (data) => {
    console.log(data, 'data')
  }

  const onGoodsType = (type) => {
    console.log(type, 'goodsType')
  }

  const getRecvInfo = React.useMemo(() => {
    return {
      receiverName: "测试debuonce1",
      receiverMobile: "13888888888",
      provinceAreaCode: "140000",
      provinceAreaName: "山西省",
      cityAreaCode: "140200",
      cityAreaName: "大同市",
      districtAreaCode: "140201",
      districtAreaName: "市辖区",
      detailAddress: "111-a-1-1-1-1-1aaa",
      // postalCode: null
    }
  }, [])

  return (
    <>
      <button onClick={startRun}>开始加载虚拟商品</button>
      <button onClick={handleMatter}>开始加载实物商品</button>
      <button onClick={startRun2}>开始加载2</button>
      {/* <button onClick={handleModal}>重新加载1</button> */}
      { visible && <VlcPayCashier
        visible={visible}
        goodsType={goodsType}
        appid={'wxf47dff26f5a918f7'}
        openid={'o0IXit2_j575969Coiy-cZVwIqPU'}
        unionid={'ocPQA1VcrMOXhlqk2tPZvdlGgCK8'}
        openPayChannel={true}
        payableAmount={0.03}
        orderItems={
          [{
            productId: 10,
            quantity: 1,
            channelCode: 'kkb_6'
          }]
        }
        recvInfo={getRecvInfo}
        // courseCode={'smmblx4iax'} // 1元已买过
        // channelCode={'16lw7zs92l'}
        // courseCode={'b889gxbbvt'}
        // channelCode={'cwr57e4obz'}
        // courseCode={'4uddffs0iy'} // 0元课 购买过
        // channelCode={'platovxoci'}
        // courseCode={'6dkaphu0hu'} // 有花呗分期
        // channelCode={'ktfcedqarf'}
        courseCode={getCourse.courseCode}
        channelCode={getCourse.channelCode}
        userId={10190212}
        mobile={'13699104154'}
        onError={handleError}
        // onSuccess={handleSuccess}
        // wxPayConsole={handleCancel}
        onClose={handleModal}
        onGoodsType={onGoodsType}
      />
      }
    </>
  )
}

export default payCashier
