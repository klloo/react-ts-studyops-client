import axios from './config';
import { ResponseType } from 'types/common';

const PREFIX_URL = '/posts';

/**
 * 스터디 게시글을 생성한다.
 */
export function createPost(
  groupId: number,
  formData: FormData,
): Promise<{
  data: ResponseType<boolean>;
}> {
  return axios.post(`${PREFIX_URL}/${groupId}`, formData);
}

/**
 * 스터디 게시글을 삭제한다.
 */
export function deletePost(postId: number): Promise<{
  data: ResponseType<boolean>;
}> {
  return axios.delete(`${PREFIX_URL}/specific/${postId}`);
}
