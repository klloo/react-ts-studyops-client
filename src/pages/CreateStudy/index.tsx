import Layout from 'components/Layout';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Container,
  TitleDiv,
  CreateForm,
  FormItemDiv,
  DaysWrapper,
  DayDiv,
  CostWrapper,
  Button,
  NameTagWrapper,
  NameTagDiv,
  ScheduleTimeWrapper,
  ScheduleTimeDiv,
  ErrorMsg,
} from './style';
import CustomSwitch from 'components/CustomSwitch';
import { SingleValue } from 'react-select';
import Select from 'components/Select';
import { costFormatter } from 'utils/formatter';
import useInput from 'hooks/useInput';
import { isEmpty } from 'lodash';
import DatePicker from 'components/DatePicker';
import { getDayString, compareTime } from 'utils/schedule';
import { INewStudy, ISchedule } from 'types/db';
import dayjs from 'dayjs';
import useRequest from 'hooks/useRequest';
import { createGroup } from 'api/group';
import { useNavigate } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import { toast } from 'react-toastify';

interface IOption {
  label: string;
  value: string;
}

interface IFormSchedule {
  dayWeek: number;
  startTimeHour: string;
  startTimeMinute: string;
  finishTimeHour: string;
  finishTimeMinute: string;
}

/**
 * 스터디 생성 페이지
 */
