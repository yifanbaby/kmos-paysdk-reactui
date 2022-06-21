import { useState, useEffect } from 'react';

import { PaySdk } from '../../../index';

import { getToken } from '../../../utils/getToken';
import { getHostName } from '../../../utils/getHost';
import { getPassportAppId } from '../../../utils/getPassportAppId';

import { sensorsTrack } from '../../../utils/sensors';

import { setObjToUrlParams2 } from '../../../utils';

import {
  ApiCourseDetailResult,
  ApiDeskUrlResult,
  ApiGroupDetailResult,
  ApiOrderRightResult,
  ApiUserCourseIsBuyResult,
  ApiUserInfoResult,
  RightsItem,
} from '@kkb/kmos-paysdk-utils';

interface Props {
  courseCode: string;
  channelCode: string;
  sell?: string;
  parts?: string;
  setIsShowPayList: (value: boolean) => void;
  setRightSelect: (value: RightsItem) => void;
}

function useInit({
  courseCode,
  channelCode,
  sell,
  parts,
  setIsShowPayList,
  setRightSelect,
}: Props) {
  const [courseData, setcourseData] = useState<
    ApiCourseDetailResult | ApiGroupDetailResult | null
  >(null);
  const [userData, setUserData] = useState<ApiUserInfoResult | null>(null);
  const [rightData, setRightData] = useState<ApiOrderRightResult | null>(null);

  const [deskUrlData, setDeskUrlData] = useState<ApiDeskUrlResult | null>(null);

  useEffect(() => {
    const load = async () => {
      // 用户信息

      const urlRes = await PaySdk.getDeskUrl<ApiDeskUrlResult>({
        params: {
          courseCode,
          sceneType: 1,
        },
      });
      setDeskUrlData(urlRes);
      const tokenInfo = getToken();
      if (!tokenInfo && urlRes.loginUrl) {
        window.location.href = setObjToUrlParams2(urlRes.loginUrl, {
          redirect: location.href,
        });
      }
      const headers: Record<string, any> = {
        lpsAuthorization: `${tokenInfo}`,
      };
      const user = await PaySdk.getUserInfo<ApiUserInfoResult>({
        headers,
        params: {
          platForm: 'h5',
          appId: getPassportAppId(),
          appName: getHostName(),
        },
      });
      if (user && !user.openid) {
        user.openid = `channelParamsMB${user.mobile}`;
      }
      if (user && !user.unionid) {
        user.unionid = `channelParamsMB${user.mobile}`;
      }

      if(!user){
        window.location.href = setObjToUrlParams2(urlRes.loginUrl, {
          redirect: location.href,
        });
      }

      if (user) {
        setUserData(user);
        const buyRes =
          await PaySdk.getUserCourseIsBuy<ApiUserCourseIsBuyResult>({
            params: {
              userId: user.uid,
              type: sell === '1' ? 2 : 1,
              courseCode,
              parts,
            },
          });
        if (buyRes.status !== 0) {
          if (urlRes.successUrl) {
            window.location.href = `${urlRes.successUrl}?orderNo=${buyRes.no}`;
          } else {
            window.location.href = `${window.location.origin}/${urlRes.defaultSuccessUrl}?orderNo=${buyRes.no}`;
          }
        }

        // 课程详情
        const courseRes = await PaySdk.getCourseDetail<
          ApiCourseDetailResult | ApiGroupDetailResult
        >({
          params: {
            openid: user.openid,
            unionid: user.unionid,
            channelCode,
            courseCode,
            uid: `${user.uid}`,
            sell,
          },
        });
        if (
          courseRes?.amount === 0 ||
          (courseRes?.memberUser === 1 && courseRes?.vipAmount === 0)
        ) {
          setIsShowPayList(true);
        } else {
          setIsShowPayList(false);
        }
        setcourseData(courseRes);

        // 获取权益
        const resRight = await PaySdk.getOrderRights<ApiOrderRightResult>({
          params: {
            userId: user.uid,
            orderStrategy: sell === '1' ? 2 : 1,
            isVipUser: courseRes.memberUser,
            courseCode,
            channelCode,
          },
        });
        if (resRight && resRight.rightsAmountList.length > 0) {
          const { rightsAmountList } = resRight;
          const midui = rightsAmountList.findIndex((item) => item.code === 2);
          if (midui !== -1) {
            setIsShowPayList(false);
          } else {
            setIsShowPayList(true);
          }
          setRightSelect(resRight.rightsAmountList[0]);
        } else {
          setIsShowPayList(true);
          setRightSelect(resRight.baseAmount);

        }
        setRightData(resRight);

        // 埋点
        sensorsTrack({
          eventName: 'KMOS_payment_discount_pv',
          uid: user.uid,
          courseData: courseRes,
          sell,
        });
      }
    };
    load();
  }, []);
  return { userData, rightData, courseData, deskUrlData };
}

export default useInit;
