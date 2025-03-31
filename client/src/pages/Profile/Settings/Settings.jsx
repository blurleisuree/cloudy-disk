import Btn from "../../../components/UI/Btn/Btn";

import useOpenExitModal from "../../../shared/hooks/useOpenExitModal";

function Settings() {
  const openExitModal = useOpenExitModal();

  return (
    <div className="flex-col">
      <h2 className="text-lg font-medium mb-4">Безопасность</h2>
      <Btn className="py-2.5 px-5" handleClick={openExitModal}>
        Выйти на данном устройстве
      </Btn>
      {/* <Btn className="ml-4">Выйти на всех устройтвах</Btn> */}
    </div>
  );
}

export default Settings;
