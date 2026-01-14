import { useTranslation } from "react-i18next";
import { useSharedSchemeColor } from "@/providers/SchemeColorProvider";
import { LuFileSpreadsheet } from "react-icons/lu";
import { CSVLink } from "react-csv";
import { useEffect, useState, useRef } from "react";
import { Text, Button } from "@mantine/core";

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
      variant="filled"
      onClick={onClickExcelExportButton}
      leftSection={<LuFileSpreadsheet />}
      style={{
        position: "absolute",
        right: "0",
        outline: "none",
        backgroundColor: systemBlue,
        color: systemWhite,
        display: "flex",
        alignItems: "center"
      }}
    >
      <Text size="sm" style={{ lineHeight: "14px" }}>
        {t("Search.Common.ExportExcel")}
      </Text>
      <CSVLink data={excelData} headers={excelHeader} filename={`${excelTitle}.csv`} target="_blank" ref={excelRef} />
    </Button>
  );
};

export default ExcelExportButton;
