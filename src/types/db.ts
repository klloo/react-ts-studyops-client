export interface ISchedule {
  dayWeek: string;
  startTime: string;
  finishTime: string;
}

export interface IStudy {
  groupId: number;
  host: boolean;
  headCount: number;
  name: string;
  intro: string;
  schedules: ISchedule[];
  hostName: string;
  hostProfileImageUrl: string | null;
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
  attendMemberList: { nickName: string; profileImage: string | null }[];
  absenceMemberList: { nickName: string; profileImage: string | null }[];
  isAttended: boolean;
}

export interface IPenaltyTotal {
  totalFine: number;
  account: string | null;
  settledPenalties: {
    nickName: string;
    profileImageUrl: string | null;
    penalty: number;
  }[];
  notSettledPenalties: {
    nickName: string;
    profileImageUrl: string | null;
    penalty: number;
  }[];
}

export interface IPenaltyMemberInfo {
  penaltyId: number;
  isSettled: boolean;
  nickName: string;
  profileImageUrl: string | null;
  lateTime?: number;
}

export interface IPenaltyInfo {
  absentMembers: Omit<IPenaltyMemberInfo, 'lateTime'>[];
  lateMembers: IPenaltyMemberInfo[];
  lateCost: number;
  absentCost: number;
}

export interface IAttendanceInfo {
  nickName: string;
  absentCount: number;
  lateCount: number;
}

export interface IPagingPostData<T> {
  studyPostDtoList: T[];
  total: number;
}

export interface IPost {
  postId: number;
  title: string;
  writer: string;
  contents: string;
  email: string;
  date: string;
  urls?: string[];
}

export interface ILoginUser {
  email: string;
  nickName: string;
  profileImageUrl: string | null;
}
