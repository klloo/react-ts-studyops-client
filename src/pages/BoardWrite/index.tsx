import React, { useCallback, useRef, useState } from 'react';
import {
  Container,
  TitleDiv,
  CreateForm,
  FileListWrapper,
  AttachButton,
  LabelWrapper,
  FileListTitle,
  FileListContent,
  ButtonWrapper,
  Button,
} from './style';
import useInput from 'hooks/useInput';
import { useNavigate } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import FormItem from 'components/FormItem';
import BackIcon from 'components/BackIcon';
import { Navigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import { IStudy } from 'types/db';
import fetcher from 'utils/fetcher';
import { fileSizeFormatter } from 'utils/formatter';
import { toast } from 'react-toastify';
import useRequest from 'hooks/useRequest';
import { createPost } from 'api/post';
import { isEmpty } from 'lodash';

/**
 * 스터디 게시글 작성 페이지
 */
function BoardWrite() {
  const { groupId } = useParams();
  // 스터디 기본 정보
  if (!groupId) {
    return <Navigate to="/" />;
  }
  const { data: studyInfo } = useSWR<IStudy>(`/info/${groupId}`, fetcher);

  const [title, onChangeTitle] = useInput(''); // 스터디 제목
  const [content, onChangeContent] = useInput(''); // 스터디 내용
  const [fileList, setFileList] = useState<File[]>([]); // 파일 목록

  const [uploading, setUploading] = useState(false);

  // 유효성 결과 변수들
  const [titleErr, setTitleErr] = useState(false);
  const [contentErr, setContentErr] = useState(false);

  const navigate = useNavigate();
  // 파일 업로드 버튼 클릭 핸들러
  const fileInput = useRef<HTMLInputElement | null>(null);
  const clickUploadButton = useCallback(() => {
    fileInput.current?.click();
  }, []);

  // 해당 인덱스의 파일 삭제
  const deleteFile = useCallback((index: number) => {
    setFileList((prev) => prev.filter((_, i) => index !== i));
  }, []);

  // 스터디 폼 유효성 검사 (빈 칸 인지만 확인)
  const validateForm = () => {
    let flag = true;
    // 제목
    if (!title.trim()) {
      setTitleErr(true);
      flag = false;
    } else setTitleErr(false);
    // 내용
    if (!content.trim()) {
      setContentErr(true);
      flag = false;
    } else setContentErr(false);
    return flag;
  };

  // 생성 버튼 클릭
  const requestCreate = useRequest(createPost);
  const onClickCreateButton = () => {
    if (!validateForm()) return;
    const formData = new FormData();
    formData.append('title', title);
    formData.append('contents', content);
    fileList.forEach((file) => {
      formData.append('files', file);
    });
    setUploading(true);
    requestCreate(groupId, formData)
      .then(() => {
        navigate(`/group/${groupId}`);
        toast.success('게시글을 작성하였습니다.');
      })
      .catch(() => {
        toast.error('게시글을 작성하지 못하였습니다.');
      })
      .finally(() => {
        setUploading(false);
      });
  };

  return (
    <Container>
      <BackIcon />
      <TitleDiv>[{studyInfo?.name}] 게시글 작성</TitleDiv>
      <CreateForm>
        <FormItem error={titleErr} flexDirection="column">
          <label>제목</label>
          <input
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={onChangeTitle}
          />
        </FormItem>
        <FormItem flexDirection="column">
          <label>첨부파일</label>
          <input
            type="file"
            id="image"
            accept="*"
            ref={fileInput}
            style={{ display: 'none' }}
            onChange={(e) => {
              if (fileList.length >= 5) {
                toast.error('파일은 5개까지 첨부할 수 있습니다.');
                return;
              }
              const selectedFile = e.target.files && e.target.files[0];
              if (!selectedFile) return;
              if (selectedFile.size > 10000000) {
                toast.error('10MB 이상 파일은 첨부할 수 없습니다.');
                return;
              }
              setFileList((prev) => [...prev, selectedFile]);
            }}
          />
          <LabelWrapper>
            <span>10MB 이하의 파일 최대 5개까지 첨부 가능합니다.</span>
            <AttachButton onClick={clickUploadButton}>첨부하기</AttachButton>
          </LabelWrapper>
          {!isEmpty(fileList) && (
            <FileListWrapper>
              <FileListTitle>
                <div>
                  <span
                    onClick={() => {
                      setFileList([]);
                    }}
                  >
                    &times;
                  </span>
                  파일 명
                </div>
              </FileListTitle>
              <FileListContent>
                {fileList.map((file, i) => (
                  <div key={i}>
                    <div>
                      <span
                        onClick={() => {
                          deleteFile(i);
                        }}
                      >
                        &times;
                      </span>
                      {file.name}
                    </div>
                    <div>{fileSizeFormatter(file.size)}</div>
                  </div>
                ))}
              </FileListContent>
            </FileListWrapper>
          )}
        </FormItem>
        <FormItem error={contentErr} textareaHeight="10" flexDirection="column">
          <label>내용</label>
          <TextareaAutosize
            placeholder="내용을 작성해주세요"
            value={content}
            onChange={onChangeContent}
          />
        </FormItem>
      </CreateForm>
      <ButtonWrapper>
        <Button
          onClick={() => {
            navigate(-1);
          }}
          disabled={uploading}
        >
          취소
        </Button>
        <Button onClick={onClickCreateButton} yesButton disabled={uploading}>
          {uploading ? '작성 중...' : '작성'}
        </Button>
      </ButtonWrapper>
    </Container>
  );
}

export default BoardWrite;
