import Modal from 'layouts/Modal';
import React, { useCallback } from 'react';
import { Container, TitleDiv, ContentDiv, ButtonWrapper } from './style';
import useSWR from 'swr';
import { IStudy } from 'types/db';
import fetcher from 'utils/fetcher';
import { Button } from 'components/Button';
import useRequest from 'hooks/useRequest';
import { deleteGroup } from 'api/group';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function StudyDeletePopup({
  show,
  onClose,
  groupId,
}: {
  groupId: number;
  show: boolean;
  onClose: () => void;
}) {
  // 스터디 정보
  const { data: studyInfo } = useSWR<IStudy>(`/info/${groupId}`, fetcher);

  const navigate = useNavigate();

  const requestDelete = useRequest<boolean>(deleteGroup);
  const onClickDeleteButton = useCallback(async () => {
    try {
      await requestDelete(groupId);
      toast.success('스터디를 탈퇴하였습니다.');
      navigate('/');
    } catch {
      toast.error('스터디를 탈퇴하지 못하였습니다.');
    }
  }, [groupId]);

  return (
    <Modal show={show} onCloseModal={onClose}>
      <Container>
        <TitleDiv>
          스터디 나가기
          <div onClick={onClose}>&times;</div>
        </TitleDiv>
        <ContentDiv>
          <div>
            <b>[{studyInfo?.name}]</b>에서 나가시겠습니까?
          </div>
          <div>
            {studyInfo?.host &&
              '스터디장이 스터디를 나가게 되면 해당 스터디는 삭제됩니다.'}
          </div>
        </ContentDiv>
        <ButtonWrapper>
          <Button width="50%" padding="0.8rem 1rem" onClick={onClose}>
            취소
          </Button>
          <Button
            yesButton
            width="50%"
            padding="0.8rem 1rem"
            onClick={onClickDeleteButton}
          >
            나가기
          </Button>
        </ButtonWrapper>
      </Container>
    </Modal>
  );
}

export default StudyDeletePopup;
