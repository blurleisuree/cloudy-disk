import { useEffect } from "react";
import useNewCodeStore from "../../store/newCodeStore";
import ErrorText from "../ErrorText/ErrorText";

function GetNewCode({ email, resendFunc }) {
  const { codeIsResend, getNewCode, error, resetCodeIsResend } =
    useNewCodeStore();

  function handleClick() {
    return () => {
      getNewCode(resendFunc, email);
    };
  }

  useEffect(() => {
    resetCodeIsResend();
  }, [resetCodeIsResend]);

  if (error) return <ErrorText>{error.message}</ErrorText>;

  return (
    <div>
      {codeIsResend ? (
        <p className="text-primary-color mt-2">
          Новый код отправлен! Проверьте почту
        </p>
      ) : (
        <p className="mt-6">
          Пожалуйста, проверьте папку со спамом.{" "}
          <span
            className="text-primary-color cursor-pointer"
            onClick={handleClick()}
          >
            Повторно отправить письмо с подтверждением.
          </span>
        </p>
      )}
    </div>
  );
}

export default GetNewCode;