function CreateStudy() {
  // 요일 목록
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  // 선택된 요일 배열 . 인덱스가 요일이고 값이 선택 됐는지 여부
  const [selectedDaysMap, setSelectedDaysMap] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [name, onChangeName] = useInput(''); // 스터디 이름
  const [intro, onChangeIntro] = useInput(''); // 스터디 소개
  const [rule, onChangeRule] = useInput(''); // 스터디 이름
  const [scheduleList, setScheduleList] = useState<IFormSchedule[]>([]); // 스터디 일정 목록
  const [startDate, setStartDate] = useState<Date | null>(null); // 시작일
  const [costFlag, setCostFlag] = useState(false); // 벌금 여부
  const [lateCost, setLateCost] = useState(1000); // 지각비
  const [absenceCost, setAbsenceCost] = useState(1000); // 결석비
  const [allowedTime, setAllowedTime] = useState(3); // 지각 기준 시간
  const [invitees, setInvitees] = useState<string[]>([]); // 초대할 닉네임 목록
  const [invitee, onChangeInvitee, setInvitee] = useInput<string>(''); // 입력한 초대자 이름

  // 유효성 결과 변수들
  const [nameErr, setNameErr] = useState(false);
  const [introErr, setIntroErr] = useState(false);
  const [inviteesErr, setInviteesErr] = useState(false);
  const [ruleErr, setRuleErr] = useState(false);
  const [startDateErr, setStartDateErr] = useState(false);
  const [scheduleErr, setScheduleErr] = useState(false);
  const [scheduleErrMsg, setScheduleErrMsg] = useState('');

  const navigate = useNavigate();

  // 지각 벌금 선택 핸들러
  const onChangeLateCost = useCallback((newValue: SingleValue<IOption>) => {
    setLateCost(parseInt(newValue?.value as string));
  }, []);
  // 결석 벌금 선택 핸들러
  const onChangeAbsenceCost = useCallback((newValue: SingleValue<IOption>) => {
    setAbsenceCost(parseInt(newValue?.value as string));
  }, []);
  // 지각 기준 시간 선택 핸들러
  const onChangeAllowedTime = useCallback((newValue: SingleValue<IOption>) => {
    setAllowedTime(parseInt(newValue?.value as string));
  }, []);
  // 일정 시간 선택 핸들러
  const onChangeHour = useCallback(
    (hour: string, type: 'start' | 'finish', dayNum: number) => {
      const datIdx = scheduleList.findIndex(
        (schedule) => schedule.dayWeek === dayNum,
      );
      scheduleList[datIdx][`${type}TimeHour`] = hour;
    },
    [scheduleList],
  );
  // 일정 분 선택 핸들러
  const onChangeMinute = useCallback(
    (minute: string, type: 'start' | 'finish', dayNum: number) => {
      const datIdx = scheduleList.findIndex(
        (schedule) => schedule.dayWeek === dayNum,
      );
      scheduleList[datIdx][`${type}TimeMinute`] = minute;
    },
    [scheduleList],
  );

  // 셀렉트 박스 관련 변수들
  const [costList, setCostList] = useState<IOption[]>([]); // 벌금 목록
  const [allowedTimeList, setAllowedTimeList] = useState<IOption[]>([]); // 지각 기준 시간 목록
  const [hourList, setHourList] = useState<IOption[]>([]); // 시간 목록
  const [minuteList, setMinuteList] = useState<IOption[]>([]); // 분 목록

  // 셀렉트 박스 관련 변수들 설정
  useEffect(() => {
    // 벌금
    const costList = [{ label: '없음', value: '0' }];
    for (let value: number = 500; value <= 10000; value += 500) {
      costList.push({
        label: `${costFormatter(value)}원`,
        value: value.toString(),
      });
    }
    setCostList(costList);
    // 지각 기준 시간
    const allowedTimeList = [
      { label: '1분 후', value: '1' },
      { label: '3분 후', value: '3' },
    ];
    for (let value: number = 5; value <= 55; value += 5) {
      allowedTimeList.push({
        label: `${value}분 후`,
        value: value.toString(),
      });
    }
    allowedTimeList.push({ label: '1시간 후', value: '60' });
    setAllowedTimeList(allowedTimeList);
    // 시간
    const hourList = [];
    for (let value: number = 0; value <= 23; value++) {
      hourList.push({
        label: `${value.toString().padStart(2, '0')}`,
        value: value.toString().padStart(2, '0'),
      });
    }
    setHourList(hourList);
    // 분
    const minuteList = [];
    for (let value: number = 0; value < 60; value += 5) {
      minuteList.push({
        label: `${value.toString().padStart(2, '0')}`,
        value: value.toString().padStart(2, '0'),
      });
    }
    setMinuteList(minuteList);
  }, []);

  // 해당 인덱스의 닉네임 삭제
  const deleteInvitees = useCallback(
    (index: number) => {
      setInvitees(invitees.filter((_, i) => index !== i));
    },
    [invitees],
  );

  // 입력한 닉네임을 초대 리스트에 추가
  const addInvitees = useCallback(() => {
    const addItem = invitee.trim();
    if (isEmpty(addItem)) return;
    setInvitee('');
    setInvitees((prev) => [...prev, addItem]);
  }, [invitee, invitees]);

  // 엔터키 눌렀을때 닉네임 리스트에 추가
  const [isComposing, setIsComposing] = useState(false);
  const onKeyDownInvitee = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (isComposing) return;
      if (e.key === 'Enter') {
        addInvitees();
      }
    },
    [invitee, invitees, isComposing],
  );

  // 스터디 요일 클릭 핸들러
  const onClickDay = useCallback(
    (i: number) => {
      const status = !selectedDaysMap[i];
      setSelectedDaysMap((prev) => {
        prev[i] = !prev[i];
        return [...prev];
      });
      // 시간 선택 맵에 추가
      const newSchedules: IFormSchedule[] = [...scheduleList];
      if (status) {
        const newSchedule = {
          dayWeek: i,
          startTimeHour: '00',
          startTimeMinute: '00',
          finishTimeHour: '00',
          finishTimeMinute: '00',
        };
        newSchedules.push(newSchedule);
        // 요일별로 정렬
        newSchedules.sort((a, b) => a.dayWeek - b.dayWeek);
        setScheduleList(newSchedules);
      } else {
        // 시간 선택 맵에서 삭제
        setScheduleList(newSchedules.filter((item) => item.dayWeek !== i));
      }
    },
    [scheduleList],
  );

  // 스터디 폼 유효성 검사 (빈 칸 인지만 확인)
  const validateForm = () => {
    let flag = true;
    // 이름
    if (!name.trim()) {
      setNameErr(true);
      flag = false;
    } else setNameErr(false);
    // 소개
    if (!intro.trim()) {
      setIntroErr(true);
      flag = false;
    } else setIntroErr(false);
    // 규칙
    if (!rule.trim()) {
      setRuleErr(true);
      flag = false;
    } else setRuleErr(false);
    // 시작일
    if (!startDate) {
      setStartDateErr(true);
      flag = false;
    } else setStartDateErr(false);
    // 인원
    if (isEmpty(invitees)) {
      setInviteesErr(true);
      flag = false;
    } else setInviteesErr(false);
    // 스터디 일정
    if (isEmpty(scheduleList)) {
      setScheduleErr(true);
      setScheduleErrMsg('스터디 일정을 선택해주세요.');
      flag = false;
    } else setScheduleErr(false);
    // 시작시간이 끝시간보다 크거나 같으면 안됨
    if (!isEmpty(scheduleList)) {
      const hasNotValid = scheduleList.some((schedule) => {
        const startTime = `${schedule.startTimeHour}:${schedule.startTimeMinute}`;
        const finishTime = `${schedule.finishTimeHour}:${schedule.finishTimeMinute}`;
        // startTime이 finishTime보다 크거나 같으면 안된다.
        return compareTime(startTime, finishTime) >= 0;
      });
      if (hasNotValid) {
        flag = false;
        setScheduleErr(true);
        setScheduleErrMsg('유효하지 않은 시간 범위가 존재합니다.');
      } else setScheduleErr(false);
    }
    return flag;
  };

  // 스터디 생성 요청
  const requestCreateStudy = useRequest<{ groupId: number }>(createGroup);
  // 생성 버튼 클릭
  const onClickCreateButton = () => {
    if (!validateForm()) return;
    const schedules: ISchedule[] = scheduleList?.map((schedule) => ({
      dayWeek: getDayString(schedule.dayWeek),
      startTime: `${schedule.startTimeHour}:${schedule.startTimeMinute}`,
      finishTime: `${schedule.finishTimeHour}:${schedule.finishTimeMinute}`,
    }));
    const newStudy: INewStudy = {
      name,
      intro,
      rule,
      invitees,
      startDate: dayjs(startDate).format('YYYY-MM-DD'),
      absenceCost: costFlag ? absenceCost : 0, // 벌금여부 off면 0으로 넣어주기
      lateCost: costFlag ? lateCost : 0,
      allowedTime: costFlag ? allowedTime : 0,
      hostName: '이찬희',
      schedules,
    };
    requestCreateStudy(1, newStudy).then((data) => {
      const { groupId } = data;
      navigate(`/group/${groupId}`);
      toast.success('스터디를 생성하였습니다.');
    });
  };

  return (
    <Layout>
      <Container>
        <TitleDiv>스터디 생성</TitleDiv>
        <CreateForm>
          <FormItemDiv error={nameErr}>
            <label>스터디 이름</label>
            <input
              placeholder="이름을 입력해주세요"
              value={name}
              onChange={onChangeName}
            />
          </FormItemDiv>
          <FormItemDiv error={introErr} textareaHeight="3">
            <label>스터디 소개</label>
            <textarea
              placeholder="50자 내외로 작성해주세요"
              value={intro}
              onChange={onChangeIntro}
              maxLength={50}
            />
          </FormItemDiv>
          <FormItemDiv error={inviteesErr}>
            <label>스터디 인원</label>
            <input
              placeholder="초대할 사용자의 닉네임을 입력하고 엔터 키를 눌러주세요."
              value={invitee}
              onChange={onChangeInvitee}
              onKeyDown={onKeyDownInvitee}
              onCompositionStart={() => setIsComposing(true)}
              onCompositionEnd={() => setIsComposing(false)}
            />
          </FormItemDiv>
          {!isEmpty(invitees) && (
            <FormItemDiv emptyLabel>
              <label />
              <NameTagWrapper>
                {invitees.map((user, i) => (
                  <NameTagDiv key={i}>
                    {user}
                    <div
                      onClick={() => {
                        deleteInvitees(i);
                      }}
                    >
                      &times;
                    </div>
                  </NameTagDiv>
                ))}
              </NameTagWrapper>
            </FormItemDiv>
          )}
          <FormItemDiv>
            <label>스터디 시작일</label>
            <DatePicker
              selectedDate={startDate}
              onChange={(date) => {
                if (
                  dayjs(date).isBefore(
                    dayjs().hour(0).minute(0).second(0).millisecond(0),
                  )
                ) {
                  toast.error('오늘 이후의 날짜만 선택할 수 있습니다.');
                  return;
                }
                setStartDate(date);
              }}
              error={startDateErr}
            />
          </FormItemDiv>
          <FormItemDiv>
            <label>스터디 요일</label>
            <div>
              <DaysWrapper>
                {days.map((day, i) => (
                  <DayDiv
                    key={i}
                    selected={selectedDaysMap[i]}
                    onClick={() => {
                      onClickDay(i);
                    }}
                  >
                    {day}
                  </DayDiv>
                ))}
              </DaysWrapper>
              {scheduleErr && <ErrorMsg>{scheduleErrMsg}</ErrorMsg>}
            </div>
          </FormItemDiv>
          {!isEmpty(scheduleList) && (
            <FormItemDiv>
              <label>스터디 시간</label>
              <ScheduleTimeWrapper>
                {scheduleList.map((schedule) => (
                  <ScheduleTimeDiv key={schedule.dayWeek}>
                    <span>{getDayString(schedule.dayWeek)}</span>
                    <div>
                      <Select
                        onChange={(newValue) => {
                          onChangeHour(
                            newValue?.value as string,
                            'start',
                            schedule.dayWeek,
                          );
                        }}
                        options={hourList}
                        defaultValue={hourList[0]}
                      />
                      :
                      <Select
                        onChange={(newValue) => {
                          onChangeMinute(
                            newValue?.value as string,
                            'start',
                            schedule.dayWeek,
                          );
                        }}
                        options={minuteList}
                        defaultValue={minuteList[0]}
                      />
                    </div>
                    ~
                    <div>
                      <Select
                        onChange={(newValue) => {
                          onChangeHour(
                            newValue?.value as string,
                            'finish',
                            schedule.dayWeek,
                          );
                        }}
                        options={hourList}
                        defaultValue={hourList[0]}
                      />
                      :
                      <Select
                        onChange={(newValue) => {
                          onChangeMinute(
                            newValue?.value as string,
                            'finish',
                            schedule.dayWeek,
                          );
                        }}
                        options={minuteList}
                        defaultValue={minuteList[0]}
                      />
                    </div>
                  </ScheduleTimeDiv>
                ))}
              </ScheduleTimeWrapper>
            </FormItemDiv>
          )}
          <FormItemDiv error={ruleErr} textareaHeight="8.5">
            <label>스터디 규칙</label>
            <TextareaAutosize
              placeholder="스터디 규칙을 작성해주세요"
              value={rule}
              onChange={onChangeRule}
            />
          </FormItemDiv>
          <FormItemDiv>
            <label>벌금 여부</label>
            <CostWrapper>
              <CustomSwitch
                checked={costFlag}
                onChange={() => {
                  setCostFlag((prev) => !prev);
                }}
              />
              {costFlag && (
                <>
                  <div>
                    <label>지각 벌금</label>
                    <Select
                      onChange={onChangeLateCost}
                      options={costList}
                      defaultValue={costList[2]}
                    />
                  </div>
                  <div>
                    <label>불참 벌금</label>
                    <Select
                      onChange={onChangeAbsenceCost}
                      options={costList}
                      defaultValue={costList[2]}
                    />
                  </div>
                </>
              )}
            </CostWrapper>
          </FormItemDiv>
          {costFlag && (
            <FormItemDiv>
              <label>지각 기준 시간</label>
              <CostWrapper>
                <div>
                  <label>스터디 시작</label>
                  <Select
                    onChange={onChangeAllowedTime}
                    options={allowedTimeList}
                    defaultValue={allowedTimeList[1]}
                  />
                </div>
              </CostWrapper>
            </FormItemDiv>
          )}
        </CreateForm>
        <Button onClick={onClickCreateButton}>생성하기</Button>
      </Container>
    </Layout>
  );
}

export default CreateStudy;
