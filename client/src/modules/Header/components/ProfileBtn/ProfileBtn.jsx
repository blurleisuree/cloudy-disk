import useAvatarStore from "../../../../shared/store/avatarStore";
import Avatar from "../../../../shared/components/UI/Avatar/Avatar";

// Для кнопки в хедере
function ProfileBtn({ className, onClick }) {
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
    <Avatar onClick={onClick} />
    </div>
  );
}

export default ProfileBtn;
