/* eslint-disable @typescript-eslint/no-unused-vars */
import Modal from 'layouts/Modal';
import {
  Container,
  ContentDiv,
  PostTitleDiv,
  TitleDiv,
  UrlListWrapper,
  DeleteButton,
} from './style';
import useSWR from 'swr';
import { ILoginUser, IPost } from 'types/db';
import fetcher from 'utils/fetcher';
import useRequest from 'hooks/useRequest';
import { deletePost } from 'api/post';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { BsPaperclip } from 'react-icons/bs';
import { isEmpty } from 'lodash';

function BoardDetail({
  show,
  onClose,
  postId,
}: {
  postId: number;
  show: boolean;
  onClose: () => void;
}) {
  const { data: postInfo } = useSWR<IPost>(
    postId !== 0 ? `/posts/specific/${postId}` : '',
    fetcher,
  );
  const { data: loginUser } = useSWR<ILoginUser>('/users/me', fetcher);

  const getFileName = useCallback((url: string) => {
    const splitUrl = url.split('/');
    if (splitUrl.length > 0) {
      return decodeURIComponent(splitUrl[splitUrl.length - 1]).slice(36);
    }
    return '-';
  }, []);

  const requestDelete = useRequest(deletePost);
  const onClickDeleteButton = useCallback(() => {
    if (postId === 0) return;
    requestDelete(postId)
      .then(() => {
        toast.success('게시글을 삭제하였습니다.');
        onClose();
      })
      .catch(() => {
        toast.error('게시글을 삭제하지 못하였습니다.');
      });
  }, [postId]);

  return (
    <Modal show={show} onCloseModal={onClose}>
      <Container>
        <TitleDiv>
          <PostTitleDiv>
            {postInfo?.title}
            <div>
              {postInfo?.date}&nbsp;&nbsp;&nbsp;{postInfo?.writer}
            </div>
          </PostTitleDiv>
          <div onClick={onClose}>&times;</div>
        </TitleDiv>
        {!isEmpty(postInfo?.urls) && (
          <UrlListWrapper>
            {postInfo?.urls?.map((url, i) => (
              <a key={i} href={url}>
                <BsPaperclip size="15" />
                &nbsp;
                {getFileName(url)}
              </a>
            ))}
          </UrlListWrapper>
        )}

        <ContentDiv>{postInfo?.contents}</ContentDiv>
        {loginUser?.email === postInfo?.email && (
          <DeleteButton onClick={onClickDeleteButton}>삭제</DeleteButton>
        )}
      </Container>
    </Modal>
  );
}

export default BoardDetail;
