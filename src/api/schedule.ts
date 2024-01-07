import axios from './config';
import { ResponseType } from 'types/common';

const PREFIX_URL = '/schedules';

/**
 * 스터디에 출석한다
 */
export function attendanceGroup(studyId: number): Promise<{
  data: ResponseType<boolean>;
}> {
  return axios.post(`${PREFIX_URL}/attendances/${studyId}`);
}

export function attendanceVoteGroup(
  studyId: number,
  date: string,
  attendance: boolean,
): Promise<{ data: ResponseType<boolean> }> {
  return axios.patch(
    `${PREFIX_URL}/attendances/${studyId}?date=${date}&attendance=${attendance}`,
  );
}
