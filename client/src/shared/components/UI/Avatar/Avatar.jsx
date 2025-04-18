import useAuthStore from "../../../../shared/store/authStore";
import profileSvg from "../../../../assets/icons/profile.svg";

function Avatar({ onClick }) {
  const avatar = useAuthStore((state) => state.user.avatar);

  return (
    <img
      src={avatar || profileSvg}
      alt="avatar"
      className="w-full h-full object-cover"
      onClick={onClick}
    />
  );
}

export default Avatar;
