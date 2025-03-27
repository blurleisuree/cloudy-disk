import { useEffect, useState } from "react";

import useAuthStore from "../../../store/authStore";
import useAvatarStore from "../../../store/avatarStore";

import ProfileAvatar from "../../../components/UI/ProfileAvatar/ProfileAvatar";
import ProfileName from "../../../components/UI/ProfileName/ProfileName";
import DiskSpace from "../../../components/UI/DiskSpace/DiskSpace";

function Details() {
  // const user = useAuthStore((state) => state.user);
  const { user, token } = useAuthStore();

  const { uploadAvatar, error, isHover } = useAvatarStore();

  function addAvatar(e) {
    const file = e.target.files[0];
    try {
      if (!file) throw e;

      uploadAvatar(file, token);
      // useAuthStore.setState({ user: { ...user, avatar: data.avatar } });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <div className="flex items-center">
        <ProfileAvatar className="mr-4 w-16" addAvatar={addAvatar} />
        <ProfileName />
      </div>
      <p
        className={`${
          isHover ? "opacity-100" : "opacity-0"
        } transition mt-2 text-sm text-gray-500`}
      >
        Доступные форматы - png, jpg, jpeg. Максимальный размер 5 Мб.
      </p>
      {error && <div className="mt-2 text-red-500">{error}</div>}
      <DiskSpace className="mt-8" />
    </div>
  );
}

export default Details;
