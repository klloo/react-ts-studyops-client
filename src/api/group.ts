import axios from './config';
import { ResponseType } from 'types/common';
import { IStudy, INewStudy } from 'types/db';

const PREFIX_URL = '/groups';
const INFO_PREFIX_URL = '/info';

/**
 * 참여중인 스터디 목록을 조회한다.
 */
export function getGroupList(): Promise<{
  data: ResponseType<IStudy[]>;
}> {
  return axios.get(`${PREFIX_URL}`);
}

/**
 * 스터디 그룹을 생성한다.
 */
export function createGroup(group: INewStudy): Promise<{
  data: ResponseType<{ groupId: number }>;
}> {
  return axios.post(`${PREFIX_URL}`, group);
}

/**
 * 스터디 그룹 정보를 조회한다.
 */
export function getGroupInfo(id: number): Promise<{
  data: ResponseType<IStudy>;
}> {
  return axios.get(`${INFO_PREFIX_URL}/${id}`);
}

/**
 * 스터디 납부 계좌 정보를 수정한다.
 */
export function modifyAccount(
  id: number,
  account: string,
): Promise<{
  data: ResponseType<boolean>;
}> {
  return axios.patch(`${INFO_PREFIX_URL}/accounts/${id}`, { account });
}

/**
 * 스터디 규칙 정보를 수정한다.
 */
export function modifyRules(
  id: number,
  rule: string,
): Promise<{
  data: ResponseType<boolean>;
}> {
  return axios.patch(`${INFO_PREFIX_URL}/rules/${id}`, { rule });
}

/**
 * 스터디 소개를 수정한다.
 */
export function modifyIntro(
  id: number,
  intro: string,
): Promise<{
  data: ResponseType<boolean>;
}> {
  return axios.patch(`${INFO_PREFIX_URL}/intro/${id}`, { intro });
}
