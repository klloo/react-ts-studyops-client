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

const dayStringNumMap: { [key: string]: number } = {
  일요일: 0,
  월요일: 1,
  화요일: 2,
  수요일: 3,
  목요일: 4,
  금요일: 5,
  토요일: 6,
};

export const getDayNum = (dayString: string): number => {
  return dayStringNumMap[dayString];
};
