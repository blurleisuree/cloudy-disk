import profileSvg from "../../../assets/profile.svg";
import useAuthStore from "../../../store/authStore";
import useAvatarStore from "../../../store/avatarStore";

// Для смены аватара в настройках
function ProfileAvatar({ className, addAvatar }) {
  const { avatarSrc, loading, toggleIsHover } = useAvatarStore();
  const avatar = useAuthStore((state) => state.user.avatar)

  return (
    <label
      onMouseOver={toggleIsHover}
      onMouseOut={toggleIsHover}
      className={`${className} relative cursor-pointer inline-block min-w-14 rounded-lg transition`}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        onChange={addAvatar}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-0 transition"
      ></input>
      <img
        // Заглушка если аватара нет
        src={avatar || profileSvg}
        alt="profileBtn"
        className="w-full h-full"
      />
      <div className="absolute top-0 w-full h-full bg-gray-700 bg-opacity-80 opacity-0 hover:opacity-100 transition flex items-center justify-center rounded-full transition">
        <p className="text-xs text-center text-white block">Изменить фото</p>
      </div>
    </label>
  );
}

export default ProfileAvatar;
