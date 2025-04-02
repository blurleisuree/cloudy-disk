import useAvatarStore from "../../../../shared/store/avatarStore";

import Avatar from "../../../../shared/components/UI/Avatar/Avatar";
import DetailsLoader from "../DetailsLoader/DetailsLoader";

function ProfileAvatar({ className, addAvatar }) {
  const { loading, toggleIsHover } = useAvatarStore();

  return (
    <label
      onMouseOver={toggleIsHover}
      onMouseOut={toggleIsHover}
      className={`${className} relative cursor-pointer inline-block rounded-lg transition overflow-hidden w-16 h-16`}
    >
      {loading && <DetailsLoader />}
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        onChange={addAvatar}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-0 transition"
      ></input>
      <Avatar />
      <div className="absolute top-0 w-full h-full bg-gray-700 bg-opacity-80 opacity-0 hover:opacity-100 flex items-center justify-center rounded-full transition">
        <p className="text-xs text-center text-white block">Изменить фото</p>
      </div>
    </label>
  );
}

export default ProfileAvatar;
