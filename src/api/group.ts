import axios from 'axios';
import { ResponseType } from 'types/common';
import { IStudy } from 'types/db';

const PREFIX_URL = '/groups';

/**
 * 참여중인 스터디 목록을 조회한다.
 */
export function getGroupList(id: number): Promise<{
  data: ResponseType<IStudy[]>;
}> {
  return axios.get(`${PREFIX_URL}/${id}`);
}
