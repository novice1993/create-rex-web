import { Button } from "@mantine/core";
import ReactEcharts, { EChartsOption } from "echarts-for-react";
import classes from "./index.module.css";
import { useSharedSchemeColor } from "@/providers/SchemeColorProvider";

interface DataProps {
  name: string;
  data: number[];
}
interface ButtonProps {
  buttonText: string;
  onClick: () => void;
}
interface MixedChartProps {
  title: string;
  label: string[];
  data: DataProps;
  button?: ButtonProps;
}

const MiniBarChart = ({ title, label, data, button }: MixedChartProps) => {
  const color = useSharedSchemeColor();

  const defaultOptions: EChartsOption = {
    tooltip: {
      trigger: "axis"
    },
    title: {
      left: "2px", // title을 차트의 왼쪽에 붙이기
      text: title,
      textStyle: {
        color: color.textHighContrast,
        height: "24px"
      }
    },
    xAxis: {
      type: "category"
    },
    legend: {
      right: 1,
      icon: "none",
      textStyle: {
        color: color.textMidHighContrast,
        fontSize: 13 // 텍스트 크기 조정
      }
    },
    grid: {
      top: "40px",
      // Y축에 가까운 여백을 좁히기
      right: "10px", // 차트 가로를 더 넓게 보기 위해 여백을 줄이기
      bottom: "20px"
    }
  };

  const mixedOption: EChartsOption = {
    ...defaultOptions,
    xAxis: {
      ...defaultOptions.xAxis,
      data: label
    },
    legend: {
      ...defaultOptions.legend,
      data: [data.name],
      itemStyle: {
        display: "none"
      }
    },
    yAxis: {
      type: "value"
    },
    series: {
      name: data.name,
      type: "bar",
      barWidth: "10.48px",
      data: data.data,
      itemStyle: {
        color: color.graphSky,
        borderRadius: 2
      }
    }
  };

  return (
    <div className={classes.paper} style={{ color: `${color.textHighContrast}` }}>
      <ReactEcharts option={mixedOption} style={{ height: "100%", width: "100%" }} />
      {button && (
        <Button onClick={button.onClick} style={{ backgroundColor: `${color.backgroundMid}`, color: `${color.textSemiHighContrast}` }} className={classes.button}>
          {button.buttonText}
        </Button>
      )}
    </div>
  );
};

export default MiniBarChart;
