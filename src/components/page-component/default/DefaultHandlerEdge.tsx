import React, { useCallback, useEffect, useState } from "react";
import PanelLayout from "@/components/layout/PanelLayout";
import { BsBorderStyle } from "react-icons/bs";
import {
  DefaultRadioButtonStyled,
  DefaultRadioButtonTwoLineStyled,
} from "@/styles/page-component/default/defaultStyle";
import { IEdgeOptionsType } from "@/utils/type/interface";
import { Edge, MarkerType, useReactFlow } from "reactflow";
import { useRecoilValue } from "recoil";
import { rSelectEdgeId } from "@/utils/states/rReactFlow";
import { valuesType } from "@/hooks/useTrans";

interface IDefaultHandlerEdgeProps {
  edges: Edge[];
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
}
// 간선 수정 기본값
const initialEdge: IEdgeOptionsType = {
  animated: false,
  data: { baseEdge: "bezier", selectMarker: "none" },
};

const DefaultHandlerEdge = ({ edges, setEdges }: IDefaultHandlerEdgeProps) => {
  const { getEdge } = useReactFlow();
  const getSelectEdgeId = useRecoilValue(rSelectEdgeId);
  const selectEdgeValue = getEdge(getSelectEdgeId);
  // console.log("selectEdgeValue", selectEdgeValue);
  // console.log("선택한 간선의 id", getSelectEdgeId);
  const [editEdge, setEditEdge] = useState<IEdgeOptionsType>(initialEdge);
  // 간선 형태 설정
  const edgePathArr: string[] = ["straight", "step", "smoothstep", "bezier"];
  const handleEdgePath = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEditEdge(prev => {
      return {
        ...prev,
        data: {
          ...prev.data,
          baseEdge: value,
        },
      };
    });
  };
  // 애니메이션 효과 설정
  const edgeAnimatedArr: boolean[] = [true, false];
  const handleEdgeAnimated = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = JSON.parse(e.target.value);
    setEditEdge(prev => {
      return {
        ...prev,
        animated: value,
      };
    });
  };
  // 마커 표시 설정
  const edgeMarkerArr: string[] = [
    "none",
    "markerStart", // 시작
    "markerEnd", // 끝
    "markerBothSide", // 양쪽
  ];
  const handleEdgeMarker = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEditEdge(prev => {
      return {
        ...prev,
        data: {
          ...prev.data,
          selectMarker: value,
        },
      };
    });
  };
  useEffect(() => {
    const selectEdgeData = selectEdgeValue?.data;
    setEditEdge(prev => {
      return {
        ...prev,
        animated: selectEdgeValue?.animated,
        data: {
          ...prev.data,
          baseEdge: selectEdgeData?.baseEdge,
        },
      };
    });
  }, [getSelectEdgeId]);
  const handleEditEdge = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const selectEdgeId = selectEdgeValue?.id;
      // console.log("selectEdgeId", selectEdgeId);
      setEdges(edges =>
        edges.map(edge => {
          if (edge.id === selectEdgeId) {
            // 애니메이션 효과
            (edge.animated = editEdge.animated),
              // 마커 설정
              editEdge.data.selectMarker === "none" &&
                ((edge.markerStart = undefined), (edge.markerEnd = undefined)),
              editEdge.data.selectMarker === "markerStart" &&
                ((edge.markerStart = {
                  type: MarkerType.ArrowClosed,
                  orient: "auto-start-reverse",
                }),
                (edge.markerEnd = undefined)),
              editEdge.data.selectMarker === "markerEnd" &&
                ((edge.markerStart = undefined),
                (edge.markerEnd = { type: MarkerType.ArrowClosed })),
              editEdge.data.selectMarker === "markerBothSide" &&
                ((edge.markerStart = {
                  type: MarkerType.ArrowClosed,
                  orient: "auto-start-reverse",
                }),
                (edge.markerEnd = { type: MarkerType.ArrowClosed })),
              // 간선 형태
              (edge.data = {
                ...edge.data,
                baseEdge: editEdge.data.baseEdge,
              });
          }
          return edge;
        }),
      );
    },
    [editEdge, getSelectEdgeId],
  );
  // console.log("editEdge", editEdge);
  // console.log("edges", edges);
  // console.log("edgeOptions", edgeOptions);
  return (
    <PanelLayout>
      <>
        <h2>
          <i>
            <BsBorderStyle />
          </i>
          간선 수정
        </h2>
        <form onSubmit={handleEditEdge}>
          <div className="form-wrapper">
            <ul>
              <li>
                <div className="form-box">
                  <span className="form-item-title">간선 형태</span>
                  <DefaultRadioButtonTwoLineStyled>
                    <ul>
                      {edgePathArr.map((item, index) => {
                        return (
                          <li key={index}>
                            <input
                              type="radio"
                              name="EdgeOptions"
                              id={item}
                              value={item}
                              checked={editEdge.data.baseEdge === item}
                              onChange={handleEdgePath}
                            />
                            <label htmlFor={item}>{item}</label>
                          </li>
                        );
                      })}
                    </ul>
                  </DefaultRadioButtonTwoLineStyled>
                </div>
              </li>
              <li>
                <div className="form-box">
                  <span className="form-item-title">애니메이션 효과</span>
                  <DefaultRadioButtonStyled>
                    <ul>
                      {edgeAnimatedArr.map((item, index) => {
                        const transItem = item.toString();
                        const transKR = () => {
                          const values: valuesType = {
                            true: "활성화",
                            false: "비활성화",
                          };
                          return values[transItem];
                        };
                        return (
                          <li key={index}>
                            <input
                              type="radio"
                              name="EdgeAnimated"
                              id={transItem}
                              value={transItem}
                              checked={editEdge.animated === item}
                              onChange={handleEdgeAnimated}
                            />
                            <label htmlFor={transItem}>{transKR()}</label>
                          </li>
                        );
                      })}
                    </ul>
                  </DefaultRadioButtonStyled>
                </div>
              </li>
              <li>
                <div className="form-box">
                  <span className="form-item-title">마커 표시</span>
                  <DefaultRadioButtonStyled>
                    <ul>
                      {edgeMarkerArr.map((item, index) => {
                        const transKR = () => {
                          const values: valuesType = {
                            none: "없음",
                            markerStart: "←",
                            markerEnd: "→",
                            markerBothSide: "↔",
                          };
                          return values[item];
                        };
                        return (
                          <li key={index}>
                            <input
                              type="radio"
                              name="EdgeMarker"
                              id={item}
                              value={item}
                              checked={editEdge.data.selectMarker === item}
                              onChange={handleEdgeMarker}
                            />
                            <label htmlFor={item}>{transKR()}</label>
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
