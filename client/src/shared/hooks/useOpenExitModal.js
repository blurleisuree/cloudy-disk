import useModalStore from "../store/modalStore";
import useAuthStore from "../../shared/store/authStore";

import Btn from "../../shared/components/UI/Btn/Btn";

function useOpenExitModal() {
  const { openModal, closeModal } = useModalStore();
  const logout = useAuthStore((state) => state.logout);

  function exit() {
    closeModal();
    logout();
  }

  return () =>
    openModal(
      <div>
        <p className="text-xl text-black font-medium">
          Вы уверены, что хотите выйти из аккаунта?
        </p>
        <div className="mt-6">
          <Btn handleClick={closeModal} className="py-2 px-7">
            Отмена
          </Btn>
          <Btn
            handleClick={exit}
            className="py-2 px-7 ml-4 border-red-500 text-red-500 hover:bg-red-100"
          >
            Выйти
          </Btn>
        </div>
      </div>
    );
}

export default useOpenExitModal;
