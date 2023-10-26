import dayjs from 'dayjs';

const colors = [
  '#F8D457',
  '#F1A23E',
  '#EE97A4',
  '#D5D769',
  '#81C7BA',
  '#5DA7EF',
  '#859FC1',
  '#B282CC',
];

/**
 * TODO: 수정 필요
 */
export const getScheduleColor = (studyId: number): string => {
  return colors[studyId % 8];
};

const days = ['일', '월', '화', '수', '목', '금', '토'];

export const getDay = (date: dayjs.Dayjs): string => {
  const index = parseInt(date.format('d'));
  return days[index];
};

/**
 * api 응답으로 요일이 월요일 화요일 이런 형식으로 와서 이걸 숫자로 바꿔주거나 숫자를 저런 형식에 맞게 바꿔주는 아이들
 */
const dayStringNumMap: { [key: string]: number } = {
  일요일: 0,
  월요일: 1,
  화요일: 2,
  수요일: 3,
  목요일: 4,
  금요일: 5,
  토요일: 6,
};

const dayNumStringMap: { [key: number]: string } = {
  0: '일요일',
  1: '월요일',
  2: '화요일',
  3: '수요일',
  4: '목요일',
  5: '금요일',
  6: '토요일',
};

export const getDayNum = (dayString: string): number => {
  return dayStringNumMap[dayString];
};

export const getDayString = (dayString: number): string => {
  return dayNumStringMap[dayString];
};

/**
 * hh:mm 형태의 시간을 비교한다
 * @param timeStr1
 * @param timeStr2
 * @returns 0: 같음, 양수: 1이 큼, 음수: 2가 큼
 */
export const compareTime = (timeStr1: string, timeStr2: string): number => {
  const [hour1, minute1] = timeStr1.split(':').map(Number);
  const [hour2, minute2] = timeStr2.split(':').map(Number);
  if (hour1 - hour2 !== 0) return hour1 - hour2;
  return minute1 - minute2;
};
