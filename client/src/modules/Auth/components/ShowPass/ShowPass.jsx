import useShowPassStore from "../../store/showPassStore";

function ShowPass({ className }) {
  const toggleIsShowPass = useShowPassStore((state) => state.toggleIsShowPass);

  return (
    <div className={`${className}`}>
      <input
        type="checkbox"
        onClick={toggleIsShowPass}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:rounded-sm active:rounded-sm"
      />
      <label className="ms-2 mt-1">Показать пароль</label>
    </div>
  );
}

export default ShowPass;
