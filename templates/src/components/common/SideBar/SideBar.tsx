import styles from "./SideBar.module.css";
import { PropsWithChildren } from "react";
import { useSharedSchemeColor } from "@/providers/SchemeColorProvider";
// import { useAtom } from "jotai";
// import { foldUIComponentStateAtom } from "@/stores/root";

// import BreadCrumbs from '../Breadcrumbs';

interface SideBarProps {
  isFix?: boolean;
}
export default function SideBar({ children, isFix }: PropsWithChildren<SideBarProps>) {
  const { borderNormal, backgroundBase } = useSharedSchemeColor();
  // const [change] = useAtom(foldUIComponentStateAtom);
  const change = false; // 임시 기본값
  const moveSidebar = change ? "move-sideBar" : "";
  const position = isFix ? styles.position : "";

  return (
    <>
      <div className={`${styles.containerSideBar} ${moveSidebar} ${position}`} style={{ backgroundColor: backgroundBase, borderRight: `1px solid ${borderNormal}` } as React.CSSProperties}>
        {/* <BreadCrumbs margin="sm" /> */}
        <div className={styles.contentsWrap}>{children}</div>
      </div>
    </>
  );
}
