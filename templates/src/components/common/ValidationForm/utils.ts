import { FieldErrors } from "react-hook-form";

export const setInputType = (inputType: "password" | "text", isTextVisible: boolean) => {
  if (inputType === "text") {
    return inputType;
  } else {
    const result = isTextVisible ? "text" : "password";
    return result;
  }
};

export const getValidationErrorMessage = (errors: FieldErrors): string | undefined => {
  const errorMessages = Object.keys(errors)
    .map(key => errors[key]?.message)
    .filter((message): message is string => !!message); // message가 undefined가 아닌 경우만 필터링

  return errorMessages.length > 0 ? errorMessages[0] : undefined; // 첫 번째 에러 메시지만 반환
};
