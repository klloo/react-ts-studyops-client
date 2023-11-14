import axios from 'axios';
import { ResponseType } from 'types/common';
import { IStudy, INewStudy } from 'types/db';

const PREFIX_URL = '/groups';
const INFO_PREFIX_URL = '/info';

/**
 * 참여중인 스터디 목록을 조회한다.
 */
export function getGroupList(id: number): Promise<{
  data: ResponseType<IStudy[]>;
}> {
  return axios.get(`${PREFIX_URL}/${id}`);
}

/**
 * 스터디 그룹을 생성한다.
 */
export function createGroup(
  id: number,
  group: INewStudy,
): Promise<{
  data: ResponseType<{ groupId: number }>;
}> {
  return axios.post(`${PREFIX_URL}/${id}`, group);
}

/**
 * 스터디 그룹 정보를 조회한다.
 */
export function getGroupInfo(id: number): Promise<{
  data: ResponseType<IStudy>;
}> {
  return axios.get(`${INFO_PREFIX_URL}/${id}`);
}
