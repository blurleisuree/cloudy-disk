import profileSvg from "../../../assets/profile.svg";
import useAvatarStore from "../../../store/avatarStore";

// Для кнопки в хедере
function ProfileBtn({ className, onClick }) {
  const avatarSrc = useAvatarStore((state) => state.avatarSrc);

  return (
    <img
      // Заглушка если аватара нет
      src={avatarSrc || profileSvg}
      alt="profileBtn"
      className={className}
      onClick={onClick}
    />
  );
}

export default ProfileBtn;
