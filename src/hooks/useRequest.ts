import { toast } from 'react-toastify';
import { ResponseType } from 'types/common';

const useRequest = <T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  axiosRequest: (...params: any) => Promise<{ data: ResponseType<T> }>, // axios 함수
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const requestData = (...params: any) => {
    return new Promise(async (resolve: (value: T) => void, reject) => {
      try {
        const res = await axiosRequest(...params);
        const { data } = res;
        if (data.isSuccess) {
          if (data.data) {
            resolve(data.data);
          } else {
            // 응답받는 데이터가 없을경우 결과 전송.
            // 응답받는 데이터가 없는 api의 경우 T를 boolean으로 지정해줘야한다,,.
            resolve(data.isSuccess as T);
          }
        } else {
          toast.error('서비스에 오류가 발생하였습니다.');
        }
      } catch (e) {
        reject(e);
      }
    });
  };

  return requestData;
  // 데이터 요청 Promise
};

export default useRequest;
