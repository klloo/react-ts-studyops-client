import axios from 'axios';
import { ResponseType } from 'types/common';

const PREFIX_URL = '/penalty';

/**
 * penaltyId에 해당하는 벌금을 면제한다.
 */
export function exemptPenalty(penaltyId: number): Promise<{
  data: ResponseType<boolean>;
}> {
  return axios.patch(`${PREFIX_URL}/exemption/${penaltyId}`);
}

/**
 * penaltyId에 해당하는 벌금을 정산한다.
 */
export function settlePenalty(penaltyId: number): Promise<{
  data: ResponseType<boolean>;
}> {
  return axios.patch(`${PREFIX_URL}/${penaltyId}`);
}

/**
 * 벌금을 일괄로 정산한다.
 */
export function batchSettle(penalties: number[]): Promise<{
  data: ResponseType<boolean>;
}> {
  return axios.patch(`${PREFIX_URL}`, { penalties });
}
