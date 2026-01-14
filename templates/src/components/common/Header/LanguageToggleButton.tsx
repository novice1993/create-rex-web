import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Menu, Text, Tooltip } from "@mantine/core";
import { useSharedSchemeColor } from "@/providers/SchemeColorProvider";
import { IoLanguage } from "react-icons/io5";

const LanguageToggleButton = () => {
  const { i18n, t } = useTranslation();
  const { textHighContrast } = useSharedSchemeColor();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const getDisplayLanguage = () => {
    switch (i18n.language) {
      case "ko":
        return "한국어";
      case "en":
        return "English";
      case "ru":
        return "Русский";
      default:
        return "한국어";
    }
  };

  return (
    <>
      <Text c="white">|</Text>
      <Menu position="bottom-end">
        <Tooltip label={t("language")}>
          <Menu.Target>
            <Button
              variant="outline"
              size="sm"
              leftSection={<IoLanguage size={18} />}
              style={{
                color: textHighContrast,
                minWidth: "80px"
              }}
            >
              {getDisplayLanguage()}
            </Button>
          </Menu.Target>
        </Tooltip>

        <Menu.Dropdown>
          <Menu.Item onClick={() => changeLanguage("ko")}>{t("korean")}</Menu.Item>
          <Menu.Item onClick={() => changeLanguage("en")}>{t("english")}</Menu.Item>
          <Menu.Item onClick={() => changeLanguage("ru")}>{t("russian")}</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default LanguageToggleButton;
