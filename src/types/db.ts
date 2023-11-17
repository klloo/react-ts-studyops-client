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

export interface IStudyScheduleInfo {
  schedules: ISchedule[];
  startDate: string;
}

export interface IAttendance {
  attendMemberList: string[];
  absenceMemberList: string[];
  isAttended: boolean;
}

export interface IFineTotal {
  totalFine: number;
  account: string | null;
  settledPenalties: {
    name: string;
    penalty: number;
  }[];
  notSettledPenalties: {
    name: string;
    penalty: number;
  }[];
}

export interface IPenaltyMemberInfo {
  penaltyId: number;
  isSettled: boolean;
  name: string;
  lateTime?: number;
}

export interface IPenaltyInfo {
  absentMembers: Omit<IPenaltyMemberInfo, 'lateTime'>[];
  lateMembers: IPenaltyMemberInfo[];
  lateCost: number;
  absentCost: number;
}
