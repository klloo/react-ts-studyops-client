import axios from 'axios';
import { ResponseType } from 'types/common';
import { IStudy, INewStudy } from 'types/db';

const PREFIX_URL = '/groups';

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
  data: ResponseType<{ postId: number }>;
}> {
  return axios.post(`${PREFIX_URL}/${id}`, group);
}
