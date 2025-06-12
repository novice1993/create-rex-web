import { CSSProperties, useCallback, useState } from "react";
import { useSharedSchemeColor } from "@/providers/SchemeColorProvider";
import { FieldValues, Path, RegisterOptions, UseFormRegister } from "react-hook-form";
import { setInputType } from "./utils";

import VisibilityIcon from "./VisibilityIcon";
import style from "./style.module.css";

interface ValidationFormProps<T extends FieldValues> {
  inputType: "password" | "text";
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;

  register: UseFormRegister<T>;
  name: Path<T>;
  validationRules?: RegisterOptions<T>;

  styles?: {
    container?: CSSProperties;
    input?: CSSProperties;
  };
}

const ValidationForm = <T extends FieldValues>(props: ValidationFormProps<T>) => {
  const { inputType, placeholder, defaultValue, disabled, register, name, validationRules, styles } = props;

  const [isTextVisible, setTextVisible] = useState(false);
  const { highlightSubMono, textMidHighContrast } = useSharedSchemeColor();

  const handleClickVisibleIcon = useCallback(() => {
    setTextVisible(!isTextVisible);
  }, [isTextVisible]);

  return (
    <div className={style.container} style={{ border: `1px solid ${highlightSubMono}`, ...styles?.container }}>
      <input
        {...register(name, validationRules ?? { required: true })}
        type={setInputType(inputType, isTextVisible)}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={style.input}
        style={{ color: textMidHighContrast, paddingRight: `${inputType === "password" ? "12px" : ""}`, ...styles?.input }}
        disabled={disabled}
      />

      {/* set password visible Icon */}
      {inputType === "password" && <VisibilityIcon visibilityState={isTextVisible} onClickEvent={handleClickVisibleIcon} />}
    </div>
  );
};

export default ValidationForm;
