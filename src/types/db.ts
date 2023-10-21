export interface IStudy {
  groupId: number;
  name: string;
  intro: string;
  schedules: {
    dayWeek: string;
    startTime: string;
    finishTime: string;
  }[];
  hostName: string;
  hostStatus: boolean;
  headCount: number;
  absenceCost: number;
  lateCost: number;
  startDate: string;
}
