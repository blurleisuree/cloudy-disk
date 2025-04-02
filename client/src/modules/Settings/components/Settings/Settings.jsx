import Btn from '../../../../shared/components/UI/Btn/Btn'
import SettingTitle from '../SettingsTitle/SettingsTitle'

import useOpenExitModal from "../../../../shared/hooks/useOpenExitModal";

function Settings() {
  const openExitModal = useOpenExitModal();

  return (
    <div className="flex-col">
    <SettingTitle>Безопасность</SettingTitle>
      <Btn className="py-2.5 px-5" handleClick={openExitModal}>
        Выйти на данном устройстве
      </Btn>
    </div>
  );
}

export default Settings;
