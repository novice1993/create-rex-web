import { useState, MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { Button, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { useSharedSchemeColor } from "@/providers/SchemeColorProvider";
import { IoLanguage } from "react-icons/io5";

const LanguageToggleButton = () => {
  const { i18n, t } = useTranslation();
  const { textHighContrast } = useSharedSchemeColor();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    handleClose();
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
      <Typography color="white">|</Typography>
      <Tooltip title={t("language")}>
        <Button
          variant="outlined"
          color="inherit"
          size="small"
          startIcon={<IoLanguage size={18} />}
          onClick={handleClick}
          sx={{
            color: textHighContrast,
            minWidth: "80px",
            justifyContent: "flex-start",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)"
            }
          }}
        >
          {getDisplayLanguage()}
        </Button>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        <MenuItem onClick={() => changeLanguage("ko")}>{t("korean")}</MenuItem>
        <MenuItem onClick={() => changeLanguage("en")}>{t("english")}</MenuItem>
        <MenuItem onClick={() => changeLanguage("ru")}>{t("russian")}</MenuItem>
      </Menu>
    </>
  );
};

export default LanguageToggleButton;
