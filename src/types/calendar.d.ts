export interface MiniCalendarProps {
  selectDate: dayjs.Dayjs;
  setSelectDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
  setSelectSchedules?: React.Dispatch<React.SetStateAction<StudySchedule[]>>;
  schedules: StudySchedule[];
}
