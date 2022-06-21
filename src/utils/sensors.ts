import {
  ApiCourseDetailResult,
  ApiGroupDetailResult,
  PayType,
} from '@kkb/kmos-paysdk-utils';

interface TrackProps {
  eventName: string;
  uid?: number | null;
  courseData?: ApiCourseDetailResult | ApiGroupDetailResult | null;
  sell?: string;
  payType?: PayType | null;
}

// window.sensors=sensors

export const sensorsTrack = ({
  eventName,
  uid,
  courseData,
  sell,
  payType,
}: TrackProps) => {
  window.$sensors &&
    window.$sensors.track(eventName, {
      platform_type: 'H5',
      uid,
      course_id:
        sell === '1'
          ? courseData
            ? (courseData as ApiGroupDetailResult)?.id
            : ''
          : courseData
          ? (courseData as ApiCourseDetailResult)?.courseId
          : '',
      course_name:
        sell === '1'
          ? courseData?(courseData as ApiGroupDetailResult)?.name:''
          : courseData?(courseData as ApiCourseDetailResult)?.courseName:'',
      course_type:
        sell === '1'
          ? courseData?(courseData as ApiGroupDetailResult)?.type:''
          : courseData?(courseData as ApiCourseDetailResult)?.courseType:'',
      pay_type: payType,
    });
};


interface VlcTrackProps {
  eventName: string;
  uid?: number | null;
  courseId?: number | null;
  payType?: PayType | null;
  environment?: string | null;
}

export const VlcSensorsTrack = ({
  eventName,
  uid,
  courseId,
  payType,
  environment
}: VlcTrackProps) => {
  window.$sensors && window.$sensors.track(
    eventName,
    {
      platform_type: 'Vlc',
      uid,
      course_id: courseId,
      pay_type: payType,
      environment
    }
  )
}
