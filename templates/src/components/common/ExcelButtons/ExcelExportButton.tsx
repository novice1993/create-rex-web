import { useTranslation } from "react-i18next";
import { useSharedSchemeColor } from "@/providers/SchemeColorProvider";
import { LuFileSpreadsheet } from "react-icons/lu";
import { CSVLink } from "react-csv";
import { useEffect, useState, useRef } from "react";
import { Typography, Button } from "@mui/material";

export interface ExcelHeaderType {
  label: string;
  key: string;
}

export interface ExcelDataType {
  [label: string]: string;
}

export interface ExcelFetchType {
  excelHeader: ExcelHeaderType[];
  excelData: ExcelDataType[];
}

export type ExcelFetchRequest = () => Promise<ExcelFetchType>;
export type ExcelDownloadRequest = () => Promise<Blob | null>;

interface ExcelExportButtonProps {
  excelTitle?: string;
  excelFetch?: ExcelFetchRequest;
  excelDownload?: ExcelDownloadRequest;
}
const ExcelExportButton = (props: ExcelExportButtonProps) => {
  const { t } = useTranslation(["page"]);
  const { systemBlue, systemWhite } = useSharedSchemeColor();
  const { excelTitle, excelFetch, excelDownload } = props;
  const [isExportExcel, setIsExportExcel] = useState(false);
  const [excelData, setExcelData] = useState<ExcelDataType[]>([]);
  const [excelHeader, setExcelHeader] = useState<ExcelHeaderType[]>([]);
  const excelRef = useRef<CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }>(null);

  const onClickExcelExportButton = async () => {
    if (excelFetch && !isExportExcel) {
      const target = await excelFetch();
      if (target) {
        setIsExportExcel(true);
        setExcelHeader(target.excelHeader);
        setExcelData(target.excelData);
      }
    }

    if (excelDownload && !isExportExcel) {
      const blob = await excelDownload();
      if (blob) {
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = `${excelTitle}.xlsx`; // 원하는 파일 이름 설정
        link.click();

        URL.revokeObjectURL(blobUrl);
      }
    }
  };

  useEffect(() => {
    if (excelData && isExportExcel) {
      excelRef?.current?.link.click();
      setIsExportExcel(false);
    }
  }, [excelData]);

  return (
    <Button
      variant="contained"
      onClick={onClickExcelExportButton}
      sx={{
        position: "absolute",
        right: "0",
        outline: "none",
        backgroundColor: systemBlue,
        color: systemWhite,
        "&:hover": {
          backgroundColor: systemBlue,
          opacity: 0.8
        },
        display: "flex",
        alignItems: "center",
        gap: 0.5
      }}
    >
      <LuFileSpreadsheet />
      <Typography variant="body2" sx={{ fontSize: "14px", lineHeight: "14px", ml: 0.5 }}>
        {t("Search.Common.ExportExcel")}
      </Typography>
      <CSVLink data={excelData} headers={excelHeader} filename={`${excelTitle}.csv`} target="_blank" ref={excelRef} />
    </Button>
  );
};

export default ExcelExportButton;
