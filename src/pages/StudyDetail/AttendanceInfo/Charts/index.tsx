import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import accessibility from 'highcharts/modules/accessibility';
import { IAttendanceInfo, IPenaltyTotal } from 'types/db';
import { GRAPH_MODE } from 'utils/constants';

accessibility(Highcharts);

function Charts({
  penaltyInfo,
  attendanceInfo,
  graphMode,
}: {
  penaltyInfo: IPenaltyTotal;
  attendanceInfo: IAttendanceInfo[];
  graphMode: string;
}) {
  const [penaltySeries, setPenaltySeries] = useState<
    {
      name: string;
      data: number[];
      color: string;
    }[]
  >([]);
  const [penaltyOptions, setPenaltyOptions] = useState({});
  const [attendanceSeries, setAttendanceSeries] = useState<
    {
      name: string;
      data: number[];
      color: string;
    }[]
  >([]);
  const [attendanceOptions, setAttendanceOptions] = useState({});

  useEffect(() => {
    if (!penaltyInfo) return;
    setPenaltySeries([
      {
        name: 'Penalty',
        data: penaltyInfo.settledPenalties.map(
          (item: { nickName: string; penalty: number }) => item.penalty || 0,
        ),
        color: '#8D4BF6',
      },
    ]);
    if (!attendanceInfo) return;
    setAttendanceSeries([
      {
        name: '결석',
        data: attendanceInfo.map(
          (item: IAttendanceInfo) => item.absentCount || 0,
        ),
        color: '#EE97A4',
      },
      {
        name: '지각',
        data: attendanceInfo.map(
          (item: IAttendanceInfo) => item.lateCount || 0,
        ),
        color: '#F8D457',
      },
    ]);
  }, [penaltyInfo, attendanceInfo, graphMode]);

  useEffect(() => {
    if (isEmpty(penaltySeries) || !penaltyInfo) return;
    const users = penaltyInfo.settledPenalties.map(
      (item: { nickName: string; penalty: number }) => item.nickName,
    );
    setPenaltyOptions({
      credits: {
        enabled: false, // 로고 비활성화
      },
      legend: {
        enabled: false,
      },
      chart: {
        type: 'column',
      },
      title: {
        text: '',
        align: 'left',
      },
      xAxis: {
        categories: users,
        labels: {
          style: {
            fontSize: '1rem', // 폰트 크기 설정
          },
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: '',
        },
        minTickInterval: 1000, // 최소 간격
      },
      tooltip: {
        headerFormat: '<b>{point.x}</b> ',
        pointFormat: '<br/><b>{point.y} 원</b>',
      },
      plotOptions: {
        series: {
          states: {
            hover: {
              enabled: false, // 마우스 오버 시 효과 제거
            },
          },
        },
      },
      series: penaltySeries,
    });

    if (isEmpty(attendanceSeries) || !attendanceInfo) return;
    const attendUsers = attendanceInfo.map(
      (item: IAttendanceInfo) => item.nickName,
    );
    setAttendanceOptions({
      credits: {
        enabled: false, // 로고 비활성화
      },
      legend: {
        enabled: false,
      },
      chart: {
        type: 'column',
      },
      title: {
        text: '',
        align: 'left',
      },
      xAxis: {
        categories: attendUsers,
        labels: {
          style: {
            fontSize: '1rem', // 폰트 크기 설정
          },
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: '',
        },
        minTickInterval: 1, // 최소 간격
      },
      tooltip: {
        headerFormat: '<b>{point.x}</b> ',
        pointFormat: '<br/>{series.name} <b>{point.y} 회</b>',
      },
      plotOptions: {
        series: {
          states: {
            hover: {
              enabled: false, // 마우스 오버 시 효과 제거
            },
          },
        },
      },
      series: attendanceSeries,
    });
  }, [penaltySeries, penaltyInfo, attendanceSeries, attendanceInfo]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={
        graphMode === GRAPH_MODE.PENALTY ? penaltyOptions : attendanceOptions
      }
    />
  );
}

export default Charts;
