function ProfileInput({ labelText, placeholder, subtext, disabled }) {
  return (
    <div className="flex-col mt-2 flex">
      <label className="text-sm text-gray-500 mb-1">{labelText}</label>
      <input type="text" placeholder={placeholder} className="border-b pb-1 bg-transparent" disabled={disabled}/>
      <span className="text-xs text-gray-500 mt-1">{subtext}</span>
    </div>
  );
}

export default ProfileInput;
