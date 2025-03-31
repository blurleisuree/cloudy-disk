import profileSvg from "../../../../assets/profile.svg";

import useAuthStore from "../../../../store/authStore";
import useAvatarStore from "../../../../store/avatarStore";

// Для кнопки в хедере
function ProfileBtn({ className, onClick }) {
  const avatar = useAuthStore((state) => state.user.avatar);
  const loading = useAvatarStore((state) => state.loading);

  return (
    <div
      className={`${className} overflow-hidden rounded-lg w-12 h-12 cursor-pointer transition active:opacity-35`}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <img
        // Заглушка если аватара нет
        src={avatar || profileSvg}
        alt="profileBtn"
        onClick={onClick}
        className="object-cover w-12 h-12"
      />
    </div>
  );
}

export default ProfileBtn;
