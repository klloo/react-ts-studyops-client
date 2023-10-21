import dayjs from 'dayjs';

const colors = [
  '#2c17eb',
  '#20b639',
  '#d9574b',
  '#8EF9D5',
  '#FEA0C7',
  '#c7cf59',
  '#a059cf',
  '#a7a7a7',
];

export const getScheduleColor = (studyId: number): string => {
  return colors[studyId % 8];
};

const days = ['일', '월', '화', '수', '목', '금', '토'];

export const getDay = (date: dayjs.Dayjs): string => {
  const index = parseInt(date.format('d'));
  return days[index];
};
