import { useState } from "react";
import useAuthStore from "../../../../shared/store/authStore";

import Btn from "../../../../shared/components/UI/Btn/Btn";
import DetailsInput from "../DetailsInput/DetailsInput";
import DetailsUserHeader from "../DetailsUserHeader/DetailsUserHeader";

function Details() {
  const user = useAuthStore((state) => state.user);

  const [isEditing, setIsEditing] = useState(false);
  function toggleIsEditing() {
    setIsEditing(!isEditing);
  }

  return (
    <div>
      <DetailsUserHeader isEditing={isEditing}/>
      <DetailsInput
        disabled={true}
        labelText="Электронная почта"
        placeholder={user.email}
        subtext="Для общения с поддержкой и важных сообщений от Cloudy"
      />
      <Btn className="py-1 px-1 text-sm mt-6" handleClick={toggleIsEditing}>
        Редактировать профиль
      </Btn>
    </div>
  );
}

export default Details;
