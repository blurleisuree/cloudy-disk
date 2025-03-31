import useAuthStore from "../../../store/authStore";
import useAvatarStore from "../../../store/avatarStore";
import useMessageStore from "../../../shared/store/messageStore";

import ProfileAvatar from "../../../components/UI/ProfileAvatar/ProfileAvatar";
import ProfileName from "../../../components/UI/ProfileName/ProfileName";
import DiskSpace from "../../../components/UI/DiskSpace/DiskSpace";
import ProfileInput from "../../../components/UI/ProfileInput/ProfileInput";
import Btn from '../../../shared/components/UI/Btn/Btn'
import { useState } from "react";

function Details() {
  const { setUser, user } = useAuthStore();
  const addMessage = useMessageStore((state) => state.addMessage);
  const { uploadAvatar, error, isHover } = useAvatarStore();

  async function addAvatar(e) {
    const file = e.target.files[0];
    try {
      if (!file) throw e;

      const data = await uploadAvatar(file, setUser);
      addMessage(data.message);
    } catch (e) {
      console.log(e);
    }
  }

  const [isEditing, setIsEditing] = useState(false);
  function toggleIsEditing() {
    setIsEditing(!isEditing);
  }

  return (
    <div>
      <div className="flex items-center">
        <ProfileAvatar className="mr-4" addAvatar={addAvatar} />
        <ProfileName isEditing={isEditing} />
      </div>
      <p
        className={`${
          isHover ? "opacity-100" : "opacity-0"
        } transition mt-2 text-sm text-gray-500`}
      >
        Доступные форматы - png, jpg, jpeg. Максимальный размер 5 Мб.
      </p>
      <ProfileInput
        disabled={true}
        labelText="Электронная почта"
        placeholder={user.email}
        subtext="Для общения с поддержкой и важных сообщений от Cloudy"
      />
      {error && <div className="mt-2 text-red-500">{error}</div>}
      {/* <DiskSpace className="mt-8" /> */}
      <Btn className="py-1 px-1 text-sm mt-6" handleClick={toggleIsEditing}>
        Редактировать профиль
      </Btn>
    </div>
  );
}

export default Details;
