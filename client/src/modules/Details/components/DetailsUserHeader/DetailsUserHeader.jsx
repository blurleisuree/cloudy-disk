import useAuthStore from "../../../../store/authStore";
import useAvatarStore from "../../../../shared/store/avatarStore";
import useMessageStore from "../../../../shared/store/messageStore";

import DetailsAvatar from "../DetailsAvatar/DetailsAvatar";
import DetailsName from "../DetailsName/DetailsName";
import DetailsSubtext from "../DetailsSubtext/DetailsSubtext";
import DetailsError from "../DetailsError/DetailsError";

function DetailsUserHeader({ isEditing }) {
  const setUser = useAuthStore((state) => state.setUser);
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

  return (
    <div>
      <div className="flex items-center">
        <DetailsAvatar className="mr-4" addAvatar={addAvatar} />
        <DetailsName isEditing={isEditing} />
      </div>
      <DetailsSubtext className={isHover ? "opacity-100" : "opacity-0"}>
        Доступные форматы - png, jpg, jpeg. Максимальный размер 5 Мб.
      </DetailsSubtext>
      {error && <DetailsError>{error}</DetailsError>}
    </div>
  );
}

export default DetailsUserHeader;
