import axios from './config';
import { ResponseType } from 'types/common';
import { IStudy } from 'types/db';

const PREFIX_URL = '/asks';

/**
 * 초대받은 스터디 목록을 조회한다.
 */
export function getAskGroupList(): Promise<{
  data: ResponseType<IStudy[]>;
}> {
  return axios.get(`${PREFIX_URL}`);
}

/**
 * 초대받은 스터디를 수락한다.
 */
export function acceptAsk(groupId: number): Promise<{
  data: ResponseType<never>;
}> {
  return axios.post(`${PREFIX_URL}/responses/${groupId}`);
}

/**
 * 초대받은 스터디를 거절한다.
 */
export function rejectAsk(groupId: number): Promise<{
  data: ResponseType<never>;
}> {
  return axios.patch(`${PREFIX_URL}/responses/${groupId}`);
}

/**
 * 닉네임으로 스터디원을 초대한다.
 */
export function inviteMembers(
  groupId: number,
  invitees: string,
): Promise<{
  data: ResponseType<never>;
}> {
  return axios.post(`${PREFIX_URL}/${groupId}`, { invitees });
}
