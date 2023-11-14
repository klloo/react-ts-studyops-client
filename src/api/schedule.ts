import axios from 'axios';
import { ResponseType } from 'types/common';

const PREFIX_URL = '/schedules';

/**
 * 스터디에 출석한다
 */
export function attendanceGroup(
  studyId: number,
  userId: number,
): Promise<{
  data: ResponseType<boolean>;
}> {
  return axios.post(`${PREFIX_URL}/attendances/${studyId}/${userId}`);
}
