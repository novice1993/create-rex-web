import { Button } from "@mantine/core";
import ReactEcharts, { EChartsOption } from "echarts-for-react";
import classes from "./index.module.css";
import { useLocale } from "@/locale";
import { useSharedSchemeColor } from "@/providers/SchemeColorProvider";
// import { useSharedSchemeColor } from '@/providers/SchemeColorProvider';

interface DataProps {
  name: string;
  value: number;
}
interface ButtonProps {
  buttonText: string;
  onClick: () => void;
}
interface MixedChartProps {
  title: string;
  data: DataProps[];
  data2?: DataProps[];
  button?: ButtonProps;
  pieInsideName?: string[];
}

const PieChart = ({ title, data, data2, button, pieInsideName }: MixedChartProps) => {
  const color = useSharedSchemeColor();

  const pieChartOptions: EChartsOption = {
    title: {
      text: useLocale(title),
      left: "2px",
      textStyle: {
        color: color.textHighContrast,
        height: "24px"
      }
    },
    tooltip: {
      trigger: "item",
      formatter: "{b}:{d}%" // 툴팁에서 퍼센트 표시
    },
    legend: {
      orient: "horizontal",
      top: "1px",
      right: "0",
      itemWidth: 8,
      itemHeight: 8,
      icon: "circle",
      textStyle: {
        color: color.textMidHighContrast,
        fontSize: 13
      }
    },
    grid: {
      top: "60px"
    },
    graphic: [
      {
        type: "text",
        left: "22%",
        top: "57%",
        style: {
          text: pieInsideName && pieInsideName[0], // 첫 번째 차트의 이름
          textAlign: "center",
          fill: color.textHighContrast,
          fontSize: 14,
          fontWeight: "bold"
        }
      },
      data2 && {
        type: "text",
        left: "72%",
        top: "57%",
        style: {
          text: pieInsideName && pieInsideName[1], // 두 번째 차트의 이름
          textAlign: "center",
          fill: color.textHighContrast,
          fontSize: 14,
          fontWeight: "bold"
        }
      }
    ].filter(Boolean),
    series: [
      {
        name: pieInsideName && pieInsideName[0],
        type: "pie",
        radius: ["70%", "30%"],
        center: data2 ? ["25%", "60%"] : ["50%", "60%"],
        data: data,
        label: {
          show: true,
          position: "inner",
          formatter: "{d}%",
          color: color.textHighContrast,
          fontSize: 12,
          fontWeight: "bold"
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        },
        itemStyle: {
          color: (params: { name: any }) => {
            switch (params.name) {
              case "동":
                return color.graphSky;
              case "서":
                return color.graphBlue;
              case "남":
                return color.graphGreen;
              case "북":
                return color.graphPurple;
              default:
                return color.graphYellow;
            }
          }
        }
      },
      data2 && {
        name: pieInsideName && pieInsideName[1],
        type: "pie",
        radius: ["70%", "30%"],
        center: ["75%", "60%"],
        data: data2,
        label: {
          show: true,
          position: "inner",
          formatter: "{d}%",
          color: color.textHighContrast,
          fontSize: 12,
          fontWeight: "bold"
        },
        emphasis: {
          scale: true,
          scaleSize: 3,
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        },
        itemStyle: {
          color: (params: { name: any }) => {
            switch (params.name) {
              case "동":
                return color.graphSky;
              case "서":
                return color.graphBlue;
              case "남":
                return color.graphGreen;
              case "북":
                return color.graphPurple;
              default:
                return color.graphYellow;
            }
          }
        }
      }
    ].filter(Boolean)
  };
  return (
    <div className={classes.paper} style={{ color: `${color.textHighContrast}` }}>
      <ReactEcharts option={pieChartOptions} style={{ height: "100%", width: "100%" }} />

      {button && (
        <Button onClick={button.onClick} style={{ backgroundColor: `${color.backgroundMid}`, color: `${color.textSemiHighContrast}` }} className={classes.button}>
          {button.buttonText}
        </Button>
      )}
    </div>
  );
};

export default PieChart;
