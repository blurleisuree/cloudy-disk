import Btn from '../../../shared/components/UI/Btn/Btn'

import useOpenExitModal from "../../../shared/hooks/useOpenExitModal";

function Settings() {
  const openExitModal = useOpenExitModal();

  return (
    <div className="flex-col">
      <h2 className="text-lg font-medium mb-4">Безопасность</h2>
      <Btn className="py-2.5 px-5" handleClick={openExitModal}>
        Выйти на данном устройстве
      </Btn>
    </div>
  );
}

export default Settings;
