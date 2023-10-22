import axios from 'axios';
import { ResponseType } from 'types/common';
import { IStudy } from 'types/db';

const PREFIX_URL = '/asks';

/**
 * 초대받은 스터디 목록을 조회한다.
 */
export function getAskGroupList(id: number): Promise<{
  data: ResponseType<IStudy[]>;
}> {
  return axios.get(`${PREFIX_URL}/${id}`);
}

/**
 * 초대받은 스터디를 수락한다.
 */
export function acceptAsk(
  groupId: number,
  userId: number,
): Promise<{
  data: ResponseType<never>;
}> {
  return axios.post(`${PREFIX_URL}/responses/${groupId}/${userId}`);
}

/**
 * 초대받은 스터디를 거절한다.
 */
export function rejectAsk(
  groupId: number,
  userId: number,
): Promise<{
  data: ResponseType<never>;
}> {
  return axios.patch(`${PREFIX_URL}/responses/${groupId}/${userId}`);
}
