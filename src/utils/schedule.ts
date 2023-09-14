const colors = [
  '#2c17eb',
  '#20b639',
  '#d9574b',
  '#4bb8d9',
  '#e56be7',
  '#c7cf59',
  '#a059cf',
  '#a7a7a7',
];

export const getScheduleColor = (studyId: number): string => {
  return colors[studyId % 8];
};
