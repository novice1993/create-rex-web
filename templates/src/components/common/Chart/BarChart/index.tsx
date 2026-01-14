import { Button } from "@mantine/core";
import ReactEcharts, { EChartsOption } from "echarts-for-react";
import classes from "./index.module.css";
import { useSharedSchemeColor } from "@/providers/SchemeColorProvider";
import { useTranslation } from "react-i18next";

interface DataProps {
  name: string;
  data: number[];
}
interface ButtonProps {
  buttonText: string;
  onClick: () => void;
}
interface BarChartProps {
  title: string;
  label: string[];
  dataList: DataProps[];
  button?: ButtonProps;
}

const BarChart = ({ title, label, dataList, button }: BarChartProps) => {
  const { t } = useTranslation(["page"]);
  const color = useSharedSchemeColor();
  const barColors = [color.graphSky, color.graphPurple, color.graphBlue];
  const localizedDataNames = dataList?.map(data => t(data.name)); // 모든 이름을 미리 변환

  const defaultOptions: EChartsOption = {
    tooltip: {
      trigger: "axis"
    },
    title: {
      left: "2px",
      text: t(title), // 최상위에서 변환한 값 사용
      textStyle: {
        color: color.textHighContrast,
        height: "24px",
        fontFamily: "Pretendard",
        fontSize: "16px",
        fontWeight: "800"
      }
    },
    xAxis: {
      type: "category"
    },
    legend: {
      right: "90px",
      top: "2px",
      itemWidth: 8,
      itemHeight: 8,
      icon: "circle",
      textStyle: {
        color: color.textMidHighContrast,
        fontSize: 13
      }
    },
    grid: {
      top: "56px",
      left: "35px",
      bottom: "20px",
      right: "10px"
    }
  };

  const barOption: EChartsOption = {
    ...defaultOptions,
    xAxis: {
      ...defaultOptions.xAxis,
      data: label
    },
    legend: {
      ...defaultOptions.legend,
      data: localizedDataNames // 미리 변환된 이름 사용
    },
    yAxis: {
      type: "value"
    },
    series: dataList?.map((data, index) => ({
      name: localizedDataNames[index], // 변환된 이름 사용
      type: "bar",
      barWidth: "11.5px",
      data: data.data,
      itemStyle: {
        color: barColors[index],
        borderRadius: 2
      }
    }))
  };

  return (
    <div className={classes.paper} style={{ backgroundColor: `${color.backgroundCard}`, color: `${color.textHighContrast}` }}>
      <ReactEcharts option={barOption} style={{ height: "100%", width: "100%" }} />
      {button && (
        <Button onClick={button.onClick} style={{ backgroundColor: `${color.backgroundMid}`, color: `${color.textSemiHighContrast}` }} className={classes.button}>
          {t(button.buttonText)}
        </Button>
      )}
    </div>
  );
};

export default BarChart;
