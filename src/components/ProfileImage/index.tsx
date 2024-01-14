import Avvvatars from 'avvvatars-react';

import React from 'react';
import { ProfileImageDiv } from './style';

function ProfileImage({
  nickName,
  url,
  onClick,
  size,
  cursor = 'default',
}: {
  nickName?: string;
  url?: string | null;
  size: number;
  onClick?: () => void;
  cursor?: string;
}) {
  if (url) {
    return (
      <ProfileImageDiv
        onClick={onClick}
        width={size.toString()}
        height={size.toString()}
        cursor={cursor}
        url={url}
      />
    );
  } else if (nickName) {
    return (
      <div onClick={onClick} style={{ cursor: cursor }}>
        <Avvvatars value={nickName} size={size} />
      </div>
    );
  }
}

export default ProfileImage;
