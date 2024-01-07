import Avvvatars from 'avvvatars-react';

import React from 'react';

function ProfileAvatar({
  nickName,
  onClick,
  size,
  cursor = 'default',
}: {
  nickName: string;
  size: number;
  onClick?: () => void;
  cursor?: string;
}) {
  return (
    <div onClick={onClick} style={{ cursor: cursor }}>
      <Avvvatars value={nickName} size={size} />
    </div>
  );
}

export default ProfileAvatar;
