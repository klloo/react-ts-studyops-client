export interface ISchedule {
  dayWeek: string;
  startTime: string;
  finishTime: string;
}

export interface IStudy {
  groupId: number;
  hostStatus: boolean;
  headCount: number;
  name: string;
  intro: string;
  schedules: ISchedule[];
  hostName: string;
  absenceCost: number;
  lateCost: number;
  startDate: string;
  rule?: string;
  allowedTime?: number;
  members?: string[];
}

export interface INewStudy {
  name: string;
  intro: string;
  schedules: ISchedule[];
  hostName: string;
  absenceCost: number;
  lateCost: number;
  startDate: string;
  rule: string;
  allowedTime: number;
  invitees: string[];
}

export interface ITodayStudy {
  isStudyDay: boolean;
  isAttendant?: boolean;
  isLate?: boolean;
  lateTime?: number;
  startTime?: string;
  finishTime?: string;
  attendanceTime?: string;
}
