import { useSharedSchemeColor } from "@/providers/SchemeColorProvider";
import { IoIosEyeOff, IoIosEye } from "react-icons/io";

interface VisibilityIconProps {
  visibilityState: boolean;
  onClickEvent: () => void;
}

const VisibilityIcon = (props: VisibilityIconProps) => {
  const { visibilityState, onClickEvent } = props;
  const { systemBlue } = useSharedSchemeColor();

  return visibilityState ? <IoIosEye color={systemBlue} width={20} height={20} onClick={onClickEvent} /> : <IoIosEyeOff color={systemBlue} width={20} height={20} onClick={onClickEvent} />;
};

export default VisibilityIcon;
