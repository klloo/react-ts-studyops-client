import React, { useEffect, useState } from 'react';
import {
  Container,
  TitleDiv,
  CreateForm,
  Button,
  StudyInfoField,
} from './style';
import useInput from 'hooks/useInput';
import { IStudy } from 'types/db';
import useRequest from 'hooks/useRequest';
import TextareaAutosize from 'react-textarea-autosize';
import { toast } from 'react-toastify';
import FormItem from 'components/FormItem';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import BackIcon from 'components/BackIcon';
import { modifyIntro, modifyRules } from 'api/group';

/**
 * 스터디 수정 페이지
 */
function UpdateStudy() {
  const { groupId } = useParams();
  // 스터디 기본 정보
  if (!groupId) {
    return <Navigate to="/" />;
  }
  const { data: studyInfo, mutate: mutateStudyInfo } = useSWR<IStudy>(
    `/info/${groupId}`,
    fetcher,
  );
  const [intro, onChangeIntro, setIntro] = useInput(''); // 스터디 소개
  const [rule, onChangeRule, setRule] = useInput(''); // 스터디 규칙

  // 유효성 결과 변수들
  const [introErr, setIntroErr] = useState(false);
  const [ruleErr, setRuleErr] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!studyInfo) return;
    if (!studyInfo.host) {
      navigate('/');
      return;
    }
    setIntro(studyInfo.intro);
    setRule(studyInfo.rule);
  }, [studyInfo]);

  // 스터디 폼 유효성 검사 (빈 칸 인지만 확인)
  const validateForm = () => {
    let flag = true;
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
    return flag;
  };

  // 스터디 정보 수정 요청
  const requestModifyRules = useRequest<boolean>(modifyRules);
  const requestModifyIntro = useRequest<boolean>(modifyIntro);
  // 생성 버튼 클릭
  const onClickUpdateButton = async () => {
    if (!validateForm()) return;
    try {
      await requestModifyIntro(groupId, intro);
      await requestModifyRules(groupId, rule);
      mutateStudyInfo();
      navigate(`/group/${groupId}`);
      toast.success('스터디 정보를 수정하였습니다.');
    } catch {
      toast.error('스터디 정보를 수정하지 못하였습니다.');
    }
  };

  return (
    <Container>
      <BackIcon />
      <TitleDiv>스터디 정보 수정</TitleDiv>
      <CreateForm>
        <FormItem>
          <label>스터디 이름</label>
          <StudyInfoField>{studyInfo?.name}</StudyInfoField>
        </FormItem>
        <FormItem error={introErr} textareaHeight="3">
          <label>스터디 소개</label>
          <textarea
            placeholder="50자 내외로 작성해주세요"
            value={intro}
            onChange={onChangeIntro}
            maxLength={50}
          />
        </FormItem>
        <FormItem error={ruleErr} textareaHeight="8.5">
          <label>스터디 규칙</label>
          <TextareaAutosize
            placeholder="스터디 규칙을 작성해주세요"
            value={rule}
            onChange={onChangeRule}
          />
        </FormItem>
      </CreateForm>
      <Button onClick={onClickUpdateButton}>수정하기</Button>
    </Container>
  );
}

export default UpdateStudy;
