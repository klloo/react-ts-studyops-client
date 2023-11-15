import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import accessibility from 'highcharts/modules/accessibility';
import { IFineTotal } from 'types/db';

accessibility(Highcharts);

function Statistics({ fineInfo }: { fineInfo: IFineTotal }) {
  const [series, setSeries] = useState<
    {
      name: string;
      data: number[];
      color: string;
    }[]
  >([]);
  const [options, setOptions] = useState({});

  useEffect(() => {
    if (!fineInfo) return;
    setSeries([
      {
        name: 'Penalty',
        data: fineInfo.settledPenalties.map(
          (item: { name: string; penalty: number }) => item.penalty || 0,
        ),
        color: '#8D4BF6',
      },
    ]);
  }, [fineInfo]);

  useEffect(() => {
    if (isEmpty(series) || !fineInfo) return;
    const users = fineInfo.settledPenalties.map(
      (item: { name: string; penalty: number }) => item.name,
    );
    setOptions({
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
      series: series,
    });
  }, [series, fineInfo]);

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export default Statistics;
