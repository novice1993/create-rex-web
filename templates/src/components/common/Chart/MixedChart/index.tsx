import { ActionIcon, Button } from "@mantine/core";
import ReactEcharts, { EChartsOption } from "echarts-for-react";
import classes from "./index.module.css";
import { useSharedSchemeColor } from "@/providers/SchemeColorProvider";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import { useLocale } from "@/locale";

interface DataProps {
  name: string;
  data: number[];
}
interface labelProps {
  crossId: string;
  crossName: string;
}
interface MixedChartProps {
  title: string;
  label: labelProps[];
  barData: DataProps;
  lineData1: DataProps;
  lineData2: DataProps;
  buttonClick?: () => void;
  buttonText: string;
}
const ITEMS_PER_SLIDE = 7; // 슬라이드당 7개의 데이터

const MixedChart = ({ title, label, barData, lineData1, lineData2, buttonClick, buttonText }: MixedChartProps) => {
  const color = useSharedSchemeColor();
  const [currentSlide, setCurrentSlide] = useState(0); // 현재 슬라이드 인덱스 관리
  // 슬라이드로 보여줄 데이터 자르기
  const startIndex = currentSlide * ITEMS_PER_SLIDE;
  const endIndex = startIndex + ITEMS_PER_SLIDE;
  const currentLabels = label?.slice(startIndex, endIndex);
  const currentBarData = barData?.data.slice(startIndex, endIndex);
  const currentLineData1 = lineData1?.data.slice(startIndex, endIndex);
  const currentLineData2 = lineData2?.data.slice(startIndex, endIndex);
  const totalSlides = Math.ceil(label?.length / ITEMS_PER_SLIDE); // 총 슬라이드 개수
  const currentLabelsName = currentLabels?.map(item => item.crossName);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const localizedButtonText = buttonText ? useLocale(buttonText) : "";
  const defaultOptions: EChartsOption = {
    tooltip: {
      trigger: "axis"
    },
    title: {
      left: "2px", // title을 차트의 왼쪽에 붙이기
      text: useLocale(title),
      textStyle: {
        color: color.textHighContrast,
        height: "24px",
        fontFamily: "Pretendard",
        fontSize: "16px",
        fontWeight: "800"
      }
    },
    xAxis: {
      type: "category",
      data: currentLabelsName
      // boundaryGap: true
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
      },
      formatter: function (name: string) {
        return name.length > 4 ? name.slice(0, 3) + "..." : name; // 너무 긴 텍스트를 자름
      }
    },
    grid: {
      top: "56px",
      left: "35px",
      bottom: "20px",
      right: "10px" // 차트 데이터가 title, legend와 겹치지 않게 상단 공간 확보
    }
  };

  const mixedOption: EChartsOption = {
    ...defaultOptions,
    xAxis: {
      ...defaultOptions.xAxis,
      data: currentLabelsName
    },
    legend: {
      ...defaultOptions.legend,
      data: [useLocale(barData?.name), useLocale(lineData1?.name), useLocale(lineData2?.name)]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        name: useLocale(barData?.name),
        type: "bar",
        barWidth: "20%",
        // data: barData.data,
        data: currentBarData,
        itemStyle: {
          color: color.graphSky,
          borderRadius: 2
        }
      },
      {
        name: useLocale(lineData1?.name),
        type: "line",
        stack: "total", // 스택이 적용된 라인 차트
        // data: lineData1.data,
        data: currentLineData1,
        symbolSize: 0,
        itemStyle: {
          color: color.graphPurple
        },
        areaStyle: {
          color: color.graphPurple,
          opacity: 0.1
        }, // 면적을 채우려면 추가
        lineStyle: {
          color: color.graphPurple
        }
      },
      {
        name: useLocale(lineData2?.name),
        type: "line",
        stack: "total", // 스택이 적용된 라인 차트
        // data: lineData2.data,
        data: currentLineData2,
        symbolSize: 0,
        itemStyle: {
          color: color.graphBlue
        },
        areaStyle: {
          color: color.graphBlue,
          opacity: 0.1
        }, // 면적을 채우려면 추가
        lineStyle: {
          color: color.graphBlue
        }
      }
    ]
  };

  return (
    <div className={classes.paper} style={{ backgroundColor: `${color.backgroundCard}`, color: `${color.textHighContrast}` }}>
      <ReactEcharts option={mixedOption} style={{ height: "100%", width: "100%" }} />
      <div className={classes.leftPagination}>
        <ActionIcon
          className={currentSlide === 0 ? classes.disabledIcon : ""}
          onClick={() => setCurrentSlide(prev => Math.max(prev - 1, 0))}
          disabled={currentSlide === 0}
          variant="default"
          style={{ border: "1px solid currentColor" }}
        >
          <FaArrowLeft />
        </ActionIcon>
      </div>
      <div className={classes.rightPagination}>
        <ActionIcon
          className={currentSlide === totalSlides - 1 ? classes.disabledIcon : ""}
          onClick={() => setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1))}
          disabled={currentSlide === totalSlides - 1}
          variant="default"
          style={{ border: "1px solid currentColor" }}
        >
          <FaArrowRight />
        </ActionIcon>
      </div>
      {buttonText && (
        <Button onClick={buttonClick} style={{ backgroundColor: `${color.backgroundMid}`, color: `${color.textSemiHighContrast}` }} className={classes.button}>
          {localizedButtonText}
        </Button>
      )}
    </div>
  );
};

export default MixedChart;
