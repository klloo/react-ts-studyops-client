import React from 'react';
import { useParams } from 'react-router-dom';

function StudyDetail() {
  const { studyId } = useParams();
  return <div>{studyId}</div>;
}

export default StudyDetail;
