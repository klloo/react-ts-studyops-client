import CalendarBlock from 'components/CalendarBlock';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';
import { IStudySchedule } from 'types/calendar';
import {
  Title,
  NoSchedule,
  Content,
  Schedule,
  Container,
  ProfileImage,
  FlexWrapper,
  BoldText,
} from './style';
import { isEmpty } from 'lodash';
import { getDay, getScheduleColor } from 'utils/schedule';
import ScheduleDot from 'components/ScheduleDot';
import Switch from 'react-switch';
import { Profile, ProfileWrapper } from '../style';

/**
 * 스터디 상세화면의 일정 탭 내용
 */
function StudySchedule() {
  const [selectDate, setSelectDate] = useState(dayjs());
  const [schedules, setSchedules] = useState<IStudySchedule[]>([]);
  const [schedule, setSchedule] = useState<IStudySchedule | null>(null);

  useEffect(() => {
    if (!isEmpty(schedules) && schedules.length == 1) setSchedule(schedules[0]);
    else setSchedule(null);
  }, [schedules]);

  const tmpSchedules = [
    {
      day: '0',
      time: '14:00',
      title: '알고리즘 스터디',
      studyId: 3,
      attendance: true,
      startDate: '2023-09-11',
    },
    {
      day: '3',
      time: '14:00',
      title: '알고리즘 스터디',
      studyId: 3,
      attendance: true,
      startDate: '2023-09-11',
    },
  ];

  const onClickSwitch = useCallback(() => {
    setSchedule((prev) => {
      if (prev) {
        return { ...prev, attendance: !prev.attendance };
      }
      return prev;
    });
  }, []);

  return (
    <div>
      <CalendarBlock
        selectDate={selectDate}
        setSelectDate={setSelectDate}
        setSelectSchedules={setSchedules}
        schedules={tmpSchedules}
      >
        <Container>
          <Title>
            <h2>
              {dayjs(selectDate).format('YYYY년 M월 D일')} ({getDay(selectDate)}
              )
            </h2>
          </Title>
          <Content>
            {isEmpty(schedule) && (
              <NoSchedule>
                <div>스터디 일정이 없습니다.</div>
              </NoSchedule>
            )}
            {!isEmpty(schedule) && (
              <>
                <Schedule>
                  <div className="time">
                    <ScheduleDot color={getScheduleColor(schedule.studyId)} />
                    <div>{schedule.time}</div>
                  </div>
                  <div className="title">{schedule.title}</div>
                </Schedule>
                <FlexWrapper>
                  <BoldText>나의 참석 여부</BoldText>
                  <Switch
                    onChange={onClickSwitch}
                    checked={schedule.attendance}
                    checkedIcon={false}
                    uncheckedIcon={false}
                    width={40}
                    height={20}
                    onColor="#8d4bf6"
                    offColor="#d2d2d2"
                  />
                </FlexWrapper>
                <ProfileWrapper>
                  <Profile>
                    <ProfileImage
                      width="48"
                      height="48"
                      url="https://static.solved.ac/misc/360x360/default_profile.png"
                    >
                      <div>
                        <img src="/absent-mark.svg" alt="mark" />
                      </div>
                    </ProfileImage>
                    <div>이찬희</div>
                  </Profile>
                  <Profile>
                    <ProfileImage
                      width="48"
                      height="48"
                      url="https://static.solved.ac/misc/360x360/default_profile.png"
                    >
                      <div>
                        <img src="/attendance-mark.svg" alt="mark" />
                      </div>
                    </ProfileImage>
                    <div>이찬희</div>
                  </Profile>
                  <Profile>
                    <ProfileImage
                      width="48"
                      height="48"
                      url="https://static.solved.ac/misc/360x360/default_profile.png"
                    >
                      <div>
                        <img src="/attendance-mark.svg" alt="mark" />
                      </div>
                    </ProfileImage>
                    <div>이찬희</div>
                  </Profile>
                </ProfileWrapper>
              </>
            )}
          </Content>
        </Container>
      </CalendarBlock>
    </div>
  );
}

export default StudySchedule;
