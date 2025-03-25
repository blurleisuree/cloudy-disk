import Btn from "../../../components/UI/Btn/Btn";
import useExitModalStore from "../../../store/exitModalStore";
import Modal from "../../../components/Modal/Modal";

function Settings() {
  const toggleModal = useExitModalStore((state) => state.toggleModal);

  return (
    <div className="flex-col">
      <h2 className="text-lg font-medium mb-4">Безопасность</h2>
      <Btn handleClick={toggleModal}>Выйти на данном устройстве</Btn>
      {/* <Btn className="ml-4">Выйти на всех устройтвах</Btn> */}
      <Modal />
    </div>
  );
}

export default Settings;
