import Input from "../../../components/UI/Input/Input";
import useAuthStore from "../../../store/authStore";

function Details() {
  const user = useAuthStore((state) => state.user);

  return (
    <div>
      {/* <input
        className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
        placeholder="Введите ваше имя"
      /> */}
      
    </div>
  );
}

export default Details;
