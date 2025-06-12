import styles from "./Header.module.css";
import Rexgen from "../Logo/Rexgen";

import LogoutButton from "./LogoutButton";
import MonitoringToggleButton from "./MonitoringToggleButton";
import LanguageToggleButton from "./LanguageToggleButton";

export default function Header() {
  return (
    <div className={styles.container}>
      <div className={`${styles.logo} ${styles.rexgen}`}>
        <Rexgen />
      </div>
      <div className={styles.iconsList}>
        <LogoutButton />
        <MonitoringToggleButton />

        <LanguageToggleButton />
      </div>
    </div>
  );
}
