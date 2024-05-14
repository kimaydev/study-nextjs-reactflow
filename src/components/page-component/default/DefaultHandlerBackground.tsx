import React from "react";
import PanelLayout from "@/components/layout/PanelLayout";
import { PiSelectionBackground } from "react-icons/pi";
import { ColorPicker } from "antd";
import { IBackgroundType } from "@/utils/type/interface";
import { Color } from "antd/es/color-picker";
import { BackgroundVariant } from "reactflow";
import { DefaultRadioButtonStyled } from "@/styles/page-component/default/defaultStyle";

interface IBackgroundProps {
  background: IBackgroundType;
  setBackground: React.Dispatch<React.SetStateAction<IBackgroundType>>;
}

const DefaultHandlerBackground = ({
  background,
  setBackground,
}: IBackgroundProps) => {
  // 패턴 형태 변경
  const backgroundPatternArr: BackgroundVariant[] = [
    BackgroundVariant.Lines,
    BackgroundVariant.Dots,
    BackgroundVariant.Cross,
  ];
  // BackgroundVariant의 타입이 enum이라서 value의 값도 enum 타입으로 변환해줘야 함
  const handleBackgroundPattern = (e: React.ChangeEvent<HTMLInputElement>) => {
    const variant = () => {
      type patternType = {
        [key: string]: BackgroundVariant;
      };
      const value = e.target.value;
      const pattern: patternType = {
        lines: BackgroundVariant.Lines,
        dots: BackgroundVariant.Dots,
        cross: BackgroundVariant.Cross,
      };
      return pattern[value];
    };
    setBackground(prev => {
      return {
        ...prev,
        variant: variant(),
      };
    });
  };
  // 패턴 색상 변경
  const handleColorChange = (color: Color) => {
    setBackground(prev => {
      return {
        ...prev,
        color: color.toHexString(),
      };
    });
  };
  // 패턴 간격 변경
  const handlePatternGap = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let value = parseInt(e.target.value);
    // console.log("value", typeof value);
    // gap의 값이 음수일 경우 에러 발생
    if (value < 0) {
      value = 0;
    } else if (value > 50) {
      value = 50;
    }
    setBackground(prev => {
      return {
        ...prev,
        gap: value,
      };
    });
  };
  // 배경 색상 변경
  const handleBackgroundColorChange = (color: Color) => {
    setBackground(prev => {
      return {
        ...prev,
        style: {
          ...prev.style,
          backgroundColor: color.toHexString(),
        },
      };
    });
  };
  return (
    <PanelLayout>
      <>
        <h2>
          <i>
            <PiSelectionBackground />
          </i>
          배경 수정
        </h2>
        <form>
          <ul>
            <li>
              <div className="form-box">
                <label htmlFor="NodeName" className="form-item-title">
                  패턴형태
                </label>
                <DefaultRadioButtonStyled>
                  <ul>
                    {backgroundPatternArr.map((item, index) => (
                      <li key={index}>
                        <input
                          type="radio"
                          name="BackgroundPattern"
                          id={item}
                          value={item}
                          checked={background.variant === item}
                          onChange={handleBackgroundPattern}
                        />
                        <label htmlFor={item}>{item}</label>
                      </li>
                    ))}
                  </ul>
                </DefaultRadioButtonStyled>
                <ol className="flex-list">
                  <li>
                    <label className="form-item-title">패턴색상</label>
                    <ColorPicker
                      defaultValue={background.color}
                      value={background.color}
                      onChange={handleColorChange}
                      showText
                    />
                  </li>
                  <li>
                    <label className="form-item-title">패턴간격</label>
                    <input
                      type="number"
                      className="input-text"
                      value={background.gap && background.gap.toString()}
                      onChange={handlePatternGap}
                    />
                  </li>
                </ol>
              </div>
            </li>
            <li>
              <div className="form-box">
                <span className="form-item-title">배경색상</span>
                <ColorPicker
                  defaultValue={background.style.backgroundColor}
                  value={background.style.backgroundColor}
                  onChange={handleBackgroundColorChange}
                  showText
                />
              </div>
            </li>
          </ul>
        </form>
      </>
    </PanelLayout>
  );
};

export default DefaultHandlerBackground;
