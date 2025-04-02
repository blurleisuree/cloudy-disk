function ProfileName({ isEditing, onChange }) {
  return (
    <input
      onChange={onChange}
      className={`${
        isEditing && "border-b outline-none"
      } text-lg bg-transparent placeholder-black text-black ml-1`}
      placeholder="Ваше имя"
      disabled={!isEditing}
    />
  );
}

export default ProfileName;
