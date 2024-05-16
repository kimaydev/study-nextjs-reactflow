import React, { useCallback, useState } from "react";
import { useRecoilState } from "recoil";
import PanelLayout from "@/components/layout/PanelLayout";
import { BsBorderStyle } from "react-icons/bs";
import { DefaultRadioButtonStyled } from "@/styles/page-component/default/defaultStyle";
import { rEdgeOptions } from "@/utils/states/rReactFlow";
import { IEdgeOptionsType } from "@/utils/type/interface";

// 간선 수정 기본값
const initialEdge: IEdgeOptionsType = {
  baseEdge: "bezier",
};

const DefaultHandlerEdge = () => {
  const [edgeSubmitOptions, setEdgeSubmitOptions] =
    useState<IEdgeOptionsType>(initialEdge);
  // 간선 형태 설정
  const edgePathArr: string[] = ["straight", "step", "smoothstep", "bezier"];
  const handleEdgePath = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEdgeSubmitOptions(prev => {
      return {
        ...prev,
        baseEdge: value,
      };
    });
  };
  // console.log("edgeOptions", edgeOptions);
  const [edgeOptions, setEdgeOptions] = useRecoilState(rEdgeOptions);
  const handleEditEdge = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setEdgeOptions(edgeSubmitOptions);
    },
    [edgeSubmitOptions],
  );
  // console.log("edgeOptions", edgeOptions);
  return (
    <PanelLayout>
      <>
        <h2>
          <i>
            <BsBorderStyle />
          </i>
          간선 스타일 설정
        </h2>
        <form onSubmit={handleEditEdge}>
          <div className="form-wrapper">
            <ul>
              <li>
                <div className="form-box">
                  <span className="form-item-title">간선 형태</span>
                  <DefaultRadioButtonStyled>
                    <ul>
                      {edgePathArr.map((item, index) => {
                        return (
                          <li key={index}>
                            <input
                              type="radio"
                              name="EdgeOptions"
                              id={item}
                              value={item}
                              checked={edgeSubmitOptions.baseEdge === item}
                              onChange={handleEdgePath}
                            />
                            <label htmlFor={item}>{item}</label>
                          </li>
                        );
                      })}
                    </ul>
                  </DefaultRadioButtonStyled>
                </div>
              </li>
            </ul>
          </div>
          <button className="submit-button" type="submit">
            간선 수정
          </button>
        </form>
      </>
    </PanelLayout>
  );
};

export default DefaultHandlerEdge;
