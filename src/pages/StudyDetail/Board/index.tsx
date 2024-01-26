import React, { useEffect, useState } from 'react';
import { ContentTitle } from '../style';
import {
  TopWrapper,
  WriteButton,
  BoardTable,
  NoContentDiv,
  TableWrapper,
} from './style';
import { HiOutlineDocumentDuplicate } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import { IPagingPostData, IPost } from 'types/db';
import { isEmpty } from 'lodash';
import dayjs from 'dayjs';
import Pagination from 'components/Pagination';
import BoardDetail from './BoardDetail';

function Board({ groupId }: { groupId: number }) {
  const navigate = useNavigate();
  const PAGE_SIZE = 10;
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  const [postList, setPostList] = useState<Omit<IPost, 'contents'>[]>([]);
  const { data: postData, mutate: mutatePostData } = useSWR<
    IPagingPostData<Omit<IPost, 'contents'>>
  >(`/posts/${groupId}?page=${page - 1}&size=${PAGE_SIZE}`, fetcher);

  useEffect(() => {
    if (!postData) return;
    setTotal(postData.total);
    setPostList(postData.studyPostDtoList);
  }, [postData]);

  return (
    <div>
      <TopWrapper>
        <ContentTitle>
          <span>
            <HiOutlineDocumentDuplicate size="26" />
          </span>
          자료실
        </ContentTitle>
        <WriteButton
          onClick={() => {
            navigate(`/write/${groupId}`);
          }}
        >
          작성하기
        </WriteButton>
      </TopWrapper>
      {!isEmpty(postList) ? (
        <TableWrapper>
          <BoardTable>
            <thead>
              <tr>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
              </tr>
            </thead>
            <tbody>
              {postList.map((post) => (
                <tr
                  key={post.postId}
                  onClick={() => {
                    setSelectedPostId(post.postId);
                    setShowDetail(true);
                  }}
                >
                  <th>{post.title}</th>
                  <th>{post.writer}</th>
                  <th>{dayjs(post.date).format('YYYY-MM-DD')}</th>
                </tr>
              ))}
            </tbody>
          </BoardTable>
          {total > PAGE_SIZE && (
            <Pagination
              totalPage={Math.ceil(total / PAGE_SIZE)}
              limitPage={5}
              page={page}
              setPage={setPage}
            />
          )}
        </TableWrapper>
      ) : (
        <NoContentDiv>게시글이 없습니다.</NoContentDiv>
      )}
      <BoardDetail
        onClose={() => {
          mutatePostData();
          setShowDetail(false);
          setSelectedPostId(0);
        }}
        show={showDetail}
        postId={selectedPostId}
      />
    </div>
  );
}

export default Board;
