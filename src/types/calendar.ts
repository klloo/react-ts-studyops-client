import dayjs from 'dayjs';

export interface IStudySchedule {
  day: string;
  time: string;
  title: string;
  studyId: number;
  attendance: boolean;
  startDate: string;
  color: string;
  finishDate?: string;
  studyIdx: number;
}

export interface IStudyCalendarProps {
  selectDate: dayjs.Dayjs;
  setSelectDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
  setSelectSchedules?: React.Dispatch<React.SetStateAction<IStudySchedule[]>>;
  schedules: IStudySchedule[];
}
