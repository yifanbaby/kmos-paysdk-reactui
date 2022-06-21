import * as React from 'react';
import PayCashier from '../../../src/Vlc/PayCashierLivePlay'
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

  const handleSuccess = (data) => {
    console.log(data, 'data')
  }

  const handleCancel = () => {
    // 取消支付
  }

  const startRun = () => {
    setVisible(true)
    // setTimeout(() => {
    //   console.log('挂壁')
    //   handleModal()
    // }, 5000)
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

  return (
    <>
      <button onClick={startRun}>开始加载</button>
      <button onClick={startRun2}>开始加载2</button>
      {/* <button onClick={handleModal}>重新加载1</button> */}
      <PayCashier
        visible={visible}
        appid={'wxf47dff26f5a918f7'}
        openid={'o0IXit2_j575969Coiy-cZVwIqPU'}
        unionid={'ocPQA1VcrMOXhlqk2tPZvdlGgCK8'}
        opendPayChannel={true}
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
        onSuccess={handleSuccess}
        wxPayConsole={handleCancel}
        onClose={handleModal}
      />
    </>
  )
}

export default payCashier
